import Link from "next/link";
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";

const DMap = dynamic(() => import("~/components/map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

import withAuth from "~/hoc/withAuth";
import { RouterOutputs, api } from "~/utils/api";
import { LINKS } from "~/utils/links";
import { BottomNav } from "~/components/bottomNav";
import TopNavBar from "~/components/topNavbar";
import { PlaceType } from "~/components/map";

type bistro = RouterOutputs["bistro"]["getAllUserIsPartOf"][number];

// ============================================================
// ============================================================
// ============================================================

const BistroItem: FC<PropsWithChildren & { bistro: bistro }> = ({
  bistro,
  children,
}) => {
  const { name, amenity, city, country, house_number, road, state, suburb } =
    bistro;

  // return (
  //   <div className="focus m-1 w-36 rounded p-1 outline :bg-slate-200">
  //     <div>{name}</div>
  //     <div className="text-xs">
  //       <div>{`${house_number}, ${road}, ${suburb}`}</div>
  //       <div>{` ${state}, ${country}`}</div>
  //     </div>
  //   </div>
  // );

  //   .card-compact .card-body {
  //     padding: 1rem/* 16px */;
  //     font-size: 0.875rem/* 14px */;
  //     line-height: 1.25rem/* 20px */;
  // }
  // .card-compact .card-title {
  //     margin-bottom: 0.25rem/* 4px */;
  // }
  return (
    <div className="card m-1 w-[95%] p-2 pl-3 leading-tight shadow-lg outline ">
      <div className=" card-body gap-0 p-0 leading-tight ">
        {children}
        <h2 className="card-title mb-1 p-0 text-base font-bold leading-tight">
          {bistro.name}
        </h2>

        <div className="text-sm font-thin leading-tight">
          <div>{`${house_number}, ${road}, ${suburb}`}</div>
          <div>{` ${state}, ${country}`}</div>
        </div>
        {/* <div className="card-actions justify-end">
          <Link href={LINKS.withBistroId(bistro.id).home}>
            <button className="btn-primary btn">Buy Now</button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

const MemberedBistros = () => {
  const ctx = api.useContext();

  const { data } = api.bistro.getAllUserIsPartOf.useQuery();
  const { mutate: deleteBistro } = api.bistro.delete.useMutation({
    onSuccess: () => {
      void ctx.bistro.getAllUserIsPartOf.invalidate();
    },
  });
  return (
    <div className="m-2">
      <div className="section-title">My Bistros</div>
      <div className="no-scrollbar flex h-36 flex-col content-center items-center overflow-x-scroll bg-transparent opacity-100">
        {data?.map((elem) => {
          return (
            <BistroItem bistro={elem} key={elem.id}>
              <div className="card-actions relative justify-end">
                <div className="absolute">
                  <button
                    className="btn-sm btn-circle btn active:bg-secondary"
                    onClick={() => {}}
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                  </button>
                  <button
                    className="btn-sm btn-circle btn active:bg-secondary"
                    onClick={() => {
                      deleteBistro({ bistroId: elem.id });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </BistroItem>
          );
        })}
      </div>
    </div>
  );
};

const PendingBistros = () => {
  const ctx = api.useContext();
  const { data: pendingBistros } = api.bistro.getPendingBistros.useQuery();

  const { mutate: cancelJoinRequest } =
    api.bistro.cancelJoinRequest.useMutation({
      onSuccess: () => {
        void ctx.bistro.getPendingBistros.invalidate();
      },
    });

  return pendingBistros && pendingBistros?.length > 0 ? (
    <div className="m-2 ">
      <div className="section-title">Pending Bistros</div>
      <div>
        {pendingBistros?.map((bistro, i) => {
          return (
            <div className="outline" key={i}>
              <button
                onClick={() => {
                  cancelJoinRequest({ bistroId: bistro.id });
                  // remove pending
                }}
              >
                x
              </button>
              <BistroItem bistro={bistro} />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

const searchOSMAPI = async (search: string) => {
  const OSM_URL = "https://nominatim.openstreetmap.org/search.php?";

  const params = {
    q: search,
    addressdetails: "1",
    extratags: "1",
    countrycodes: "ca",
    limit: "20",
    //   x1,y1, x2,y2
    // viewbox: [-123, 45, -123 + 2, 45 + 2],
    // bounded: "1",
    format: "jsonv2",
  };
  const queryString = new URLSearchParams(params).toString();

  return fetch(`${OSM_URL}${queryString}`, {
    method: "GET",
    redirect: "follow",
  })
    .then((res) => res.text())
    .then((r) => {
      return JSON.parse(r).map((v) => {
        return {
          ...v,
          osm_id: String(v.osm_id),
          lat: Number(v.lat),
          lon: Number(v.lon),
        };
      });
      // why is below not autocasting to PlaceType?
      // return JSON.parse(r) as PlaceType[];
    })
    .catch((e) => {
      console.log(e);
    });
  // console.log(res);

  // return res;
  // const searchHandler = () => {};
};

const SearchJoinCreate = () => {
  const [place, setPlace] = useState<PlaceType | undefined>();
  const [gotPlaces, setGotPlaces] = useState<PlaceType[] | undefined>();
  const [search, setSearch] = useState<string | undefined>();

  const getPlaces = () => {
    if (search) {
      searchOSMAPI(search).then((r) => {
        setGotPlaces(r ? r : undefined);
      });
    }
  };
  const btnRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * get db results
   * - db res
   * - db res with placeinfo
   *
   * TODO: clean up UI first and check if placeinfo & name search follows
   */
  // const { data, mutate: bistroSearch } = api.bistro.search.useMutation();
  // place search
  const { data: bistroByName, refetch: fetchByName } =
    api.bistro.searchByName.useQuery(
      {
        name: search ?? "",
      },
      { enabled: false }
    );
  const { data: bistroByOSM, refetch: fetchByOSM } =
    api.bistro.searchByOSM.useQuery({ ...place }, { enabled: false });

  // console.log(bistroByName);
  // console.log(bistroByOSM, place);
  if (bistroByName && bistroByOSM) {
    let visited = new Set();
    console.log(
      [...bistroByName, ...bistroByOSM]
        .filter((r) => {
          if (!visited.has(r.id)) {
            visited.add(r.id);
            return true;
          }
          return false;
        })
        .map((r) => {
          return r.name;
        })
    );
  }

  useEffect(() => {
    if (place) {
      fetchByOSM();
    }
  }, [place]);

  return (
    <div className="m-2">
      <h1 className="section-title">Search & Create</h1>
      <CreateWizard place={place} />
      <div className="flex overflow-scroll">
        {bistroByName &&
          bistroByOSM &&
          [...bistroByName, ...bistroByOSM].map((bistro, i) => {
            return (
              <div className="" key={i}>
                <BistroItem bistro={bistro} />
              </div>
            );
          })}
      </div>

      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input-bordered input"
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                btnRef.current?.click();
              }
            }}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
          />
          <button
            className="btn-square btn"
            ref={btnRef}
            onClick={() => {
              getPlaces();
              fetchByName();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <DMap setPlace={setPlace} places={gotPlaces} />
    </div>
  );
};

const CreateWizard = ({ place }: { place: PlaceType | undefined }) => {
  const [input, setInput] = useState("");
  const ctx = api.useContext();

  const { mutate: createBistro } = api.bistro.create.useMutation({
    onSuccess: () => {
      void ctx.bistro.getAllUserIsPartOf.invalidate();
    },
    onError: (e) => {
      alert("name already exists");
      // alert(e);
    },
  });

  useEffect(() => {
    if (place) {
      setInput(place.address.amenity);
    }
  }, [place]);

  return (
    <div className="flex flex-col items-center justify-items-center outline">
      <div>create</div>
      <div className="m-2 flex items-center overflow-hidden rounded-sm text-center align-middle outline outline-slate-500">
        <input
          placeholder="name"
          value={input}
          className="mx-1 w-32"
          onChange={(e) => {
            e.preventDefault();
            setInput(e.target.value);
          }}
        />
        <button
          className="px-2 text-lg font-semibold outline outline-slate-500 active:bg-slate-400"
          onClick={() => {
            if (!place) {
              createBistro({ name: input });
            } else {
              createBistro({
                ...place,
                ...place.address,
                name: input,
                osm_display_name: place.display_name,
                osm_lat: place.lat,
                osm_lon: place.lon,
              });
            }
          }}
        >
          create bistro
        </button>
      </div>
      <div>
        <div>{place?.display_name}</div>
      </div>
    </div>
  );
};

const JoinButton = ({ bistro }: { bistro: bistro | undefined }) => {
  const ctx = api.useContext();
  const { mutate: requestJoin } = api.bistro.requestJoin.useMutation({
    onSuccess: () => {
      void ctx.bistro.getPendingBistros.invalidate();
    },
  });

  return (
    <button
      onClick={() => {
        if (bistro) requestJoin({ bistroId: bistro.id });
      }}
      className={`m-2 rounded p-1 font-semibold text-slate-600 outline outline-slate-600 disabled:text-slate-300 disabled:outline-slate-300 `}
      disabled={bistro === undefined}
    >
      request join
    </button>
  );
};

const Bistro = () => {
  return (
    <>
      <TopNavBar />
      <div className=" flex flex-col">
        <MemberedBistros />
        <PendingBistros />
        <SearchJoinCreate />
      </div>
    </>
  );
};

export default withAuth(Bistro);

import Link from "next/link";
import {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

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
import { Place } from "~/components/map";
import { getNameLocReg } from "~/utils/name";
import { useRouter } from "next/router";

type Bistro = RouterOutputs["bistro"]["getAllUserIsPartOf"][number];

// ============================================================
// ============================================================
// ============================================================

const CONTAINER = "mx-5 mt-1 h-[20%]";

const BistroItem: FC<
  PropsWithChildren & {
    bistro: Bistro;
    onClick?: MouseEventHandler<HTMLDivElement>;
    className?: string;
  }
> = ({ bistro, children, onClick, className = "" }) => {
  const { name, location, region } = getNameLocReg(bistro);
  console.log(getNameLocReg(bistro));

  return (
    <div
      onClick={onClick}
      className={`item-w card my-[0.12rem] p-1 pl-3 leading-tight shadow outline outline-1 ${className}`}
    >
      <div className=" card-body gap-0 p-0 pb-1 leading-none ">
        {children}
        <h2 className="card-title p-[0.1em] text-base font-bold leading-tight">
          {name}
          <div className="text-xs font-thin leading-none">
            <div className="truncate">{location}</div>
            <div className="truncate">{region}</div>
          </div>
        </h2>
      </div>
    </div>
  );
};

const MemberedBistros = () => {
  const ctx = api.useContext();
  const router = useRouter();

  const { data: memberedBistros } = api.bistro.getAllUserIsPartOf.useQuery();
  const { mutate: deleteBistro } = api.bistro.delete.useMutation({
    onSuccess: () => {
      void ctx.bistro.getAllUserIsPartOf.invalidate();
    },
  });

  const { data: pendingBistros } = api.bistro.getPendingBistros.useQuery();

  const { mutate: cancelPending } = api.bistro.cancelJoinRequest.useMutation({
    onSuccess: () => {
      void ctx.bistro.getPendingBistros.invalidate();
    },
  });

  const bistros = () => {
    return [
      ...(memberedBistros ?? []),
      ...(pendingBistros?.map((r) => {
        return { ...r, isPending: true };
      }) ?? []),
    ] as (Bistro & { isPending?: boolean })[];
  };

  return (
    <div className={CONTAINER}>
      {/* <div className="section-title tooltip text-center" data-tip="hello"> */}
      <div
        className="section-title"
        data-tip={`Membered and Pending Bistros. You may delete membered bistro, or cancel join request`}
      >
        Bistros
      </div>

      <div className="no-scrollbar flex flex-col content-center items-center overflow-y-scroll overscroll-none p-2">
        {bistros().map((elem) => {
          return (
            <BistroItem
              bistro={elem}
              key={elem.id}
              className={
                elem.isPending
                  ? "text-slate-400 outline-1 "
                  : "active:bg-slate-100"
              }
              onClick={() => {
                if (!elem.isPending) {
                  void router.push(LINKS.withBistroId(elem.id).home);
                }
              }}
            >
              <div className="card-actions justify-end text-slate-800">
                <div className="absolute flex flex-col content-center justify-center justify-items-center">
                  <svg
                    onClick={() => {
                      elem.isPending
                        ? cancelPending({ bistroId: elem.id })
                        : deleteBistro({ bistroId: elem.id });
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${"transition active:scale-75 active:transition-transform"} ml-auto h-6 w-6`}
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
                  {/* <div className="badge badge-secondary badge-sm mt-2">
                    pending
                  </div> */}
                </div>
              </div>

              {/* <div className="card-actions justify-end">
              </div> */}
            </BistroItem>
          );
        })}
      </div>
    </div>
  );
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
      return (JSON.parse(r) as Place[]).map((v) => {
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
  const [place, setPlace] = useState<Place | undefined>();
  const [gotPlaces, setGotPlaces] = useState<Place[] | undefined>();
  const [search, setSearch] = useState<string | undefined>();

  const getPlaces = () => {
    if (search) {
      void searchOSMAPI(search).then((r) => {
        setGotPlaces(r ? r : undefined);
      });
    }
  };
  const btnRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: bistroByName, mutate: fetchByName } =
    api.bistro.searchByName.useMutation();
  const { data: bistroByOSM, refetch: fetchByOSM } =
    api.bistro.searchByOSM.useQuery({ ...place }, { enabled: false });

  const join = useJoin();

  // console.log("bistroByName: ", bistroByName, place);

  const getMergedBistros = () => {
    const visited = new Set();
    return [
      ...(bistroByName ? bistroByName : []),
      ...(bistroByOSM ? bistroByOSM : []),
    ]
      .filter((r) => {
        if (!visited.has(r.id)) {
          visited.add(r.id);
          return true;
        }
        return false;
      })
      .map((r) => {
        return r;
      });
  };

  useEffect(() => {
    if (place) {
      void fetchByOSM();
    }
  }, [place]);

  return (
    <>
      <CreateWizard place={place} />
      <div className={CONTAINER}>
        <div className="section-title">Search</div>
        <div className="justify-content-center no-scrollbar flex max-h-24 flex-col items-center overflow-scroll overscroll-none">
          {getMergedBistros().map((bistro, i) => {
            return (
              <BistroItem bistro={bistro} key={i}>
                <div className="card-actions relative justify-end">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    className="absolute w-7 transition active:scale-75 active:transition-transform "
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    onClick={() => {
                      join(bistro);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                </div>
              </BistroItem>
            );
          })}
        </div>
        {/* align-items: center;
  justify-content: center; */}
        <div className="justify-content-center flex flex-col items-center">
          <div className="form-control">
            <div className="input-group-sm input-group ">
              <input
                type="text"
                placeholder="Search by Name…"
                className="input-bordered input input-sm focus:outline-1 focus:outline-offset-1"
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
                className="btn-square btn-sm btn"
                ref={btnRef}
                onClick={() => {
                  getPlaces();
                  fetchByName({ name: search ?? "" });
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
        </div>
        <DMap setPlace={setPlace} places={gotPlaces} />
      </div>
    </>
  );
};

const CreateWizard = ({ place }: { place: Place | undefined }) => {
  const [input, setInput] = useState("");
  const { name, location, region } = getNameLocReg(place);
  const ctx = api.useContext();

  const { mutate: createBistro } = api.bistro.create.useMutation({
    onSuccess: () => {
      void ctx.bistro.getAllUserIsPartOf.invalidate();
    },
    onError: (e) => {
      alert("name already exists");
    },
  });

  useEffect(() => {
    if (place) {
      setInput(place.address.amenity);
    }
  }, [place]);

  return (
    <>
      <div className="section-title">Create</div>
      <div className="mx-2 flex flex-col items-center justify-items-center">
        <div className="form-control w-[16rem] ">
          <input
            type="text"
            value={name ? name : ""}
            placeholder="new bistro name"
            onChange={(e) => {
              e.preventDefault();
              setInput(e.target.value);
            }}
            className="input-bordered input input-sm"
          />
          <label className="label">
            <span className="label-text-alt font-semibold">
              <div>{location ?? "location n/a"}</div>
              <div>{region ?? "region n/a"}</div>
            </span>

            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-8 transition active:scale-75 active:transition-transform "
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </label>
        </div>
      </div>
    </>
  );
};

const useJoin = () => {
  const ctx = api.useContext();
  const { mutate: requestJoin } = api.bistro.requestJoin.useMutation({
    onSuccess: () => {
      void ctx.bistro.getPendingBistros.invalidate();
    },
  });

  return (bistro: Bistro) => requestJoin({ bistroId: bistro.id });
};

const Bistro = () => {
  return (
    <div className="flex flex-col items-center ">
      <TopNavBar />
      <div className="rw pt-12 ">
        <MemberedBistros />
        <SearchJoinCreate />
      </div>
    </div>
  );
};

export default withAuth(Bistro);

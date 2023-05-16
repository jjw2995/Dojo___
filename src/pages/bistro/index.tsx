import Link from "next/link";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
const DMap = dynamic(() => import("~/components/map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

import withAuth from "~/hoc/withAuth";
import { RouterOutputs, api } from "~/utils/api";
import { LINKS } from "~/utils/links";
import { PlaceType } from "~/components/placeItem";

type bistro = RouterOutputs["bistro"]["getAllUserIsPartOf"][number];

const MemberedBistros = () => {
  const ctx = api.useContext();

  const { data } = api.bistro.getAllUserIsPartOf.useQuery();
  const { mutate: deleteBistro } = api.bistro.delete.useMutation({
    onSuccess: () => {
      void ctx.bistro.getAllUserIsPartOf.invalidate();
    },
  });
  return (
    <div className="m-2 flex-col outline">
      {data?.map((elem) => {
        return (
          <div key={elem.id} className="m-2 p-2 outline">
            <Link href={LINKS.withBistroId(elem.id).home}>
              <BistroItem bistro={elem} />
            </Link>
            <button
              className="m-1 h-6 w-6 items-center justify-center outline"
              onClick={() => {
                deleteBistro({ bistroId: elem.id });
              }}
            >
              x
            </button>
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// ============================================================
// ============================================================

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
              const { display_name, lat, lon, osm_id, osm_type } = place;

              createBistro({
                name: input,
                osm_display_name: display_name,
                osm_id,
                osm_type,
                osm_lat: lat.toString(),
                osm_lon: lon.toString(),
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
      ctx.bistro.getPendingBistros.invalidate();
    },
  });

  return (
    <button
      onClick={() => {
        console.log(bistro);

        if (bistro) requestJoin({ bistroId: bistro.id });
      }}
      className={`m-2 rounded p-1 font-semibold text-slate-600 outline outline-slate-600 disabled:text-slate-300 disabled:outline-slate-300 `}
      disabled={bistro === undefined}
    >
      request join
    </button>
  );
};

const BistrosLookUp = ({ place }: { place: PlaceType | undefined }) => {
  const { data: bistrosByOSM } = api.bistro.searchByOSM.useQuery(
    {
      osm_id: place?.osm_id,
      osm_type: place?.osm_type,
    },
    { enabled: place !== undefined }
  );

  const [searchName, setSearchName] = useState("");
  const { data: bistrosByName } = api.bistro.searchByName.useQuery(
    { name: searchName },
    {
      enabled: searchName !== "" && searchName.length > 2,
    }
  );

  const [bistros, setBistros] = useState<bistro[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    let ids = new Set();
    let bList = new Array<bistro>();
    bistrosByOSM?.forEach((v) => {
      ids.add(v.id);
      bList.push(v);
    });
    bistrosByName?.forEach((v) => {
      if (!ids.has(v.id)) {
        bList.push(v);
      }
    });

    setBistros(bList);
  }, [bistrosByOSM, bistrosByName]);

  return (
    <div className="m-2 p-2 outline">
      BistrosLookUp
      <input
        placeholder="search name"
        value={searchName}
        className="m-2 mx-1 w-32 outline outline-2"
        onChange={(e) => {
          e.preventDefault();
          setSearchName(e.target.value);
        }}
      />
      <div className="m-2 rounded outline">
        <JoinButton
          bistro={selectedIndex === -1 ? undefined : bistros[selectedIndex]}
        />

        {bistros?.map((bistro, i) => {
          return (
            <div
              key={bistro.id}
              className={`${selectedIndex === i ? "bg-slate-300" : ""} outline`}
              onClick={() => {
                if (selectedIndex !== i) {
                  setSelectedIndex(i);
                } else {
                  setSelectedIndex(-1);
                }
              }}
            >
              <BistroItem bistro={bistro} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
const BistroItem = ({ bistro }: { bistro: bistro }) => {
  return (
    <>
      {/* <div className="m-1 w-64 rounded p-1 text-xs font-light outline outline-slate-500"> */}
      <div className="flex-col text-xs font-light">
        <span className="text-sm font-bold text-slate-600">{bistro.name}</span>
        {bistro.osm_display_name}
      </div>
    </>
  );
};
const PendingBistros = () => {
  const ctx = api.useContext();
  const { data: pendingBistros } = api.bistro.getPendingBistros.useQuery();

  const { mutate: cancelJoinRequest } =
    api.bistro.cancelJoinRequest.useMutation({
      onSuccess: () => {
        ctx.bistro.getPendingBistros.invalidate();
      },
    });
  return (
    <div className="m-2">
      PendingBistros
      <div>
        {pendingBistros?.map((bistro, i) => {
          return (
            <div className="outline">
              <button
                onClick={() => {
                  cancelJoinRequest({ bistroId: bistro.id });
                  // remove pending
                }}
              >
                x
              </button>
              <BistroItem key={i} bistro={bistro} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
const Bistro = () => {
  const [place, setPlace] = useState<PlaceType | undefined>();

  return (
    <div className="flex flex-col">
      <div className="m-2 p-2 outline">
        <h1 className="text-2xl">My Bistros</h1>
        <MemberedBistros />
        <PendingBistros />
      </div>
      <div className="m-2 p-2 outline">
        <h1 className="text-2xl">Search & Create</h1>
        <CreateWizard place={place} />
        <BistrosLookUp place={place} />
      </div>
      <DMap setPlace={setPlace} />
    </div>
  );
};

export default withAuth(Bistro);

import { type NextPage } from "next";
import Head from "next/head";
import SearchBar from "../components/SearchBar";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import Spinner from "../components/Spinner";
import type { SearchResultType } from "../server/trpc/router/search";
import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import MyImage from "../components/MyImage";

const CDN_URL = "https://res.cloudinary.com/demo/image/fetch/";

type filtersType = {
  price?: number;
  beds?: number;
  baths?: number;
  rating?: number;
  more?: string;
};

const defaultFilters: filtersType = {
  price: undefined,
  beds: undefined,
  baths: undefined,
  rating: undefined,
  more: undefined,
};

const MapIcon = ({
  x,
  y,
  id,
  isHover,
}: {
  id: string;
  isHover: boolean;
  x?: string;
  y?: string;
}) => {
  return (
    <StarFilledIcon
      className={`absolute ${x} ${y} z-10 text-red-${
        isHover ? "500" : "900"
      } transition-all duration-200 hover:text-marooon-400 ${
        isHover && "scale-125"
      }`}
      height={38}
      width={38}
    />
  );
};

const Map = ({
  results,
  hovers,
  handleHovers,
}: {
  results: SearchResultType[];
  hovers: Record<string, boolean>;
  handleHovers: (isEntering: boolean, id: string) => void;
}) => {
  const coords = results.map((result) => {
    return {
      coord: result.coord,
      id: result.id,
    };
  });

  const mapCoords = ([x, y]: [number, number], id: string) => {
    const coordStyle = ["", ""];

    if (x === 0.5) {
      coordStyle[0] = "left-1/2";
    } else if (x === 0.01) {
      coordStyle[0] = "left-[27rem]";
    } else {
      coordStyle[0] = x > 96 ? `right-${x - 96}` : `left-${x}`;
    }
    coordStyle[1] = y > 96 ? `bottom-${y - 96}` : `top-${y}`;

    return { coordStyle, id };
  };

  return (
    <div className="relative h-[75vh]  w-1/2 rounded-md border-4 border-marooon-700 bg-black bg-map bg-cover">
      {coords
        .map(({ coord, id }) => mapCoords(coord, id))
        .map(({ coordStyle, id }, i) => {
          console.log(hovers[id] === true);
          return (
            <MapIcon
              id={id}
              x={coordStyle[0]}
              y={coordStyle[1]}
              key={i}
              isHover={hovers[id] === true}
            />
          );
        })}
      <div className="left-96"></div>
    </div>
  );
};

const Star = ({
  i,
  rating,
  updateRating,
}: {
  i: number;
  rating: number;
  updateRating: (i: number) => void;
}) => {
  const [hover, setHover] = useState(false);
  if (hover || i + 1 <= rating) {
    return (
      <StarFilledIcon
        onClick={() => {
          if (rating === i + 1) {
            updateRating(i - 1);
          } else {
            updateRating(i);
          }
        }}
        onMouseLeave={() => setHover(false)}
        key={i}
        className="mx-[0.25rem] inline p-0"
        height={18}
        width={18}
      />
    );
  } else {
    return (
      <StarIcon
        onClick={() => updateRating(i)}
        onMouseEnter={() => setHover(true)}
        key={i}
        className="mx-[0.25rem] inline p-0"
        height={18}
        width={18}
      />
    );
  }
};

const ResultCard = ({
  id,
  searchResult,
  hovers,
  handleHovers,
}: {
  id: string;
  hovers: Record<string, boolean>;
  handleHovers: (isEntering: boolean, id: string) => void;
  searchResult: SearchResultType;
}) => {
  const [starRtng, setStarRtng] = useState(0);
  const updateRating = (i: number) => {
    setStarRtng(i + 1);
  };

  return (
    <div
      onMouseEnter={() => handleHovers(true, id)}
      onMouseLeave={() => handleHovers(false, id)}
      className="mb-4 flex w-full flex-col rounded-md border-4 border-marooon-700 bg-gray-300 px-3 py-2"
    >
      <h1 className="text-2xl font-bold text-marooon-700">
        {searchResult.title}
      </h1>
      <p className="p-0 text-lg text-marooon-700">{searchResult.address}</p>
      <div className="flex w-full gap-3 py-2">
        <MyImage
          className="h-36 w-[50%]"
          src={`${CDN_URL}${searchResult.image}`}
          alt={searchResult.title}
        />
        <div className="flex h-full w-max flex-grow flex-col gap-2">
          <Link
            className="w-4/6 rounded-md bg-slate-50 py-1 px-2 text-xl font-medium text-marooon-700 "
            href={`/about/${searchResult.id}`}
          >
            About Me
          </Link>
          <Link
            className="w-4/6 rounded-md bg-slate-50 py-1 px-2 text-xl font-medium text-marooon-700 "
            href={`/rate/${searchResult.id}`}
          >
            Rate Me
          </Link>
          <Link
            className="w-4/6 rounded-md bg-slate-50 py-1 px-2 text-xl font-medium text-marooon-700 "
            href={`/compare/${searchResult.id}`}
          >
            Compare Me
          </Link>
        </div>
      </div>
      <div className="flex w-full justify-start gap-3 py-1">
        <button className="rounded-md bg-marooon-700 px-4 py-1 text-slate-50">
          favorite
        </button>
        <button className="rounded-md bg-marooon-700 px-3 pb-[0.125rem] text-white">
          {[...new Array(5).fill(0)].map((_, i) => (
            <Star i={i} key={i} rating={starRtng} updateRating={updateRating} />
          ))}
        </button>
        <button className="rounded-md bg-marooon-600 px-4 py-1 text-slate-50">
          call
        </button>
        <button className="rounded-md bg-marooon-600 px-4 py-1 text-slate-50">
          email
        </button>
      </div>
    </div>
  );
};

const SearchResults = ({
  results,
  isLoading,
  isError,
  hovers,
  handleHovers,
}: {
  hovers: Record<string, boolean>;
  handleHovers: (isEntering: boolean, id: string) => void;
  results: SearchResultType[];
  isLoading: boolean;
  isError: boolean;
}) => {
  const handleFetchState = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (isError) {
      return <div>Something went wrong</div>;
    }
    if (results?.length === 0) {
      return (
        <h1 className="text-3xl font-black text-primary">No results found</h1>
      );
    } else {
      return results.map((searchResult) => (
        <ResultCard
          searchResult={searchResult}
          key={searchResult.id}
          hovers={hovers}
          handleHovers={handleHovers}
          id={searchResult.id}
        />
      ));
    }
  };

  return (
    <div
      className="max-h-[75vh] flex-grow overflow-y-scroll pr-3"
      style={{ objectFit: "contain" }}
    >
      {handleFetchState()}
    </div>
  );
};

const Home: NextPage = () => {
  const [filters, setFilters] = useState({});
  const {
    data: searchResults,

    refetch,
    isLoading,
    isError,
  } = trpc.search.searchApartments.useQuery(
    { ...filters },
    {
      queryKey: ["search.searchApartments", filters],
      onSuccess: (data) => {
        const obj: Record<string, boolean> = {};
        data.forEach(({ id }) => {
          obj[id] = false;
        });
        setHovers(obj);
      },
    }
  );
  const [hovers, setHovers] = useState({});

  const handleHover = (isEntering: boolean, id: string) => {
    const newHovers = { ...filters, [id]: isEntering };
    setHovers(newHovers);
  };

  // console.log(filters);
  const handleFilterSearch = useCallback(
    (filterName: string, filterChoice: number | string | undefined) => {
      // refetch({});
      setFilters({ ...filters, [filterName]: filterChoice });
    },
    [filters]
  );
  return (
    <>
      <Head>
        <title>RateMyHousing</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar filters={filters} updateFilters={handleFilterSearch} />
      <div className="flex w-full gap-4 py-4 px-6 lg:px-36">
        <Map
          results={searchResults ?? []}
          hovers={hovers}
          handleHovers={handleHover}
        />
        <SearchResults
          hovers={hovers}
          handleHovers={handleHover}
          isLoading={isLoading}
          isError={isError}
          results={searchResults ?? []}
        />
      </div>
    </>
  );
};

export default Home;

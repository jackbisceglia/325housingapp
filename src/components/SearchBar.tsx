import { SewingPinIcon, CaretDownIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { SearchResultType } from "../server/trpc/router/search";

type filtersType = {
  price?: number;
  beds?: number;
  baths?: number;
  rating?: number;
  more?: string;
};

const defaultFilters = {
  price: undefined,
  beds: undefined,
  baths: undefined,
  rating: undefined,
  more: undefined,
};

const FilterOption = ({
  title,
  dropdownOptions,
  updateFilters,
}: {
  title: string;
  dropdownOptions: [string, (number | string)?][];
  updateFilters: (
    filterName: string,
    filterChoice: number | string | undefined
  ) => void;
}) => {
  const [show, setShow] = useState(false);
  const [ddTitle, setDdTitle] = useState(title);

  return (
    <div
      className="my-1 mr-4 flex flex-col"
      onMouseEnter={() => {
        // if (!show) return;
        setShow(true);
      }}
      onMouseLeave={() => {
        if (!show) return;
        setShow(false);
      }}
    >
      <button
        id="dropdownDefault"
        className="flex min-w-fit items-center justify-between rounded-md bg-slate-50 py-1 px-4 text-center text-lg font-medium text-marooon-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        type="button"
      >
        {ddTitle === "None" ? title : ddTitle}
        <CaretDownIcon width={30} height={30} />
      </button>
      <div
        id="dropdown"
        className={`z-10 ${
          !show ? "hidden" : "absolute"
        } mt-[2.4rem] w-48 divide-y rounded bg-slate-100 shadow`}
      >
        <ul
          className=" text-sm text-gray-700 "
          aria-labelledby="dropdownDefault"
        >
          {dropdownOptions.map((o, idx) => (
            <li
              onClick={() => {
                setShow(false);
                updateFilters(title, o[1]);
                setDdTitle(o[0]);
              }}
              className="block cursor-pointer py-2 px-4 text-base font-semibold text-marooon-700 hover:bg-slate-200"
              key={idx}
            >
              {o[0]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SearchBar = ({
  updateFilters,
  filters,
}: {
  updateFilters: (
    filterName: string,
    filterChoice: number | string | undefined
  ) => void;
  filters: filtersType;
}) => {
  return (
    <div className=" flex max-h-[10vh] w-full flex-col items-center justify-center bg-marooon-50 py-1 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-40">
      <div className="mr-4 flex items-center">
        <SewingPinIcon
          className=" absolute ml-2 text-marooon-700"
          height={24}
          width={24}
        />
        <input
          className="rounded-md bg-slate-50 py-1 pl-10 text-xl font-semibold text-marooon-700"
          type="text"
          placeholder="Amherst, MA"
          name=""
          id=""
        />
      </div>
      <div className="mt-2 flex flex-wrap justify-center">
        <FilterOption
          title="price"
          dropdownOptions={[
            ["None", undefined],
            ["$750", 750],
            ["$1000", 1000],
            ["$2000", 2000],
            ["$3000", 3000],
            ["$4000", 4000],
          ]}
          updateFilters={updateFilters}
        />
        <FilterOption
          title="beds"
          dropdownOptions={[
            ["None", undefined],
            ["1+ bed", 1],
            ["2+ beds", 2],
            ["3+ beds", 3],
          ]}
          updateFilters={updateFilters}
        />
        <FilterOption
          title="baths"
          dropdownOptions={[
            ["None", undefined],
            ["1+ bath", 1],
            ["2+ baths", 2],
            ["3+ baths", 3],
          ]}
          updateFilters={updateFilters}
        />
        <FilterOption
          title="rating"
          dropdownOptions={[
            ["None", undefined],
            ["0 star", 0],
            ["1+ star", 1],
            ["2+ stars", 2],
            ["3+ stars", 3],
            ["4+ stars", 4],
            ["5+ stars", 5],
          ]}
          updateFilters={updateFilters}
        />
        <FilterOption
          title="more"
          dropdownOptions={[
            ["None", undefined],
            ["Pet Friendly", "petFriendly"],
            ["Utilities Included", "utilitiesIncluded"],
            ["Washer/Dryer", "washerDryer"],
          ]}
          updateFilters={updateFilters}
        />
      </div>
    </div>
  );
};

export default SearchBar;

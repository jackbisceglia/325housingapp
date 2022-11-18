import { SewingPinIcon, CaretDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const FilterOption = ({
  title,
  dropdownOptions,
}: {
  title: string;
  dropdownOptions: string[];
}) => {
  const [show, setShow] = useState(false);
  const [ddTitle, setDdTitle] = useState(title);

  return (
    <div
      className="my-1 mr-4 flex flex-col"
      onMouseEnter={() => {
        setShow(!show);
      }}
      onMouseLeave={() => {
        setShow(!show);
      }}
    >
      <button
        id="dropdownDefault"
        className="flex w-36 items-center justify-between rounded-md bg-slate-50 py-1 px-4 text-center text-lg font-medium text-marooon-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        type="button"
      >
        {ddTitle === "None" ? title : ddTitle}
        <CaretDownIcon width={30} height={30} />
      </button>
      <div
        id="dropdown"
        className={`z-10 ${
          !show ? "hidden" : "absolute"
        } mt-[2.4rem] w-44 divide-y rounded bg-slate-100 shadow`}
      >
        <ul
          className=" text-sm text-gray-700 "
          aria-labelledby="dropdownDefault"
        >
          {dropdownOptions.map((o, idx) => (
            <li
              onClick={() => {
                setDdTitle(o);
              }}
              className="block cursor-pointer py-2 px-4 text-base font-semibold text-marooon-700 hover:bg-slate-200"
              key={idx}
            >
              {o}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="min-h-14 flex w-full flex-col items-center justify-center bg-marooon-50 py-4 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-40">
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
          dropdownOptions={["None", "$500-$750", "$750-$1000", "$1000+"]}
        />
        <FilterOption
          title="beds"
          dropdownOptions={["None", "1 bed", "2 beds", "3+ beds"]}
        />
        <FilterOption
          title="baths"
          dropdownOptions={["None", "1 bath", "2 baths", "3+ baths"]}
        />
        <FilterOption
          title="rating"
          dropdownOptions={[
            "None",
            "0 star",
            "1 star",
            "2 stars",
            "3 stars",
            "4 stars",
            "5 stars",
          ]}
        />
        <FilterOption
          title="more"
          dropdownOptions={[
            "None",
            "Pet Friendly",
            "Utilities Included",
            "Washer/Dryer",
          ]}
        />
      </div>
    </div>
  );
};

export default SearchBar;

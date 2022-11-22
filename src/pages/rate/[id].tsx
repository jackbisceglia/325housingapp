import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import { useState } from "react";
import MyImage from "../../components/MyImage";
import Spinner from "../../components/Spinner";
import type { SearchResultType } from "../../server/trpc/router/search";
import { trpc } from "../../utils/trpc";

const CDN_URL = "https://res.cloudinary.com/demo/image/fetch/";
const Star = ({
  h,
  w,
  i,
  rating,
  updateRating,
}: {
  i: number;
  h: number;
  w: number;
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
        height={h}
        width={w}
      />
    );
  } else {
    return (
      <StarIcon
        onClick={() => updateRating(i)}
        onMouseEnter={() => setHover(true)}
        key={i}
        className="mx-[0.25rem] inline p-0"
        height={h}
        width={w}
      />
    );
  }
};

const RateQuestion = ({
  question,
  num,
  starRtng,
  updateRating,
}: {
  question: string;
  num: number;
  starRtng: number;
  updateRating: (id: number, value: number) => void;
}) => {
  const updateStarRating = (i: number) => {
    updateRating(num, i + 1);
  };
  return (
    <form className="flex w-full flex-col items-center justify-center gap-2 rounded-md border-4 border-marooon-700 bg-gray-300 py-2 px-6">
      <h1 className="text-2xl font-black text-marooon-700">{question}</h1>
      <button
        onClick={(e) => e.preventDefault()}
        className="rounded-md bg-marooon-700  px-3 pb-[0.125rem] text-white"
      >
        {[...new Array(5).fill(0)].map((_, i) => (
          <Star
            h={30}
            w={30}
            i={i}
            key={i}
            rating={starRtng}
            updateRating={updateStarRating}
          />
        ))}
      </button>
    </form>
  );
};

const YesNo = ({
  question,
  num,
  value,
  updateValue,
}: {
  question: string;
  num: number;
  value: string;
  updateValue: (id: number, v: string) => void;
}) => {
  return (
    <form className="flex w-full justify-between gap-2 rounded-md border-4 border-marooon-700 bg-gray-300 py-2 px-6">
      <h1 className="text-2xl font-semibold text-marooon-700">{question}</h1>
      <div className="align-center flex h-full w-min items-center justify-center text-center text-xl text-marooon-700">
        <label htmlFor={`yes-${num}`}>Yes</label>
        <input
          checked={value === "yes"}
          name={`${num}`}
          id={`yes-${num}`}
          type="radio"
          className="ml-2 mr-4"
          value={value}
          onClick={() => updateValue(num, "yes")}
        />
        <label htmlFor={`no-${num}`}>No</label>
        <input
          checked={value === "no"}
          name={`${num}`}
          id={`no-${num}`}
          type="radio"
          className="ml-2 mr-4"
          value={value}
          onClick={() => updateValue(num, "no")}
        />
      </div>
    </form>
  );
};

const PageContent = ({ data }: { data: SearchResultType }) => {
  const [yesNoValues, setYesNoValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
  const updateValue = (id: number, v: string) => {
    const vals = [...yesNoValues];
    vals[id] = v;
    setYesNoValues(vals);
  };

  const [starRtng, setStarRtng] = useState(0);
  const updateRating = (i: number) => {
    setStarRtng(i + 1);
  };

  const [formStarRatings, setFormStarRatings] = useState([0, 0, 0, 0, 0]);
  const updateFormStarRatings = (id: number, value: number) => {
    const vals = [...formStarRatings];
    vals[id] = value;
    setFormStarRatings(vals);
  };

  return (
    <>
      <div className="flex w-1/2 flex-col gap-2">
        <div className="flex w-full gap-2 rounded-md border-4 border-marooon-700 bg-gray-300 py-2 px-3">
          <div className="flex-grow">
            <h1 className="py-2 text-4xl font-bold text-marooon-700">
              {data.title}
            </h1>
            <p className="text-xl text-marooon-700">{data.address}</p>
          </div>
          <div className="flex flex-col items-center justify-between gap-1 self-stretch">
            <button className="w-full rounded-md bg-marooon-700 px-4 py-1 text-slate-50 hover:bg-marooon-800">
              favorite
            </button>
            <button className="rounded-md bg-marooon-700  px-3 pb-[0.125rem] text-white">
              {[...new Array(5).fill(0)].map((_, i) => (
                <Star
                  h={18}
                  w={18}
                  i={i}
                  key={i}
                  rating={starRtng}
                  updateRating={updateRating}
                />
              ))}
            </button>
          </div>
        </div>
        {/* {console.log(`url('${data.image}')`)} */}
        <MyImage
          src={`${CDN_URL}${data.image}`}
          alt={data.title}
          className="h-60"
        />
        <YesNo
          updateValue={updateValue}
          value={yesNoValues[0] ?? ""}
          num={0}
          question="Am I Pet Friendly?"
        />
        <YesNo
          updateValue={updateValue}
          value={yesNoValues[1] ?? ""}
          num={1}
          question="Are Utilities Included?"
        />
        <YesNo
          updateValue={updateValue}
          value={yesNoValues[2] ?? ""}
          num={2}
          question="Would You Rent Again?"
        />
        <YesNo
          updateValue={updateValue}
          value={yesNoValues[3] ?? ""}
          num={3}
          question="Is Washer/Dryer Included?"
        />
        <button
          onClick={() => setYesNoValues(["", "", "", ""])}
          className="marooon-700 w-full rounded-md bg-marooon-700 py-2 text-2xl text-white transition-all duration-100 hover:bg-marooon-800"
        >
          Submit
        </button>
      </div>
      <div className="w-1/2">
        <RateQuestion
          num={0}
          starRtng={formStarRatings[0] ?? 0}
          updateRating={updateFormStarRatings}
          question="Rate My Price"
        />
      </div>
    </>
  );
};

const Rate: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } = trpc.search.getApartmentById.useQuery({
    id: id as string,
  });

  const handleServerState = (isLoading: boolean, isError: boolean) => {
    if (isLoading) {
      return <Spinner />;
    } else if (isError) {
      return <div>Error</div>;
    }
  };

  console.log("id: ", id);

  return (
    <>
      <Head>
        <title>RateMyHousing</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full gap-4 py-4 px-6 lg:px-36">
        {isLoading || isError
          ? handleServerState(isLoading, isError)
          : data && <PageContent data={data} />}
      </div>
    </>
  );
};

export default Rate;

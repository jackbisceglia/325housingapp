import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import { useState } from "react";
import MyImage from "../../components/MyImage";
import Spinner from "../../components/Spinner";
import { SearchResultType } from "../../server/trpc/router/search";
import { trpc } from "../../utils/trpc";

const CDN_URL = "https://res.cloudinary.com/demo/image/fetch/";

const ApartmentHeading = ({
  data,
  includeArrows,
  updateCarousel,
}: {
  data?: SearchResultType;
  includeArrows?: boolean;
  updateCarousel?: (dir: "INC" | "DEC") => void;
}) => {
  if (!data) {
    return <Spinner />;
  }
  return (
    <div className="flex w-6/12 flex-col items-center">
      <h1 className="text-4xl font-bold text-marooon-700">{data.title}</h1>
      <p className="py-2 text-xl text-marooon-700">{data.address}</p>
      <div className="flex h-52 w-7/12 items-center">
        {includeArrows && (
          <button
            onClick={() => {
              if (!updateCarousel) {
                return;
              }
              updateCarousel("DEC");
            }}
            className="mx-1 text-marooon-700"
          >
            <ArrowLeftIcon height={24} width={24} />
          </button>
        )}
        <MyImage
          src={`${CDN_URL}${data.image}`}
          alt={data.title}
          className="h-full w-full"
        />
        {includeArrows && (
          <button
            onClick={() => {
              if (!updateCarousel) {
                return;
              }
              updateCarousel("INC");
            }}
            className="mx-1 text-marooon-700"
          >
            <ArrowRightIcon height={24} width={24} />
          </button>
        )}
      </div>
    </div>
  );
};

const ApartmentDetails = ({ data }: { data?: SearchResultType }) => {
  if (!data) {
    return <Spinner />;
  }

  const Box = ({ children }: { children: React.ReactNode }) => (
    <div className="w-7/12 rounded-md border-2 border-marooon-700 bg-gray-200 py-2 px-4 text-center text-xl font-medium capitalize text-marooon-700">
      {children}
    </div>
  );

  return (
    <div className="flex w-6/12 flex-col items-center gap-3">
      <Box>{data.type}</Box>
      <Box>{data.beds}</Box>
      <Box>{data.baths}</Box>
      <Box>{data.rating}</Box>
      <Box>${data.price}</Box>
      <Box>{data.petFriendly ? "Yes" : "No"}</Box>
      <Box>{data.washerDryer ? "Yes" : "No"}</Box>
      <Box>{data.utilitiesIncluded ? "Yes" : "No"}</Box>
    </div>
  );
};

const PageContent = ({
  data: { primary, rest } = { primary: undefined, rest: [] },
}: {
  data:
    | {
        primary: SearchResultType | undefined;
        rest: SearchResultType[];
      }
    | undefined;
}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const updateCarousel = (dir: "INC" | "DEC") => {
    const delta = dir === "INC" ? 1 : -1;

    const newIdx = carouselIndex + delta;
    if (newIdx < 0) {
      setCarouselIndex(rest.length - 1);
    } else if (newIdx >= rest.length) {
      setCarouselIndex(0);
    } else {
      setCarouselIndex(newIdx);
    }
  };

  const EmptyBox = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full rounded-md border-2 border-gray-100 py-2 text-center text-xl font-medium capitalize text-marooon-700">
      {children}
    </div>
  );

  if (!primary || !rest.length) {
    return <Spinner />;
  }
  return (
    <>
      <div className="flex w-full justify-center">
        <ApartmentHeading data={primary} />
        <div className="w-32"></div>
        <ApartmentHeading
          data={rest[carouselIndex]}
          includeArrows={true}
          updateCarousel={updateCarousel}
        />
      </div>
      <div className="flex w-full justify-center py-4">
        <ApartmentDetails data={primary} />
        <div className="flex w-32 flex-col gap-3 text-center text-xl text-marooon-700">
          <EmptyBox>Type</EmptyBox>
          <EmptyBox>Beds</EmptyBox>
          <EmptyBox>Baths</EmptyBox>
          <EmptyBox>Rating</EmptyBox>
          <EmptyBox>Price</EmptyBox>
          <EmptyBox>Pet Friendly?</EmptyBox>
          <EmptyBox>Washer/Dryer?</EmptyBox>
          <EmptyBox>Utilities Inc.?</EmptyBox>
        </div>
        <ApartmentDetails data={rest[carouselIndex]} />
      </div>
    </>
  );
};

const Compare: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } =
    trpc.search.getApartmentComparisons.useQuery({ id: id as string });

  const handleServerState = (isLoading: boolean, isError: boolean) => {
    if (isLoading) {
      return <Spinner />;
    } else if (isError) {
      return <div>Error</div>;
    }
  };

  return (
    <>
      <Head>
        <title>RateMyHousing</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col items-center py-4 px-6 lg:px-40">
        {isLoading || isError
          ? handleServerState(isLoading, isError)
          : data && <PageContent data={data} />}
      </div>
    </>
  );
};

export default Compare;

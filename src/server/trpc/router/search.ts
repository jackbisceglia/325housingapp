import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export type SearchResultType = {
  id: string;
  title: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  price: number;
  beds: number;
  baths: number;
  rating: number;
  petFriendly?: boolean;
  washerDryer?: boolean;
  utilitiesIncluded?: boolean;
  coord: [number, number];
};

const APARTMENTS: SearchResultType[] = [
  {
    id: "1f2d3f4g",
    title: "Aspen Heights Amherst",
    address: "408 Northhampton Rd, Amherst, MA 01002",
    phone: "(xxx) xxx-xxxx",
    email: "contact@aspenheights.com",
    image:
      "https://images1.forrent.com/i2/MmD5baLPbl6srhNc3W1O30tfpiSgENYJXk_FtlbXohA/117/image.jpg",
    price: 1100,
    beds: 2,
    baths: 2,
    rating: 4,
    petFriendly: true,
    washerDryer: true,
    coord: [72, 28],
  },
  {
    id: "5jmk6l7n",
    title: "House on Summer",
    address: "144 Summer Street, Amherst, MA 01002",
    phone: "(xxx) xxx-xxxx",
    email: "landlord@gmail.com",
    image:
      "https://images1.forrent.com/i2/MmD5baLPbl6srhNc3W1O30tfpiSgENYJXk_FtlbXohA/117/image.jpg",
    price: 650,
    beds: 4,
    baths: 2,
    rating: 5,
    petFriendly: true,
    washerDryer: true,
    coord: [0.01, 140],
  },
  {
    id: "1f6d3f4g",
    title: "Modern Townhouse",
    address: "70 Amity Place, Amherst, MA 01002",
    phone: "(413) 345-5516",
    email: "email@email.com",
    image:
      "https://img.offcampusimages.com/eTu-eZ96F3-5ZTQP-wqcUnozB4Y=/330x440/left/top/smart/images/wsd7wlundtpqgwfdb_yjtusnspste4y32rieosgl1ew.jpeg",
    price: 2500,
    beds: 3,
    baths: 2.5,
    rating: 3,
    washerDryer: true,
    coord: [96, 56],
  },
  {
    id: "5r6k7f4e",
    title: "91 State Street",
    address: "91 State Street, Amherst, MA 01002",
    phone: "(781) 738-5784",
    email: "email@email.com",
    image:
      "https://img.offcampusimages.com/wbMjETwr-N4hzhsqhyeAQEf-CsQ=/660x440/left/top/smart/images/hlowbsi2anpfnxnmc0tlrsrbzg7qeweiaxmnusfeymk.jpeg",
    price: 3200,
    beds: 4,
    baths: 1,
    rating: 3,
    washerDryer: true,
    coord: [192, 140],
  },
  {
    id: "5r60of4e",
    title: "91 State Street",
    address: "91 State Street, Amherst, MA 01002",
    phone: "(781) 738-5784",
    email: "email@email.com",
    image:
      "https://img.offcampusimages.com/wbMjETwr-N4hzhsqhyeAQEf-CsQ=/660x440/left/top/smart/images/hlowbsi2anpfnxnmc0tlrsrbzg7qeweiaxmnusfeymk.jpeg",
    price: 3200,
    beds: 4,
    baths: 1,
    rating: 3,
    washerDryer: true,
    coord: [0.5, 160],
  },
];

export const searchRouter = router({
  searchApartments: publicProcedure
    .input(
      z.object({
        location: z.string().optional(),
        price: z.number().optional(),
        beds: z.number().optional(),
        baths: z.number().optional(),
        rating: z.number().optional(),
        more: z.string().optional(),
      })
    )
    .query(({ input }) => {
      const results = APARTMENTS.filter((a) => {
        console.log(input);
        for (const [filter, selection] of Object.entries(input)) {
          console.log(filter, selection);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (filter === "more" && selection && !a?.[selection]) {
            return false;
          } else if (filter === "price") {
            if (a?.[filter] > selection) {
              return false;
            }
          } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (a?.[filter] < selection) {
              return false;
            }
          }
        }
        return true;
      });

      return results;
    }),
  getApartmentById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      console.log(input);
      return APARTMENTS.find((a) => a.id === input.id);
    }),
});

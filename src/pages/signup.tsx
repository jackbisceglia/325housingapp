import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Signup: NextPage = () => {
  return (
    <>
      <Head>
        <title>RateMyHousing</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-marooon-700 py-4 px-6 lg:px-36">
        <h1 className="text-6xl font-black text-marooon-50">RateMyHousing</h1>
        <p className="p-0 text-xl font-light text-marooon-50">
          find your next living arrangement
        </p>
        <form
          action=""
          className="flex h-2/3 w-1/3 flex-col items-center justify-around rounded-md bg-marooon-50 py-4 px-10 "
        >
          <div className="flex w-full justify-evenly py-4 text-3xl">
            <h1 className="font-black underline underline-offset-8">Sign Up</h1>
            <Link href="/login">Login</Link>
          </div>
          <p className="w-full text-center text-lg text-marooon-700">
            Sign up using your student id to start searching
          </p>
          <div className="w-9/12 py-2">
            <label className="text-xl text-marooon-700  " htmlFor="">
              email address
            </label>
            <input className="w-full rounded-md p-2" type="text" />
          </div>
          <div className="w-9/12 py-2">
            <label className="text-xl text-marooon-700  " htmlFor="">
              student id
            </label>
            <input className="w-full rounded-md p-2" type="text" />
          </div>
          <div className="w-9/12 py-2">
            <label className="text-xl text-marooon-700  " htmlFor="">
              password
            </label>
            <input className="w-full rounded-md p-2" type="password" />
          </div>
          <div className="w-9/12 py-2">
            <label className="text-xl text-marooon-700  " htmlFor="">
              confirm password
            </label>
            <input className="w-full rounded-md p-2" type="password" />
          </div>
          <Link
            href="/"
            className="my-4 w-9/12 rounded-md bg-marooon-700 py-2 text-center text-3xl text-marooon-50 transition-all duration-200 hover:bg-marooon-800"
          >
            Sign Up
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;

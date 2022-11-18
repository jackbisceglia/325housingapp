import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" flex justify-start bg-marooon-700 py-4 px-40">
      <Link href="/">
        <span className="text- self-center whitespace-nowrap text-3xl font-extrabold text-marooon-50">
          RateMyHousing
        </span>
      </Link>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto w-full max-w-screen-md">
        <div className="grid w-full grid-cols-2 gap-8 py-8 px-6 md:grid-cols-3">
          <div>
            <h3>Title</h3>
            <div>
              <li>
                <Link href="/about" className="inline hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://github.com/joepetrillo/hackumass-2022"
                  className="inline hover:underline"
                >
                  Contribute
                </Link>
              </li>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="mx-auto">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;

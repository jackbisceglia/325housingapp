import Link from "next/link";
import { useRouter } from "next/router";

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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const excludedPaths = ["/login", "/signup"];
  const router = useRouter();
  return (
    <div className="h-screen">
      {!excludedPaths.includes(router.asPath) && <Navbar />}
      <main className="mx-auto">{children}</main>
    </div>
  );
};

export default Layout;

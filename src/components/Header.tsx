import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CiSearch } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { MdLogin } from "react-icons/md";
import logo from "@/assets/logo.png";
import MobileNavbar from "./MobileNavbar";

const Header = () => {
  const navLinks = [
    { id: "1", title: "Home", path: "/" },
    { id: "2", title: "Food", path: "/foods" },
    { id: "3", title: "About Us", path: "/about-us" },
    { id: "4", title: "Delivery", path: "/delivery" },
    { id: "5", title: "Contact", path: "/contact" },
  ];

  return (
    <div className="bg-gradient-to-r from-[#fed754] to-[#edbd41]">
      <div className="max-w-6xl mx-auto py-2 md:py-5 ">
        <div className="flex flex-row items-center justify-between">
          <div className="text-3xl font-bold text-rose-950 flex flex-row items-center">
            <img src={logo} alt="logo" className="h-20 w-20 sm:h-20 sm:w-20" /> 
            <span className="hidden sm:block">EatsXpress</span>
          </div>
          <div className="md:hidden mr-4">
            <MobileNavbar  navLinks={navLinks}/>
          </div>
          <div className="hidden sm:flex flex-row gap-6">
            {navLinks.map((navLink) => (
              <Link
                to={navLink.path}
                key={navLink.id}
                className="text-base font-semibold text-gray-600 transition-colors duration-300 hover:text-rose-950"
              >
                {navLink.title}
              </Link>
            ))}
          </div>
          <div className="hidden sm:flex flex-row gap-2">
            <div className="flex flex-row mr-10 items-center">
              <Button variant={"ghost"} className="hover:bg-transparent">
                <CiSearch size={25} />
              </Button>
              <Button variant={"ghost"} className="hover:bg-transparent">
                <BsCart3 size={25} />
              </Button>
            </div>
            <Button variant={"ghost"} asChild className="hover:bg-transparent">
              <Link to="/login">
                Login{" "}
                <span className="ml-2">
                  <MdLogin size={25} />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

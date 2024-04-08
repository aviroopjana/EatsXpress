import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { CiSearch } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { MdLogin } from "react-icons/md";
import logo from "@/assets/logo.png";
import MobileNavbar from "./MobileNavbar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserDropdownMenu from "./UserDropdownMenu";
import { useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const location = useLocation();

  const isCartDetailPage = location.pathname.startsWith("/cartdetail");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navLinks = [
    { id: "1", title: "Home", path: "/" },
    { id: "2", title: "Food", path: "/foods" },
    { id: "3", title: "About Us", path: "/about-us" },
    { id: "4", title: "Delivery", path: "/delivery" },
    { id: "5", title: "Contact", path: "/contact" },
  ];

  const { items } = useSelector((state: RootState) => state.cart);

  const cartItemCount = items.length;

  const handleIconClick = () => {
    navigate("/");

    setTimeout(() => {
      const searchSection = document.getElementById("searchSection");
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="bg-gradient-to-r from-[#fed754] to-[#edbd41] ">
      <div className="max-w-6xl mx-auto py-2 md:py-5 ">
        <div className="flex flex-row items-center justify-between">
          <div className="text-3xl font-bold text-rose-950 flex flex-row items-center">
            <img src={logo} alt="logo" className="h-20 w-20 sm:h-20 sm:w-20" />
            <span className="hidden sm:block">EatsXpress</span>
          </div>
          <div className="md:hidden mr-4">
            <MobileNavbar navLinks={navLinks} />
          </div>
          <div className="hidden sm:flex flex-row gap-6">
            {navLinks.map((navLink) => (
              <NavLink
                to={navLink.path}
                key={navLink.id}
                className={({ isActive }) =>
                  `text-base font-semibold text-gray-500 transition-colors duration-300 hover:text-rose-950 ${
                    isActive ? "text-rose-950 font-bold text-lg" : ""
                  }`
                }
              >
                {navLink.title}
              </NavLink>
            ))}
          </div>
          <div className="hidden sm:flex flex-row gap-2">
            <div className="flex flex-row mr-10 items-center">
              <Button
                variant={"ghost"}
                className="hover:bg-transparent"
                onClick={handleIconClick}
              >
                <CiSearch size={25} />
              </Button>
              <Button
                variant={"ghost"}
                className="hover:bg-transparent"
                onClick={() =>
                  navigate(`/cartdetail/${currentUser?.restaurantId}`)
                }
              >
                <div className="relative">
                  <BsCart3
                    size={isCartDetailPage ? 30 : 25}
                    color={isCartDetailPage ? "brown" : "black"}
                  />
                  {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-4 h-4 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </Button>
            </div>
            {currentUser ? (
              <UserDropdownMenu
                isOpen={isDropdownOpen}
                toggleDropdown={toggleDropdown}
              />
            ) : (
              <Button
                variant={"ghost"}
                asChild
                className="hover:bg-transparent"
              >
                <Link to="/sign-in">
                  Login{" "}
                  <span className="ml-2">
                    <MdLogin size={25} />
                  </span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

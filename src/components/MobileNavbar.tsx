import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CiSearch } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { MdLogin } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";

const MobileNavbar = ({ navLinks }: { navLinks: Array<{ path: string, id: string, title: string }> }) => {
  return (
    <Sheet>
      <SheetTrigger><BiMenu size={25}/></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Navigation menu for EatsXpress.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4">
          {navLinks.map((navLink) => (
            <Link
              to={navLink.path}
              key={navLink.id}
              className="text-base font-semibold text-gray-600 transition-colors duration-300 hover:text-rose-950"
            >
              {navLink.title}
            </Link>
          ))}
          <div className="flex flex-row gap-2">
            <Button variant={"ghost"} className="hover:bg-transparent">
              <CiSearch size={25} />
            </Button>
            <Button variant={"ghost"} className="hover:bg-transparent">
              <BsCart3 size={25} />
            </Button>
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;

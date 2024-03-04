import { FaFacebook, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../public/assets/logo.png";
import { ImInstagram } from "react-icons/im";
import { BsTwitterX, BsWhatsapp } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#fed754] to-[#edbd41] py-8">
      <div className="w-full flex flex-col  md:max-w-6xl mx-auto sm:flex sm:flex-row justify-between md:items-start items-center">
        {/* Logo Section */}
        <div className="flex flex-col gap-3 items-start">
          <div className="text-xl md:text-3xl font-bold flex flex-row items-center md:ml-7">
            {" "}
            <img src={logo} alt="logo" className="h-20 w-20" /> EatsXpress
          </div>
          <p className="w-48 ml-6 md:w-40 items-center justify-center md:ml-20">
            Our mission is to make healthy eating easy and convenient for busy
            individual and families
          </p>
          <div className="hidden md:flex flex-row mt-4 gap-3 md:ml-20">
            <ImInstagram />
            <FaFacebook />
            <BsTwitterX />
            <BsWhatsapp />
          </div>
        </div>
        {/* Company Section*/}
        <div className="text-center flex flex-col items-center justify-center md:my-20 mt-4 md:ml-7">
          <h2 className="text-2xl font-semibold mb-2">Company</h2>
          <p>Food</p>
          <p>Services</p>
          <p>Delivery</p>
          <p>Contact</p>
        </div>
        {/* For Customer Section*/}
        <div className="text-center md:my-20 mt-4 md:ml-7">
          <h2 className="text-2xl font-semibold mb-2">For Customer</h2>
          <p>Shipping & Handling</p>
          <p>Return policy</p>
          <p>Certifications</p>
          <p>Site map</p>
        </div>
        {/* Contact Section*/}
        <div className="text-center md:my-20 mt-4">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>123 Street Name</p>
          <p>City, Country</p>
          <p>Email: example@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
        <div className="flex flex-row mt-4 gap-3 md:hidden">
            <ImInstagram />
            <FaFacebook />
            <BsTwitterX />
            <BsWhatsapp />
          </div>
        <div className="hidden md:block my-20">
          {/* map component */}
          <div className="bg-gray-700 w-64 h-40 rounded-lg flex items-center justify-center">
            <FaMapMarkerAlt className="text-white text-4xl" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

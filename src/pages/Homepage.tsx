import { Input } from "@/components/ui/input";
import backgroundBanner from "@/assets/background-banner.jpg";
import searchbackground from "@/assets/search-back2.jpg";
import { Button } from "@/components/ui/button";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="relative">
      <img
        src={backgroundBanner}
        alt="background"
        className="object-cover h-[750px] w-full"
      />
      <div className="absolute inset-0">
        <div className="max-w-5xl p-5 flex flex-col mx-auto text-white mt-12 md:mt-28">
          <p className="text-xl font-bold">Welcome to EatsXpress!!</p>
          <h1 className="mt-4 text-4xl md:text-5xl md:max-w-lg font-bold">
            The Fastest Healthy Food Delivery In{" "}
            <span className="text-rose-950">Your City</span>
          </h1> 
          <p className="md:max-w-md md:mt-4 mt-8 font-medium">
            Our mission at EatsXpress is to Delivering fresh, healthy meals with
            lightning speed. Enjoy a diverse menu for breakfast, lunch, and
            dinner, crafted for busy individuals and families.
          </p>
          <div className="flex flex-row items-center mt-8  md:mt-4">
            <Input
              type="tel"
              placeholder="Enter your phone number"
              className="md:max-w-xs rounded-3xl h-10 text-white placeholder-[#4c0519] bg-transparent border focus:ring-[#4c0519] border-[#4c0519]"
            />
            <Button className="bg-[#4c0519] hover:bg-[#93080b] h-10 rounded-3xl transition-transform duration-300">
              Register Now
            </Button>
          </div>
        </div>
      </div>
      {/* Search Section */}
      <div className="relative">
        
      <img
        src={searchbackground}
        alt="background"
        className="object-cover h-[750px] w-full"
      />
        <div className="h-screen mx-auto p-5 absolute inset-0 mt-28">
        <h1 className="flex items-center justify-center text-4xl font-bold text-orange-600">Explore Local Flavors Near You</h1>
        <p className="flex items-center justify-center max-w-3xl mx-auto my-8 font-semibold text-lg text-white">Dive into the vibrant culinary scene of your area and uncover hidden gems waiting to be savored. Whether you're a food enthusiast or a casual diner, there's something delightful for every palate. Begin your gastronomic exploration by searching for restaurants in your city or town.</p>
        <div className="items-center justify-center mt-6">
          <SearchBar placeHolder="Search by city or town" onSubmit={handleSearchSubmit} isHomePage={true}/>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Homepage;

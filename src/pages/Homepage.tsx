import { Input } from "@/components/ui/input";
import backgroundBanner from "@/assets/background-banner.jpg";
import { Button } from "@/components/ui/button";

const Homepage = () => {
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
    </div>
  );
};

export default Homepage;

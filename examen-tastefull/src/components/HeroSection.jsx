import { Link } from "react-router-dom";

import Button from "./Button";

const HeroSection = () => {
  return (
    <div
      className="h-170 w-screen bg-no-repeat flex justify-start items-end"
      style={{
        backgroundImage: "url(/images/heroImage.jpg)",
        backgroundSize: "100%", // Ajustezi procentul pentru "zoom out"
        backgroundPosition: "50% 70%",
      }}
    >
      <div>
        <div
          className="gap-20 flex flex-col "
          
        >
          <div>
            <p className="text-bg italic ml-20 text-3xl w-150 ">
              A balanced diet is a cookie in each hand!{" "}
            </p>
            <p className="text-bg italic ml-20 text-3xl w-150">
              Find the perfect dessert to make your day even better !
            </p>
          </div>
          <Link to="/category/desserts">
            <Button className="text-accent ml-20 mb-20 hover:text-bg hover:bg-secondary cursor-pointer font-bold" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

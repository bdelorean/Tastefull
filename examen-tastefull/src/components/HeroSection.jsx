import { Link } from "react-router-dom";
import Button from "./Button";

const HeroSection = ({ backgroundImage, title, subtitle, buttonLink, buttonText }) => {
  return (
    <div
      className="h-170 w-screen bg-no-repeat flex justify-start items-end"
      style={{
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: "100%", 
        backgroundPosition: "50% 70%", 
      }}
    >
      <div>
        <div className="gap-20 flex flex-col ">
          <div>
            <p className="text-bg italic ml-20 text-3xl w-150 ">
              {title} 
            </p>
            <p className="text-bg italic ml-20 text-3xl w-150">
              {subtitle} 
            </p>
          </div>
          <Link to={buttonLink}> 
            <Button className="text-accent ml-20 mb-20 hover:text-bg hover:bg-secondary cursor-pointer font-bold">
              {buttonText} 
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

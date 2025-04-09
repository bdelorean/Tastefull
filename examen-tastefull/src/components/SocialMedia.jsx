import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const SocialMedia = ({className=" "}) => {
  return (
    <div className={`flex flex-row justify-center items-center gap-6 ${className}`}>
      <FaFacebook />
      <FaTiktok />
      <FaInstagram />
    </div>
  );
};

export default SocialMedia;

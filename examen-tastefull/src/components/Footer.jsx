import SocialMedia from "./SocialMedia";

const Footer = () => {
  return (
    <>
      <footer
        className=" text-bg py-4 mt-10 text-center h-50 footer-bg"
        style={{
          backgroundImage: 'url("/images/footerImage.png")', 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p className="z-10 relative">&copy; 2025 TasteFull Recipes</p>
        <p className="text-m mt-2">Created with love and lots of coffee ☕</p>
        <p className="text-m mt-2 italic">
          1234 Imaginary Street, Flavor Town
        </p>
        <p className="text-sm mt-2">
          Open daily from 08:00 to 22:00 (UTC dreams only 😴)
        </p>
        <SocialMedia className="mt-2" />
      </footer>
    </>
  );
};

export default Footer;

const Footer = () => {
  return (
    <>
      <footer
        className=" text-bg p-4 mt-auto text-center h-40 footer-bg"
        style={{
          backgroundImage: 'url("/images/footerImage.png")', // Imaginea exportată din Figma
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        
        <p className="z-10 relative">&copy; 2025 TasteFull Recipes</p>
      </footer>
    </>
  );
};

export default Footer;

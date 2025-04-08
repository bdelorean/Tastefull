const Button = ({ className = " " }) => {
  return (
    <>
      <button
        className={`px-10 py-4 rounded-4xl bg-bg shadow-[0_10px_20px_rgba(170,170,204,0.3)] transition-all duration-500 ease-in-out hover:shadow-[0_8px_16px_rgba(170,170,204,0.4)] hover:scale-105 transform ${className}`}
      >
        Discover more
      </button>
    </>
  );
};

export default Button;

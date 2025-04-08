import { Link } from "react-router-dom";

const Header = ({ className }) => {
  return (
    <header className="fixed top-0 h-20 w-screen flex flex-row items-center justify-center text-4xl bg-bg/50 backdrop-blur-md shadow-lg ">
      <h1>
        <Link to="/">
          Taste
          <span
            className="italic text-accent font-semibold"
            style={{ textShadow: "0px 1px 5px rgba(0,0,0,0.25)" }}
          >
            full
          </span>
        </Link>
      </h1>
    </header>
  );
};

export default Header;

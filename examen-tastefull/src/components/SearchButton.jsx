import { FaSearch } from "react-icons/fa"

const SearchButton = ({ onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-accent text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-200 ml-2"
      >
        <FaSearch />
      </button>
    </>
  );
};

export default SearchButton;

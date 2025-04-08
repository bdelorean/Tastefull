import { useState, useEffect } from "react";
import axios from "axios";
import RecipeGrid from "./RecipeGrid";
import SearchButton from "./SearchButton";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    if (query !== "") {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${
          import.meta.env.VITE_MY_API_KEY
        }`
      );
      console.log(response.data)
      setRecipes(response.data.results);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      setRecipes([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Se va apela funcția handleSearch când apăsăm Enter
    }
  };
  return (
    <>
      <div className="py-6 px-4 flex justify-center items-center">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Carrotcake.."
          className="w-full max-w-md p-2 border border-gray-300 rounded-2xl placeholder:italic"
        />

        <SearchButton onClick={handleSearch} />
      </div>
      <div>{recipes.length > 0 && <RecipeGrid recipes={recipes} />}</div>
    </>
  );
};

export default SearchBar;

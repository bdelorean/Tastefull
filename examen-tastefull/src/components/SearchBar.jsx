import { useState, useEffect } from "react";
import axios from "axios";
import RecipeGrid from "./RecipeGrid";
import SearchButton from "./SearchButton";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (query === "") {
      setError("Please enter a valid search query.");
      setRecipes([]);
      return;
    }

    const regex = /[^a-zA-Z0-9\s]/;
    if (regex.test(query)) {
      setError(
        "Invalid characters detected. Please try again with a valid search term."
      );
      setRecipes([]);
      return;
    }
    setError("");

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${
          import.meta.env.VITE_MY_API_KEY
        }`
      );
      const results = response.data.results;

      // setRecipes(response.data.results);
      if (results.length === 0) {
        setError("No recipes found. Please try a different search.");
        setRecipes([]); // aici setăm lista goală explicit
      } else {
        setRecipes(results); // păstrăm rețetele doar dacă există
        setError(""); // ștergem eventualele erori anterioare
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setRecipes([]); // dacă e o eroare de rețea, resetăm lista
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
      <div className="py-6 px-4 flex flex-col justify-center items-center">
        <h2 className="font-bold text-2xl mb-4">Your Craving Starts Here 👇</h2>
        <div className="flex items-center justify-center w-200">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Carrot cake.."
            className="w-full max-w-md p-2 border border-gray-400 rounded-2xl placeholder:italic"
          />
          <SearchButton onClick={handleSearch} />
        </div>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
      <div>{recipes.length > 0 && <RecipeGrid recipes={recipes} />}</div>
    </>
  );
};

export default SearchBar;

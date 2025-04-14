import { useState } from "react";
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
      setRecipes([]); // Leeg de lijst bij een fout
      return;
    }

    const regex = /[^a-zA-Z0-9\s]/;
    if (regex.test(query)) {
      setError(
        "Invalid characters detected. Please try again with a valid search term."
      );
      setRecipes([]); // Leeg de lijst bij ongeldige tekens
      return;
    }
    setError("");

    try {
      // Haal de lijst met recepten op via de complexSearch API
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${
          import.meta.env.VITE_MY_API_KEY
        }`
      );
      const results = response.data.results;

      if (results.length === 0) {
        setError("No recipes found. Please try a different search.");
        setRecipes([]);
      } else {
       // Haal extra details op voor elke recept met de information endpoint
       // Met Promise.all haal je details voor alle recepten tegelijk op
        const recipeDetails = await Promise.all(
          results.map(async (recipe) => {
            const detailResponse = await axios.get(
              `https://api.spoonacular.com/recipes/${
                recipe.id
              }/information?apiKey=${import.meta.env.VITE_MY_API_KEY}`
            );
            return detailResponse.data;// Geef alle details van het recept terug
          })
        );

        setRecipes(recipeDetails); // Update de staat met volledige receptgegevens
        setError("");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setRecipes([]); // Leeg de lijst bij een netwerkfout
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
      handleSearch();
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

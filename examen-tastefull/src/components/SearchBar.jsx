import { useState, useEffect } from "react";
import axios from "axios";
import RecipeGrid from "./RecipeGrid";
import SearchButton from "./SearchButton";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  // Functie voor het uitvoeren van de zoekopdracht
  const handleSearch = async () => {
    if (query === "") {
      setError("Please enter a valid search query.");
      setRecipes([]); // Maak de lijst leeg bij een fout
      return;
    }

    const regex = /[^a-zA-Z0-9\s]/;
    if (regex.test(query)) {
      setError(
        "Invalid characters detected. Please try again with a valid search term."
      );
      setRecipes([]); // Maak de lijst leeg bij ongeldige tekens
      return;
    }
    setError("");
    
    // Haal recepten op via de API van Spoonacular
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${
          import.meta.env.VITE_MY_API_KEY
        }`
      );
      const results = response.data.results;

      // Controleer of er recepten gevonden zijn
      if (results.length === 0) {
        setError("No recipes found. Please try a different search.");
        setRecipes([]); 
      } else {
        setRecipes(results); 
        setError(""); 
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setRecipes([]); // dacă e o eroare de rețea, resetăm lista
    }
  };
  
  //Werk de zoekterm bij wanneer je typt
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      setRecipes([]);
    }
  };
  
  // Zoek wanneer je op Enter drukt
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
         {/* Foutmelding weergeven als er een error is */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
      {/* Recepten weergeven als er resultaten zijn */}
      <div>{recipes.length > 0 && <RecipeGrid recipes={recipes} />}</div>
    </>
  );
};

export default SearchBar;

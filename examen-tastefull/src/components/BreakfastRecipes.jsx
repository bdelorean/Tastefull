import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { fetchWithCache } from "../utils/fetchWithCache";

function BreakfastRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchBreakfastRecipes = async () => {
      const data = await fetchWithCache("breakfastRecipes", async () => {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=4&tags=breakfast&apiKey=${
            import.meta.env.VITE_MY_API_KEY
          }`
        );
        return response.data.recipes;
      });

      setRecipes(data);
    };
    fetchBreakfastRecipes();
  }, []);

  return (
    <div className="py-6 px-4">
      <Link to="/category/breakfast">
        <h2 className="text-2xl font-bold mb-4 cursor-pointer hover:underline">
          Breakfast Recipes
        </h2>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default BreakfastRecipes;

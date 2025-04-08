import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RecipeCard from "./RecipeCard";

function PopularRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/random?number=4&apiKey=${
          import.meta.env.VITE_MY_API_KEY
        }`
      );
      console.log(response.data);
      setRecipes(response.data.recipes);
    };
    fetchPopularRecipes();
  }, []);

  return (
    <>
      <div className="py-6 px-4">
        <Link to="/category/popular">
          <h2 className="text-2xl font-bold mb-4 cursor-pointer hover:underline">
            Popular Recipes
          </h2>
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
      
    </>
  );
}

export default PopularRecipes;

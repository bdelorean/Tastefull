import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { fetchWithCache } from "../utils/fetchWithCache";
import AOS from "aos";
import "aos/dist/aos.css";

function MainCourseRecipes() {
  // Gebruik useState om de recepten op te slaan
  const [recipes, setRecipes] = useState([]);

  //AOS voor animaties
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: true,
      anchorPlacement: "top-bottom",
    });
    
    //Recepten ophalen
    const fetchMainCourseRecipes = async () => {
      // Haal gegevens uit localStorage als ze geldig zijn, anders fetch nieuwe data en sla op
      const data = await fetchWithCache("mainCourseRecipes", async () => {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=4&tags=main%20course&apiKey=${
            import.meta.env.VITE_MY_API_KEY
          }`
        );
        return response.data.recipes;
      });
      
      // Sla de opgehaalde recepten op in de state
      setRecipes(data);
    };
    fetchMainCourseRecipes();
  }, []);

  return (
    <div className="py-6 px-4" data-aos="fade-right">
      <Link to="/category/main-course">
        <h2 className="group relative text-2xl font-bold mb-4 cursor-pointer inline-block ">
          Main Course Recipes
          <span className="absolute  left-0 bottom-0 h-[1.5px] w-0 bg-dark transition-all duration-500 group-hover:w-full"></span>
          <span className="ml-2 inline-block opacity-0 transform translate-x-[-5px] transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            →
          </span>
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

export default MainCourseRecipes;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeGrid from "../components/RecipeGrid";
import { fetchWithCache } from "../utils/fetchWithCache";
import GoBackButton from "../components/GoBackButton";
import HeroSectionCategory from "../components/HeroSectionCategory";

const Category = () => {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      const endpoint =
        categoryName === "popular"
          ? `https://api.spoonacular.com/recipes/random?number=12`
          : `https://api.spoonacular.com/recipes/complexSearch?type=${categoryName}&number=12&addRecipeInformation=true`;

          //Cache logic
          const data = await fetchWithCache(
            categoryName,
            async () => {
              const response = await axios.get(
                `${endpoint}&apiKey=${import.meta.env.VITE_MY_API_KEY}`
              );
              return categoryName === "popular" ? response.data.recipes : response.data.results; 
            }
          )
      
      setRecipes(data);
    };
    fetchCategoryRecipes();
  }, [categoryName]);

  const goBack = () => {
    navigate("/"); // Mergi la Home
  };

  return (
    <>
    <HeroSectionCategory />
      <div className="py-6 px-12">
        
        <GoBackButton />
        <h1 className="text-3xl font-bold capitalize mb-6 underline flex justify-center">
          {categoryName}
        </h1>
        <RecipeGrid recipes={recipes} />
      </div>
    </>
  );
};

export default Category;

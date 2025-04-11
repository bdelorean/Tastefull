import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeGrid from "../components/RecipeGrid";
import { fetchWithCache } from "../utils/fetchWithCache";
import GoBackButton from "../components/GoBackButton";
import HeroSection from "../components/HeroSection";

const Category = () => {
  const { categoryName } = useParams(); // Haalt de categorie uit de URL (bv. 'breakfast')
  const [recipes, setRecipes] = useState([]); // Slaat recepten op
  const navigate = useNavigate(); // Voer navigatie binnen de app

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
       // Bepaal de juiste endpoint op basis van de categorie
      const endpoint =
        categoryName === "popular"
          ? `https://api.spoonacular.com/recipes/random?number=12`
          : `https://api.spoonacular.com/recipes/complexSearch?type=${categoryName}&number=12&addRecipeInformation=true`;

      //Cache logic
      const data = await fetchWithCache(categoryName, async () => {
        const response = await axios.get(
          `${endpoint}&apiKey=${import.meta.env.VITE_MY_API_KEY}`
        );
        return categoryName === "popular"
          ? response.data.recipes
          : response.data.results;
      });

      setRecipes(data);
    };
    fetchCategoryRecipes();
  }, [categoryName]); // Voer opnieuw uit wanneer de categorie verandert

  const goBack = () => {
    navigate("/"); 
  };

  return (
    <div className="page">
      <HeroSection
        backgroundImage="/images/heroImageCategory.png"
        title="Good food brings people together."
        subtitle="Discover the perfect recipe for every moment of the day!"
        buttonLink="/"
      />
      <div className="py-6 px-12">
        <GoBackButton />
        <h1 className="text-3xl font-bold capitalize mb-6 underline flex justify-center">
          {categoryName}
        </h1>
        <RecipeGrid recipes={recipes} />
      </div>
    </div>
  );
};

export default Category;

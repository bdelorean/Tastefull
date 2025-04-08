import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeGrid from "../components/RecipeGrid";

const Category = () => {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      const endpoint =
        categoryName === "popular"
          ? `https://api.spoonacular.com/recipes/random?number=12`
          : `https://api.spoonacular.com/recipes/complexSearch?type=${categoryName}&number=12&addRecipeInformation=true`;
      const response = await axios.get(
        `${endpoint}&apiKey=${import.meta.env.VITE_MY_API_KEY}`
      );
      setRecipes(
        categoryName === "popular"
          ? response.data.recipes
          : response.data.results
      );
    };
    fetchCategoryRecipes();
  }, [categoryName]);

  const goBack = () => {
    navigate("/"); // Mergi la Home
  };

  return (
    <>
      <div className="py-6 px-12">
        <button
          onClick={goBack}
          className="mb-4 px-4 py-2 bg-accent text-white rounded-md cursor-pointer"
        >
          {" "}
          Back to Home{" "}
        </button>
        <h1 className="text-3xl font-bold capitalize mb-6 underline flex justify-center">
          {categoryName}
        </h1>
        <RecipeGrid recipes={recipes} />
      </div>
    </>
  );
};

export default Category;

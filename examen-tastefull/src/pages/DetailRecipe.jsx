import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GoBackButton from "../components/GoBackButton";
import { FaListOl } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { GiCookingPot } from "react-icons/gi";

const DetailRecipe = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${
          import.meta.env.VITE_MY_API_KEY
        }`
      );
      setRecipe(response.data);
    };
    fetchRecipe();
  }, [recipeId]);

  if (!recipe) return <div>Loading...</div>;
  return (
    <div className="px-12">
      <GoBackButton />

      <div className="py-25 ">
        <div className="flex flex-row justify-start gap-20">
          <div className="">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full max-w-md mb-4"
            />
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc pl-6 mb-4">
              {recipe.extendedIngredients.map((ing) => (
                <li key={ing.id}>{ing.original}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <GiCookingPot />
            Instructions
          </h2>
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        </div>
        <div className="mt-4">
          <p className="text-lg flex items-center">
            <FaClock />
            <strong>Preparation Time:</strong> {recipe.readyInMinutes} minutes
          </p>
          <p className="text-lg flex items-center">
            <FaUtensils /> <strong>Servings:</strong> {recipe.servings} people
          </p>
        </div>
        <div className="mb-4 flex flex-row items-center gap-2">
          <h3 className="text-lg font-semibold flex items-center">
            <GiFruitBowl />
            Dietary Information:
          </h3>
          <p className="text-m">{recipe.diets.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailRecipe;

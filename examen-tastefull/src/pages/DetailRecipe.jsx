import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    <>
      <div className="py-6 px-4">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full max-w-md mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-6 mb-4">
          {recipe.extendedIngredients.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      </div>
    </>
  );
};

export default DetailRecipe;

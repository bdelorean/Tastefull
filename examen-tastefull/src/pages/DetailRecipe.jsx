import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GoBackButton from "../components/GoBackButton";
import { FaListOl } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { GiCookingPot } from "react-icons/gi";
import ReactRating from "react-rating-stars-component";


const DetailRecipe = () => {
  const { recipeId } = useParams(); // Haal het ID van het recept uit de URL
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  
   // Laad receptgegevens zodra de component geladen is
  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${
          import.meta.env.VITE_MY_API_KEY
        }&includeNutrition=true`
      );
      
      setRecipe(response.data); // Sla het recept op in de state
       
      // Genereer een willekeurige score tussen 3 en 5
      const randomRating = Math.floor(Math.random() * 3) + 3;
      setRating(randomRating);
    };
    fetchRecipe();
  }, [recipeId]);  //Voer opniew als het ID veranderd

  if (!recipe) return <div>Loading...</div>;
  
  
  
  return (
    <div className="px-12 page">
      <GoBackButton />

      <div className="py-25 ">
        <div className="flex flex-row justify-start gap-20">
          <div className="">
            <h1 className="text-3xl font-bold ">{recipe.title}</h1>

            {/* Ratings */}
            <ReactRating
              count={5} 
              value={rating} 
              edit={false} 
              size={30} 
              activeColor="#ffd700" 
              inactiveColor="#d3d3d3"
              char="★"
              classNames={{ star: "inline-block ", } }
              onChange={() => {}}
            />

           {/* Titel en image van de recept */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full max-w-md mb-4"
            />
            
          </div>

           {/* Ingrediëntenlijst */}
          <div className="mt-10 bg-gray-200  p-10 ">
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc pl-6 mb-4">
              {recipe.extendedIngredients.map((ing) => (
                <li key={ing.id}>{ing.original}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="">
          {/* Instructies */}
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <GiCookingPot />
            Instructions
          </h2>
          {/* om HTML-inhoud weer te geven die uit de API komt zonder dit kon ik gewoon de tags zien  */}
          <div className="w-200 ingredients ml-4" dangerouslySetInnerHTML={{ __html: recipe.instructions }} /> 
        </div>
        <div className="mt-4">
          <p className="text-lg flex items-center mb-2 gap-1">
            <FaClock />
            <strong>Preparation Time:</strong> {recipe.readyInMinutes} minutes
          </p>
          <p className="text-lg flex items-center mb-2 gap-1">
            <FaUtensils /> <strong>Servings:</strong> {recipe.servings} people
          </p>
        </div>

        {/* Dieetinformatie */}
        <div className="mb-4 flex flex-row items-center gap-2">
          <h3 className="text-lg font-semibold flex items-center gap-1">
            <GiFruitBowl />
            Dietary Information:
          </h3>
          <p className="text-m">{recipe.diets.join(", ")}</p>
        </div>
        
        {/* Nutritionele info */}
        {recipe.nutrition && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <FaListOl />
              Nutritional Information (per serving)
            </h2>
            <table className="w-full max-w-lg bg-gray-100 border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-left p-2 border-b border-gray-300">Nutrient</th>
                  <th className="text-left p-2 border-b border-gray-300">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-2">Calories</td>
                  <td className="p-2">
                    {recipe.nutrition.nutrients[0]?.amount}{" "}
                    {recipe.nutrition.nutrients[0]?.unit}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2">Fat</td>
                  <td className="p-2">
                    {recipe.nutrition.nutrients[1]?.amount}{" "}
                    {recipe.nutrition.nutrients[1]?.unit}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2">Carbohydrates</td>
                  <td className="p-2">
                    {recipe.nutrition.nutrients[3]?.amount}{" "}
                    {recipe.nutrition.nutrients[3]?.unit}
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Protein</td>
                  <td className="p-2">
                    {recipe.nutrition.nutrients[2]?.amount}{" "}
                    {recipe.nutrition.nutrients[2]?.unit}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default DetailRecipe;

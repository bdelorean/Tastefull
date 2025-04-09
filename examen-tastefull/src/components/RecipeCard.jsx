import React from "react";
import { Link } from "react-router-dom";
import { FaClock, FaUtensils } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="border-10 border-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover  transition-transform duration-500 ease-in-out transform hover:scale-105"
        />
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div className="flex justify-between">
            <p className="flex items-center gap-1">
              <FaClock className="text-gray-400" />
              {recipe.readyInMinutes} min
            </p>
            <p className="flex items-center gap-1">
              <FaUtensils className="text-gray-400" />
              {recipe.servings}
            </p>
          </div>

          <h3 className="mt-2 text-lg font-semibold line-clamp-2">{recipe.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;

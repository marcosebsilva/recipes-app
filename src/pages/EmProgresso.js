import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';

export default function EmProgresso() {
  const match = useRouteMatch();
  const [recipe, setRecipe] = useState();

  async function getRecipe() {
    const foodId = match.params.id;
    const response = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)).json();
    try {
      const food = Object.values(response)[0][0];
      setRecipe(food);
    } catch (error) {
      alert('Esse rango ai nao existe');
    }
  }

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div>
      manda salve
      {recipe && recipe.strMeal}
    </div>
  );
}

import React, { useEffect, useState, useCallback } from 'react';
import { useRouteMatch, useLocation } from 'react-router';

export default function EmProgresso() {
  const location = useLocation();
  const match = useRouteMatch();

  const [recipe, setRecipe] = useState();

  const api = location.pathname.includes('/bebidas')
    ? 'thecocktaildb'
    : 'themealdb';

  const foodType = {
    thecocktaildb: 'Drink',
    themealdb: 'Meal',
  };

  const getRecipeMemo = useCallback(async () => {
    const foodId = match.params.id;
    const response = await (await fetch(`https://www.${api}.com/api/json/v1/1/lookup.php?i=${foodId}`)).json();
    try {
      const food = Object.values(response)[0][0];
      setRecipe(food);
    } catch (error) {
      alert('Esse rango ai nao existe');
    }
  }, [api, match]);

  useEffect(() => {
    getRecipeMemo();
  }, [getRecipeMemo]);

  return (
    <div>
      Manda salve
      {recipe && recipe[`str${foodType[api]}`] }
    </div>
  );
}

import React, { useEffect, useState, useCallback } from 'react';
import { useRouteMatch, useLocation } from 'react-router';
import FoodCard from '../components/FoodCard';

export default function EmProgresso() {
  const location = useLocation();
  const match = useRouteMatch();

  const [recipe, setRecipe] = useState();

  const api = location.pathname.includes('/bebidas')
    ? 'thecocktaildb'
    : 'themealdb';

  const foodType = api === 'thecocktaildb'
    ? 'Drink'
    : 'Meal';

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
    <>
      <h1>Teste</h1>
      {recipe ? (
        <FoodCard recipe={ recipe } foodType={ foodType } />
      ) : <p>Carregando</p>}
    </>
  );
}

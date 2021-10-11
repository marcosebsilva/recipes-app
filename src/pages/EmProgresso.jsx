import React, { useEffect, useState, useCallback } from 'react';
import { useRouteMatch, useLocation } from 'react-router';
import FoodCard from '../components/FoodCard';
import FoodInstructions from '../components/FoodInstructions';
import FetchAPI from '../components/FetchAPI';

export default function EmProgresso() {
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState();

  const location = useLocation();
  const match = useRouteMatch();

  // chega em qual api ele deve chamar
  const api = location.pathname.includes('/bebidas')
    ? 'thecocktaildb'
    : 'themealdb';
  // checa o padrao de nome das chaves baseado na api a ser chamada
  const foodType = api === 'thecocktaildb'
    ? 'Drink'
    : 'Meal';
  // pega a receita pelo ID (linha 47);
  const getRecipeHook = useCallback(async () => {
    const foodId = match.params.id;
    const response = await FetchAPI(`https://www.${api}.com/api/json/v1/1/lookup.php?i=${foodId}`);
    try {
      const food = Object.values(response)[0][0];
      setRecipe(food);
    } catch (error) {
      global.alert('Esse rango ai nao existe');
    }
  }, [api, match]);

  // cria um array so com os ingredientes validos para ser passado pro component FoodInstructions (linha 53)
  const fillIngredientsHook = useCallback((arr) => {
    const ingredientsList = [];
    const objectLength = Object.keys(arr).length;

    for (let index = 1; index < objectLength; index += 1) {
      if (arr[`strIngredient${index}`]) {
        ingredientsList.push(arr[`strIngredient${index}`]);
      } else {
        break;
      }
    }
    setIngredients(ingredientsList);
  }, [setIngredients]);

  useEffect(() => {
    getRecipeHook();
  }, [getRecipeHook]);

  useEffect(() => {
    if (recipe !== undefined) {
      fillIngredientsHook(recipe);
    }
  }, [recipe, fillIngredientsHook]);

  return (
    <main className="main-in-progress">
      {recipe && ingredients ? (
        <>
          <FoodCard recipe={ recipe } foodType={ foodType } />
          <FoodInstructions
            ingredients={ ingredients }
            recipe={ recipe }
            foodType={ foodType }
          />
        </>
      ) : <p>Loading...</p>}
    </main>
  );
}

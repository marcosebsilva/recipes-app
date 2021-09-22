import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import recipesContext from '../context/recipesContext';

function RecipesProvider({ children }) {
  const { Provider } = recipesContext;
  const [foodData, setFoodData] = useState();
  const [foodCategoriesData, setFoodCategoriesData] = useState();
  const [drinkData, setDrinkData] = useState();
  const [drinkCategoriesData, setDrinkCategoriesData] = useState();

  async function fetchAPI(url) {
    const response = await fetch(url).then((res) => res.json());
    return response;
  }

  async function foodState() {
    const { meals } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setFoodData(meals);
  }

  async function foodCategoriesState() {
    const { meals } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    setFoodCategoriesData(meals);
  }

  async function drinkState() {
    const { drinks } = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setDrinkData(drinks);
  }

  async function drinkCategoriesState() {
    const { drinks } = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    setDrinkCategoriesData(drinks);
  }

  useEffect(() => {
    foodState();
    foodCategoriesState();
    drinkState();
    drinkCategoriesState();
  }, []);

  const obj = {
    foodData,
    foodCategoriesData,
    drinkData,
    drinkCategoriesData,
  };

  return (
    <Provider value={ obj }>
      { children }
    </Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;

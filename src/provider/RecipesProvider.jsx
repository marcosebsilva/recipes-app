import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import recipesContext from '../context/recipesContext';

function RecipesProvider({ children }) {
  const { Provider } = recipesContext;
  const [foodData, setFoodData] = useState();
  const [foodCategoriesData, setFoodCategoriesData] = useState();
  const [drinkData, setDrinkData] = useState();
  const [drinkCategoriesData, setDrinkCategoriesData] = useState();
  const [foodFilter, setFoodFilter] = useState();
  const [drinkFilter, setDrinkFilter] = useState();
  const [arrFiltered, setArrFiltered] = useState();

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

  async function filterByMainFoodIngredient(ingredient) {
    const { meals } = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingredient}`);
    setArrFiltered(meals);
  }

  async function drinkState() {
    const { drinks } = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setDrinkData(drinks);
  }

  async function drinkCategoriesState() {
    const { drinks } = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    setDrinkCategoriesData(drinks);
  }

  async function filterByMainDrinkIngredient(ingredient) {
    const { drinks } = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${ingredient}`);
    setArrFiltered(drinks);
  }

  useEffect(() => {
    foodState();
    foodCategoriesState();
    drinkState();
    drinkCategoriesState();
  }, []);

  useEffect(() => {
    if (foodFilter) {
      filterByMainFoodIngredient(foodFilter);
    } else {
      setArrFiltered(foodData);
    }
  }, [foodFilter]);

  useEffect(() => {
    if (drinkFilter) {
      filterByMainDrinkIngredient(drinkFilter);
    }
  }, [drinkFilter]);

  const obj = {
    foodData,
    foodCategoriesData,
    drinkData,
    drinkCategoriesData,
    arrFiltered,
    setFoodFilter,
    setDrinkFilter,
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

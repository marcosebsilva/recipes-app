import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import recipesContext from '../context/recipesContext';

function RecipesProvider({ children }) {
  const { Provider } = recipesContext;
  const [foodData, setFoodData] = useState();
  const [foodCategoriesData, setFoodCategoriesData] = useState();
  const [foodFilter, setFoodFilter] = useState();
  const [prevFoodFilter, setPrevFoodFilter] = useState();
  const [drinkData, setDrinkData] = useState();
  const [drinkCategoriesData, setDrinkCategoriesData] = useState();
  const [drinkFilter, setDrinkFilter] = useState();
  const [prevDrinkFilter, setPrevDrinkFilter] = useState();
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
    } else {
      setArrFiltered(drinkData);
    }
  }, [drinkFilter]);

  function handleClick({ value }, filter) {
    if (filter === 'food') {
      setFoodFilter((!foodFilter || prevFoodFilter !== value) ? value : undefined);
      setPrevFoodFilter(value);
    }

    if (filter === 'drink') {
      setDrinkFilter((!drinkFilter || prevDrinkFilter !== value) ? value : undefined);
      setPrevDrinkFilter(value);
    }
  }

  // Terceiro parametro é a função push do history
  function divClick(id, item, push) {
    if (item === 'drink') {
      push(`/bebidas/${id}`);
    }

    if (item === 'food') {
      push(`/comidas/${id}`);
    }
  }

  const obj = {
    foodData,
    foodCategoriesData,
    foodFilter,
    drinkData,
    drinkCategoriesData,
    drinkFilter,
    arrFiltered,
    setFoodFilter,
    setDrinkFilter,
    setArrFiltered,
    handleClick,
    divClick,
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

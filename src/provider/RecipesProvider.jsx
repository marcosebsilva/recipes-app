import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../context/recipesContext';
import FetchAPI from '../components/FetchAPI';

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

  async function StateData(item) {
    if (item === 'food') {
      const { meals } = await FetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setFoodData(meals);
    }

    if (item === 'drink') {
      const { drinks } = await FetchAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setDrinkData(drinks);
    }
  }

  async function stateCategories(item) {
    if (item === 'food') {
      const { meals } = await FetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      setFoodCategoriesData(meals);
    }

    if (item === 'drink') {
      const { drinks } = await FetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      setDrinkCategoriesData(drinks);
    }
  }

  async function filterByMainIngredient(ingredient, item) {
    if (item === 'food') {
      const { meals } = await FetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingredient}`);
      setArrFiltered(meals);
    }

    if (item === 'drink') {
      const { drinks } = await FetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${ingredient}`);
      setArrFiltered(drinks);
    }
  }

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

  useEffect(() => {
    StateData('food');
    StateData('drink');
    stateCategories('food');
    stateCategories('drink');
  }, []);

  useEffect(() => {
    if (foodFilter) {
      filterByMainIngredient(foodFilter, 'food');
    } else {
      setArrFiltered(foodData);
    }
  }, [foodFilter]);

  useEffect(() => {
    if (drinkFilter) {
      filterByMainIngredient(drinkFilter, 'drink');
    } else {
      setArrFiltered(drinkData);
    }
  }, [drinkFilter]);

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

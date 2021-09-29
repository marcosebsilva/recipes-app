import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../context/recipesContext';
import FetchAPI from '../components/FetchAPI';

function RecipesProvider({ children }) {
  const { Provider } = recipesContext;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [foodData, setFoodData] = useState();
  const [foodCategoriesData, setFoodCategoriesData] = useState();
  const [foodFilter, setFoodFilter] = useState();
  const [arrFilteredFood, setArrFilteredFood] = useState();
  const [prevFoodFilter, setPrevFoodFilter] = useState();
  const [arrFoodId, setArrFoodId] = useState();
  const [drinkData, setDrinkData] = useState();
  const [drinkCategoriesData, setDrinkCategoriesData] = useState();
  const [drinkFilter, setDrinkFilter] = useState();
  const [arrFilteredDrink, setArrFilteredDrink] = useState();
  const [prevDrinkFilter, setPrevDrinkFilter] = useState();
  const [arrDrinkId, setArrDrinkId] = useState();
  const [searchText, setSearchText] = useState();
  const [selectedRadio, setSelectedRadio] = useState();
  const [renderButton, setRenderButton] = useState(false);
  const [api, setApi] = useState();

  function handleEmailChange({ target }) {
    setEmail(target.value);
  }

  function handlePasswordChange({ target }) {
    setPassword(target.value);
  }

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
      setArrFilteredFood(meals);
    }

    if (item === 'drink') {
      const { drinks } = await FetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${ingredient}`);
      setArrFilteredDrink(drinks);
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

  const filterById = useCallback(async (id, item) => {
    if (item === 'food') {
      const { meals } = await FetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setArrFoodId(meals);
    }

    if (item === 'drink') {
      const { drinks } = await FetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setArrDrinkId(drinks);
    }
  }, []);

  // Terceiro parametro é a função push do history que está vindo do component MapContent.jsx que é renderizado nas pages Comidas.js e Bebidas.js
  function divClick(id, item, push) {
    if (item === 'food') {
      push(`/comidas/${id}`);
    }

    if (item === 'drink') {
      push(`/bebidas/${id}`);
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
      setArrFilteredFood(foodData);
    }
  }, [foodFilter, foodData]);

  useEffect(() => {
    if (drinkFilter) {
      filterByMainIngredient(drinkFilter, 'drink');
    } else {
      setArrFilteredDrink(drinkData);
    }
  }, [drinkFilter, drinkData]);

  const obj = {
    email,
    password,
    foodData,
    foodCategoriesData,
    foodFilter,
    setFoodFilter,
    arrFilteredFood,
    setArrFilteredFood,
    arrFoodId,
    setArrFoodId,
    drinkData,
    drinkCategoriesData,
    drinkFilter,
    setDrinkFilter,
    arrFilteredDrink,
    setArrFilteredDrink,
    arrDrinkId,
    setArrDrinkId,
    searchText,
    setSearchText,
    selectedRadio,
    setSelectedRadio,
    renderButton,
    setRenderButton,
    api,
    setApi,
    handleEmailChange,
    handlePasswordChange,
    handleClick,
    divClick,
    filterById,
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

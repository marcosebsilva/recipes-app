import React, { useEffect, useCallback, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { logDOM } from '@testing-library/dom';
import FetchAPI from '../components/FetchAPI';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function ReceitasFeitas() {
  const doneRecipesDois = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let idRecipesMeals = [];
  let idRecipesDrinks = [];
  const date = localStorage.getItem('date');
  const [mealsList, setMeal] = useState();
  const [drinksList, setDrinks] = useState();
  const [showMessage, setShowMessage] = useState();
  const [allRecipes, setAllRecipes] = useState();
  const history = useHistory();

  if (doneRecipesDois) {
    const { meals, cocktails } = doneRecipesDois;
    idRecipesMeals = Object.keys(meals);
    idRecipesDrinks = Object.keys(cocktails);
  }

  const getMeals = useCallback(
    async () => {
      const arrMeals = [];
      const arrDrinks = [];
      const arrAllRecipes = [];

      await Promise.all(idRecipesMeals.map(async (item) => {
        const api = await FetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`);
        await arrMeals.push(api.meals[0]);
        await arrAllRecipes.push(api.meals[0]);
      }));

      await Promise.all(idRecipesDrinks.map(async (item) => {
        const api = await FetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item}`);
        await arrDrinks.push(api.drinks[0]);
        await arrAllRecipes.push(api.drinks[0]);
      }));

      setMeal(arrMeals);
      setAllRecipes(arrAllRecipes);

      setDrinks(arrDrinks);
      setAllRecipes(arrAllRecipes);
    },
    [idRecipesMeals, idRecipesDrinks],
  );

  useEffect(() => {
    getMeals();
  }, []);

  if (!mealsList || !drinksList) {
    return <p>Loading...</p>;
  }

  function copyLink(id) {
    copy(`https://localhost:3000/comidas/${id}`);
    setShowMessage(true);

    const ONE_SECOND = 1000;

    setTimeout(() => {
      setShowMessage(false);
    }, ONE_SECOND);
  }

  function redirect(type, id) {
    if (type === mealsList) {
      history.push(`/comidas/${id}`);
    } else {
      history.push(`/bebidas/${id}`);
    }
  }

  function filterButton(type) {
    if (type === 'food') {
      setAllRecipes(allRecipes.filter(({ idMeal }) => Number(idMeal) === Number(idRecipesMeals)));
    }

    if (type === 'drink') {
      setAllRecipes(allRecipes.filter(({ idDrink }) => Number(idDrink) === Number(idRecipesDrinks)));
    }

    if (type === undefined) {
      setAllRecipes([...mealsList, ...drinksList]);
    }
  }
  console.log(allRecipes);

  return (

    <div>

      <Header />
      <h1>Receitas Feitas</h1>
      <button type="button" data-testid="filter-by-all-btn" onClick={ () => filterButton() }>All</button>
      <button type="button" data-testid="filter-by-food-btn" onClick={ () => filterButton('food') }>Food</button>
      <button type="button" data-testid="filter-by-drink-btn" onClick={ () => filterButton('drink') }>Drinks</button>

      {allRecipes
        .map(({
          strMealThumb,
          strCategory,
          strMeal,
          strTags,
          strArea,
          idMeal,
        }, index) => (
          <>
            <img
              aria-hidden
              key={ index }
              src={ strMealThumb }
              style={ { width: '340px' } }
              alt={ strMealThumb }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => redirect(mealsList, idMeal) }
            />
            <h3
              aria-hidden
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => redirect(mealsList, idMeal) }
            >
              {strMeal}
            </h3>
            <p data-testid={ `${index}-horizontal-top-text` }>{strCategory}</p>
            <p data-testid={ `${index}-${strTags}-horizontal-tag` }>{strTags}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{date}</p>
            <p>{strArea}</p>
            <img
              aria-hidden
              src={ shareIcon }
              alt="compartilhar"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => copyLink(idMeal) }
            />
            {showMessage && <p>Link copiado!</p>}

          </>
        ))}

      {allRecipes.map(({ strDrinkThumb, strDrink, strAlcoholic, idDrink }, index) => (
        <>
          <img
            aria-hidden
            key={ index }
            src={ strDrinkThumb }
            style={ { width: '340px' } }
            alt={ strDrinkThumb }
            data-testid={ `${index}-horizontal-image` }
            onClick={ () => redirect(drinksList, idDrink) }
          />
          <h3
            aria-hidden
            data-testid={ `${index}-horizontal-name` }
            onClick={ () => redirect(drinksList, idDrink) }
          >
            {strDrink}
          </h3>
          <p data-testid={ `${index}-horizontal-done-date` }>{date}</p>
          <p>{strAlcoholic}</p>
          <img
            aria-hidden
            src={ shareIcon }
            alt="compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => copyLink(idDrink) }
          />
          {showMessage && <p>Link copiado!</p>}
        </>
      ))}
    </div>
  );
}

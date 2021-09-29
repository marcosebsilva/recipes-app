import React, { useEffect, useCallback, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
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

      await Promise.all(idRecipesMeals.map(async (item) => {
        const api = await FetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`);
        // console.log(api.meals[0]);
        await arrMeals.push(api.meals[0]);
      }));
      await Promise.all(idRecipesDrinks.map(async (item) => {
        const api = await FetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item}`);
        // console.log(api.driks[0]);
        await arrDrinks.push(api.drinks[0]);
      }));

      setMeal(arrMeals);
      // console.log(arrMeals);
      setDrinks(arrDrinks);
      // console.log(arrDrinks);
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

  // const [{ idMeal, strCategory, strArea, strCategory, strMeal,  strMealThumb, strTags }] = meals;
  // const [{ idDrink, strAlcoholic, strDrink,  strDrinksThumb, strCategory}] = drinks;

  // const doneRecipes = [{
  //   id: {[idMeal, idDrink]},
  //   type: { strCategory },
  //   area: { strArea },
  //   category: {[strCategory,strCategory]},
  //   alcoholicOrNot: {strAlcoholic},
  //   name: [strMeal, strDrink],
  //   image: [strDrinksThumb, strMealThumb],
  //   doneDate: {date},
  //   tags: {strTags},
  // }];

  // localStorage.setItem('doneRecipes', JSON.fy(doneRecipes));

  return (

    <div>

      <Header />
      <h1>Receitas Feitas</h1>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {mealsList
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
              alt="card-receita"
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
      {drinksList.map(({ strDrinkThumb, strDrink, strAlcoholic, idDrink }, index) => (
        <>
          <img
            aria-hidden
            key={ index }
            src={ strDrinkThumb }
            style={ { width: '340px' } }
            alt="card-receita"
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

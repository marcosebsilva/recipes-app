import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function ReceitasFeitas() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [recipeList, setRecipe] = useState(doneRecipes);
  const [showMessage, setShowMessage] = useState();
  console.log(doneRecipes);

  const history = useHistory();

  function copyLink(id) {
    copy(`http://localhost:3000/comidas/${id}`);
    setShowMessage(true);

    const ONE_SECOND = 1000;

    setTimeout(() => {
      setShowMessage(false);
    }, ONE_SECOND);
  }

  function redirect(type, id) {
    if (type === 'comida') {
      history.push(`/comidas/${id}`);
    } else {
      history.push(`/bebidas/${id}`);
    }
  }

  function filterButton(type) {
    if (type === 'food') {
      setRecipe(doneRecipes.filter((el) => el.type === 'comida'));
    }

    if (type === 'drink') {
      setRecipe(doneRecipes.filter((el) => el.type === 'bebida'));
    }

    if (type === undefined) {
      setRecipe(doneRecipes);
    }
  }
  return (
    <div>
      <Header title="Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterButton() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterButton('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterButton('drink') }
      >
        Drinks
      </button>

      {recipeList && recipeList
        .map(({
          image,
          category,
          name,
          tags,
          area,
          id,
          doneDate,
          alcoholicOrNot,
          type,
        }, index) => (
          <>
            <img
              aria-hidden
              key={ index }
              src={ image }
              style={ { width: '340px' } }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => redirect(type, id) }
            />
            <h3
              aria-hidden
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => redirect(type, id) }
            >
              {name}
            </h3>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {type === 'comida' ? `${area} - ${category}` : alcoholicOrNot}
            </p>
            <p data-testid={ `${index}-${tags[0]}-horizontal-tag` }>{tags[0]}</p>
            <p data-testid={ `${index}-${tags[1] || ''}-horizontal-tag` }>{tags[1]}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
            <button type="button" onClick={ () => copyLink(id) }>
              <img
                aria-hidden
                src={ shareIcon }
                alt="compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {showMessage && <p>Link copiado!</p>}
          </>
        ))}
    </div>
  );
}

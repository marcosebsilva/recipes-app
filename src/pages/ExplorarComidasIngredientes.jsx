import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FetchAPI from '../components/FetchAPI';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../context/recipesContext';

const ExplorarComidasIngredientes = () => {
  const [ListaIngredientes, setListaIgredientes] = useState();
  const history = useHistory();
  const { setFoodFilter } = useContext(recipesContext);
  useEffect(() => {
    async function arrIngredientes() {
      const DOZE = 12;
      const objeto = await FetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const ingredientes = objeto.meals.filter((element, index) => index < DOZE)
        .map((element) => element.strIngredient);
      setListaIgredientes(ingredientes);
    }
    arrIngredientes();
  }, []);

  if (!ListaIngredientes) {
    return <p>Loading...</p>;
  }

  async function handleClick({ target }) {
    const { name } = target;
    await setFoodFilter(name);
    history.push('/comidas');
  }

  return (
    <>
      <Header title="Explorar Ingredientes" />
      {
        ListaIngredientes.map((ingredientes, index) => (
          <button
            type="button"
            name={ ingredientes }
            className="ingredientes-card"
            key={ ingredientes }
            data-testid={ `${index}-ingredient-card` }
            onClick={ (event) => handleClick(event) }
            aria-hidden
          >
            <img
              alt={ ingredientes }
              name={ ingredientes }
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${ingredientes}-Small.png` }
            />
            <span
              data-testid={ `${index}-card-name` }
            >
              { ingredientes }
            </span>
          </button>
        ))
      }
      <Footer />
    </>
  );
};

export default ExplorarComidasIngredientes;

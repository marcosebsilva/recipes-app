import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FetchAPI from '../components/FetchAPI';

const ExplorarBebidasIngredientes = () => {
  const [ListaIngredientes, setListaIngredientes] = useState();
  useEffect(() => {
    async function arrIngredientes() {
      const DOZE = 12;
      const objeto = await FetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const ingredientes = objeto.drinks
        .filter((element, index) => index < DOZE)
        .map((element) => element.strIngredient1);
      setListaIngredientes(ingredientes);
    }
    arrIngredientes();
  }, []);

  if (!ListaIngredientes) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header title="Explorar Ingredientes" />
      {ListaIngredientes.map((ingredientes, index) => (
        <div
          key={ ingredientes }
          aria-hidden
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            alt={ ingredientes }
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredientes}-Small.png` }
          />
          <span
            data-testid={ `${index}-card-name` }
          >
            {ingredientes}
          </span>
        </div>
      ))}
      <Footer />
    </>
  );
};

export default ExplorarBebidasIngredientes;

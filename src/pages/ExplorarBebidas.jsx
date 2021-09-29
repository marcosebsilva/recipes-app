import React from 'react';
import { useHistory } from 'react-router';
import FetchAPI from '../components/FetchAPI';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarBebidas() {
  const history = useHistory();

  async function fetchRandomFoodId() {
    const drink = await FetchAPI('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const randomMeal = drink.drinks[0];
    const { idDrink } = randomMeal;
    return idDrink;
  }

  async function clickExplore(e) {
    const { name } = e.target;
    if (name === 'surpresa') {
      const randomId = await fetchRandomFoodId();
      history.push(`/bebidas/${randomId}`);
      return;
    }
    history.push(`/explorar/bebidas/${name}`);
  }

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        name="ingredientes"
        onClick={ clickExplore }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        name="surpresa"
        onClick={ clickExplore }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;

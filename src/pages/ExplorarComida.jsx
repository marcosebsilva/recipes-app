import React from 'react';
import { useHistory } from 'react-router';
import FetchAPI from '../components/FetchAPI';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarComidas() {
  const history = useHistory();

  async function fetchRandomFoodId() {
    const meals = await FetchAPI('https://www.themealdb.com/api/json/v1/1/random.php');
    const randomMeal = meals.meals[0];
    const { idMeal } = randomMeal;
    return idMeal;
  }

  async function clickExplore(e) {
    const { name } = e.target;
    if (name === 'surpresa') {
      const randomId = await fetchRandomFoodId();
      history.push(`/comidas/${randomId}`);
      return;
    }
    history.push(`/explorar/comidas/${name}`);
  }

  return (
    <div>
      <Header title="Explorar Comidas" />
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
        data-testid="explore-by-area"
        name="area"
        onClick={ clickExplore }
      >
        Por Local de Origem
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

export default ExplorarComidas;

import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';
import Header from '../components/Header';
import MapCategories from '../components/MapCategories';
import MapContent from '../components/MapContent';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

function Comidas() {
  const {
    foodData,
    foodCategoriesData,
    arrFilteredFood,
    setFoodFilter,
    handleClick,
    divClick,
  } = useContext(recipesContext);

  const food = (!arrFilteredFood) ? foodData : arrFilteredFood;
  if (!foodData || !foodCategoriesData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header title="Comidas" />
      <SearchBar />
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => setFoodFilter(undefined) }
        >
          All
        </button>
        <MapCategories
          item={ foodCategoriesData }
          handleClick={ handleClick }
          page="food"
        />
      </div>
      <div>
        <MapContent
          item={ food }
          divClick={ divClick }
          page="food"
        />
      </div>
      <Footer />
    </div>
  );
}

export default Comidas;

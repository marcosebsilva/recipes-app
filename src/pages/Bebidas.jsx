import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';
import Header from '../components/Header';
import MapCategories from '../components/MapCategories';
import MapContent from '../components/MapContent';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

function Bebidas() {
  const {
    drinkData,
    drinkCategoriesData,
    arrFilteredDrink,
    setDrinkFilter,
    handleClick,
    divClick,
  } = useContext(recipesContext);

  const drink = (!arrFilteredDrink) ? drinkData : arrFilteredDrink;
  if (!drinkData || !drinkCategoriesData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header title="Bebidas" />
      <SearchBar />
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => setDrinkFilter(undefined) }
        >
          All
        </button>
        <MapCategories
          item={ drinkCategoriesData }
          handleClick={ handleClick }
          page="drink"
        />
      </div>
      <div>
        <MapContent
          item={ drink }
          divClick={ divClick }
          page="drink"
        />
      </div>
      <Footer />
    </div>
  );
}

export default Bebidas;

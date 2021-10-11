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
    handleClick,
    divClick,
  } = useContext(recipesContext);

  const drink = (!arrFilteredDrink) ? drinkData : arrFilteredDrink;
  if (!drinkData || !drinkCategoriesData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header searchBar title="Bebidas" />
      <MapCategories
        item={ drinkCategoriesData }
        handleClick={ handleClick }
        page="drink"
      />
      <MapContent
        item={ drink }
        divClick={ divClick }
        page="drink"
      />
      <Footer />
    </>
  );
}

export default Bebidas;

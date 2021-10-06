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
    handleClick,
    divClick,
  } = useContext(recipesContext);

  const food = (!arrFilteredFood) ? foodData : arrFilteredFood;
  if (!foodData || !foodCategoriesData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header searchBar title="Comidas" />
      <SearchBar />
      <MapCategories
        item={ foodCategoriesData }
        handleClick={ handleClick }
        page="food"
      />
      <MapContent
        item={ food }
        divClick={ divClick }
        page="food"
      />
      <Footer />
    </>
  );
}

export default Comidas;

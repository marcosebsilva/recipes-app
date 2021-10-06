import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';
import Header from '../components/Header';
import MapCategories from '../components/MapCategories';
import MapContent from '../components/MapContent';
import Footer from '../components/Footer';

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
    <div className="foods-page">
      <Header searchBar title="Comidas" />
      <MapCategories
        item={ foodCategoriesData }
        handleClick={ handleClick }
        page="food"
      />
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

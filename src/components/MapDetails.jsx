import React from 'react';
import PropTypes from 'prop-types';

function MapDetails({ arr }) {
  const filter = () => {
    const ingredients = Object.entries(arr[0])
      .filter((e) => e[0].includes('strIngredient'))
      .map((e) => e[1])
      .filter((e) => e !== null && e !== '' && e !== ' ');

    const measure = Object.entries(arr[0])
      .filter((e) => e[0].includes('strMeasure'))
      .map((e) => e[1])
      .filter((e) => e !== null && e !== '' && e !== ' ');
    const mixArr = [{
      ingredients,
      measure,
    }];
    return mixArr;
  };
  const forFunc = () => {
    const arrF = [];
    const mixArr = filter();
    for (let i = 0; i < mixArr[0].ingredients.length; i += 1) {
      arrF.push(`${mixArr[0].ingredients[i]} - ${mixArr[0].measure[i]}`);
    }
    return arrF;
  };
  return (
    <ul>
      {forFunc().map((e, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {e}
        </li>
      ))}
    </ul>
  );
}

MapDetails.propTypes = {
  arr: PropTypes.objectOf.isRequired,
};

export default MapDetails;

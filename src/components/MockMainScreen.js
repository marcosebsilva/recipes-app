import React from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';

// data provavelmente vai vir do provider
export default function MockMainScreen({ data }) {
  const location = useLocation();
  const TWELVE = 12;
  const firstTwelve = data.slice(0, TWELVE);

  return (
    <section>
      { firstTwelve.map((item, index) => {
        const foodType = location.pathname === '/bebidas'
          ? 'Drink'
          : 'Meal';
        return (
          <div
            key={ `meal-${index}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              alt={ item[`str${foodType}`] }
              src={ item[`str${foodType}Thumb`] }
            />
            <h2
              data-testid={ `${index}-card-name` }
            >
              { item[`str${foodType}`] }
            </h2>
          </div>);
      })}
    </section>
  );
}

MockMainScreen.propTypes = {
  data: PropTypes.arrayOf(String).isRequired,
};

import React from 'react';
import { useHistory } from 'react-router';
import drinksImg from '../images/drinkIcon.svg';
import exploreImg from '../images/exploreIcon.svg';
import mealImg from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
  const history = useHistory();

  const clickHandle = (e) => {
    const { name } = e.target;
    history.push(`/${name}`);
  };

  return (
    <div data-testid="footer" className="footer">
      <img
        src={ drinksImg }
        alt="drinks"
        data-testid="drinks-bottom-btn"
        onClick={ clickHandle }
        aria-hidden="true"
        name="bebidas"
      />
      <img
        src={ exploreImg }
        alt="explore"
        data-testid="explore-bottom-btn"
        onClick={ clickHandle }
        aria-hidden="true"
        name="explorar"
      />
      <img
        src={ mealImg }
        alt="food"
        data-testid="food-bottom-btn"
        onClick={ clickHandle }
        aria-hidden="true"
        name="comidas"
      />
    </div>
  );
}

export default Footer;

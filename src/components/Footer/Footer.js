import React from 'react';
import './style.css';
import drinksImg from '../../images/drinkIcon.svg';
import exploreImg from '../../images/exploreIcon.svg';
import mealImg from '../../images/mealIcon.svg';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <img
        src={ drinksImg }
        alt="drinks"
        data-testid="drinks-bottom-btn"
      />
      <img
        src={ exploreImg }
        alt="explore"
        data-testid="explore-bottom-btn"
      />
      <img
        src={ mealImg }
        alt="food"
        data-testid="food-bottom-btn"
      />
    </div>
  );
}

export default Footer;

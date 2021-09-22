import React from 'react';
import { ImCompass2, ImGlass } from 'react-icons/im';
import { IoFastFoodOutline } from 'react-icons/io5';

function Footer() {
  return (
    <div data-testid="footer">
      <ImGlass data-testid="drinks-bottom-btn" />
      <ImCompass2 data-testid="explore-bottom-btn" />
      <IoFastFoodOutline data-testid="food-bottom-btn" />
    </div>
  );
}

export default Footer;

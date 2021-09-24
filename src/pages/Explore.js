import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';

function Explore() {
  const history = useHistory();
  function exploreClick(e) {
    const { name } = e.target;
    history.push(`/explorar/${name}`);
  }
  return (
    <div>
      <Header title="Explorar" />
      <button
        type="button"
        name="food"
        data-testid="explore-food"
        onClick={ exploreClick }
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        name="drinks"
        data-testid="explore-drinks"
        onClick={ exploreClick }
      >
        Explorar Bebibas
      </button>
      <Footer />
    </div>
  );
}

export default Explore;

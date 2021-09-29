import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function ExplorarComidasLocal() {
  return (
    <div>
      <div>
        <Header title="Explorar Origem" />
        <SearchBar />
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidasLocal;

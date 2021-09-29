import React, { useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import FoodTypeSelect from '../components/FoodTypeSelect';
import Header from '../components/Header';
import '../style/ReceitasFavoritas.css';

const initialFavorites = () => {
  const recipesJson = localStorage.getItem('favoriteRecipes') || '[]';
  console.log(recipesJson);
  const recipes = JSON.parse(recipesJson);
  return recipes;
};

function ReceitasFavoritas() {
  // const { favorites, setFavorites } = useContext(recipesContext);
  const [favorites, setFavorites] = useState(initialFavorites());
  const [filter, setFilter] = useState('todos');
  const [filtered, setFiltered] = useState(favorites);

  const updateFiltered = (type = filter, recipes = favorites) => {
    console.log(type);
    const newFiltered = recipes.filter(
      (fav) => fav.type === type || type === 'todos',
    );
    setFilter(type);
    setFiltered(newFiltered);
  };

  const deleteFavorite = (id) => {
    const favFiltered = favorites.filter((fav) => fav.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favFiltered));
    console.log(favFiltered);
    setFavorites(favFiltered);
    updateFiltered(filter, favFiltered);
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <FoodTypeSelect setFilter={ setFilter } updateFiltered={ updateFiltered } />
      <FavoriteCard
        filtered={ filtered }
        deleteFavorite={ deleteFavorite }
      />
    </div>
  );
}

export default ReceitasFavoritas;

const CheckFavoriteDetails = (id, setIsFavorite) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (favoriteRecipes) {
    const recipeIsFavorite = favoriteRecipes
      .some((favoriteRecipe) => id === favoriteRecipe.id);

    if (recipeIsFavorite) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
    return;
  }

  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
};

export default CheckFavoriteDetails;

const ButtonRecipeFunc = (id, setTextButton, page) => {
  const local = JSON.parse(localStorage.getItem('inProgressRecipes'));

  let localIds;

  if (!local) {
    setTextButton('Iniciar Receita');
  } else {
    if (page === 'food') {
      localIds = Object.keys(local.meals);
    }

    if (page === 'drink') {
      localIds = Object.keys(local.cocktails);
    }

    if (localIds[0] === id) {
      setTextButton('Continuar Receita');
    } else {
      setTextButton('Iniciar Receita');
    }
  }
};

export default ButtonRecipeFunc;

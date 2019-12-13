import * as R from "ramda";

const initialState = {
  list: []
};

const BeerReducer = function(previousState = initialState, action) {
  const newState = R.clone(previousState);

  switch (action.type) {
    case "ADD_BEER":
      // TODO ENVOI A L'API
      newState.list.push(action.data.username);
      return newState;
    default:
      // il est important de ne pas retourner de clone dans le cas default
      // pour bénéficier de la récupération des données du store (persist)
      return previousState;
  }
};

export default BeerReducer;

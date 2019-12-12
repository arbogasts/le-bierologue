import * as R from "ramda";

const initialState = {
  list: ["The Very First One", "Martin Matin"]
};

const UserReducer = function(previousState = initialState, action) {
  const newState = R.clone(previousState);
  switch (action.type) {
    case "ADD_USER":
      newState.list.push(action.data.username);
      return newState;
    case "REMOVE_USER":
      newState.list = newState.list.filter(
        user => user !== action.data.username
      );
      return newState;
    default:
      // il est important de ne pas retourner de clone dans le cas default
      // pour bénéficier de la récupération des données du store (persist)
      return previousState;
  }
};

export default UserReducer;

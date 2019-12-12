import React from "react";
import { useDispatch } from "react-redux";

const User = props => {
  // on récupère la fonction dispatch qui permettra de dispatcher des actions
  const dispatch = useDispatch();

  // on déclare une fonction qui dispatchera l'action REMOVE_USER
  const removeUser = username => {
    dispatch({ type: "REMOVE_USER", data: { username } });
  };

  return (
    <div className="user">
      <div className="alert alert-primary" role="alert">
        <span className="text">{props.username}</span>
        <button
          type="button"
          className="btn btn-danger float-vertical-align"
          onClick={() => removeUser(props.username)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default User;

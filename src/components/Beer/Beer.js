import React from "react";
import { useDispatch } from "react-redux";

const Beer = props => {
  // on récupère la fonction dispatch qui permettra de dispatcher des actions
  const dispatch = useDispatch();

  return (
    <div className="Beer">
      <div className="alert alert-primary" role="alert">
        <span className="text">{props.beername}</span>
        <button
          type="button"
          className="btn btn-danger float-vertical-align"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default Beer;

import React, { useState } from "react";
import { useDispatch } from "react-redux";

const UserForm = props => {
  const [userInput, setUserInput] = useState("");

  // on récupère la fonction dispatch qui permettra de dispatcher des actions
  const dispatch = useDispatch();

  // on déclare une fonction qui dispatchera l'action ADD_USER
  const addUser = username => {
    dispatch({ type: "ADD_USER", data: { username } });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            onChange={event => setUserInput(event.target.value)}
          />
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addUser(userInput)}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;

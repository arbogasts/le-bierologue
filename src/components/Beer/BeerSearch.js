import React, { useState } from "react";
import { useDispatch } from "react-redux";

const BeerSearch = props => {
  const [userInput, setUserInput] = useState("");

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

export default BeerSearch;

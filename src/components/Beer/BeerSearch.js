import React, { useState } from "react";

const BeerSearch = props => {
  const [beerInput, setBeerInput] = useState("");

  return (
    <div className="container">
      <div className="row">
          <input
            type="text"
            className="form-control"
            onChange={event => setBeerInput(event.target.value)}
          />
          <button
          type="button"
          className="btn btn-primary"
          onClick={() => console.log(beerInput)}
          >
          Rechercher
        </button>
        </div>
    </div>
  );
};

export default BeerSearch;

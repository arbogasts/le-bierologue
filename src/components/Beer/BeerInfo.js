import React, { useState, useEffect } from "react";
import axios from "axios";

const BeerInfo = props => {
  // on récupère la fonction dispatch qui permettra de dispatcher des actions
  const [idBeerUrl, setIdBeerUrl] = useState("");
  const [beer, setBeer] = useState([]);
  const key = process.env.REACT_APP_BREWERY_SECRET;

  useEffect(() => {
    setIdBeerUrl(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    axios.get("/beer/" + idBeerUrl + "?key=" + key)
    .then(response => {
        console.log(response.data.data);
        setBeer(response.data.data);
      })
    .catch(function (error) {
      console.log(error.headers);
    });
  }, [idBeerUrl]);

  return (
      <div>
          <p>Détail de la bière : {JSON.stringify(beer) || "Chargement en cours..."}</p>
      </div>
  );
};

export default BeerInfo;

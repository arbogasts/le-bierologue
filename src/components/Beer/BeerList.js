import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";

import Beer from "./Beer";

const BeerList = props => {
  // useSelector permet d'accéder à une valeur enregistrée dans le store redux
  // const [beerList, setBeerList] = useSelector(reduxState => reduxState.beerReducer.list);
  const loading = useState(false);
  const [beerList, setBeerList] = useState([]);
  const key = process.env.REACT_APP_BREWERY_SECRET;

  useEffect(() => {
    axios.get("/beers?key=" + key)
    .then(response => {
        console.log(response.data);
        setBeerList(response.data.data);
      })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.headers);
      } 
      else if (error.request) {
        console.log(error.request);
      } 
      else {
        console.log(error.message);
      }
    console.log(error.config);
    });
  }, []);

  return (
    <div>
      <span className="text">Nombre de bières trouvés : {beerList.length || <Loading/>}</span>
      <div className="row row-beers">
        {beerList.map(beer => {
          return <Beer key={beer.id} id={beer.id} icon={beer.labels || "./img/default.png"} nameDisplay={beer.nameDisplay}/>;
        })}
      </div>
    </div>
  );
};

export default BeerList;

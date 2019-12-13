import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Beer from "./Beer";

const BeerList = props => {
  // useSelector permet d'accéder à une valeur enregistrée dans le store redux
  // const [beerList, setBeerList] = useSelector(reduxState => reduxState.beerReducer.list);
  const [beerList, setBeerList] = useState([])

  useEffect(() => {
    // TODO, appel à l'API https://restcountries.eu/rest/v2/name/[COUNTRY_NAME]
    // extraction et sauvergarde des données à afficher (voir render())
    axios.get("https://sandbox-api.brewerydb.com/v2/beers?key=e0ac569251cd1b13706b3cfc291ae174",{
      headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
    .then(response => {
        console.log(response);
        setBeerList(response.data);
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
      <span className="text">Nombre de bières trouvés : {beerList.length}</span>
      {beerList.map(beer => {
        console.log(beer);
        return <p>test</p>;
      })}
    </div>
  );
};

export default BeerList;

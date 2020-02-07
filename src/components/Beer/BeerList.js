import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";

import Beer from "./Beer";
import Button from "react-bootstrap/Button";

const BeerList = props => {
  // useSelector permet d'accéder à une valeur enregistrée dans le store redux
  // const [beerList, setBeerList] = useSelector(reduxState => reduxState.beerReducer.list);
  const [beerList, setBeerList] = useState([]);
  const [page, setPage] = useState(1);
  const key = process.env.REACT_APP_BREWERY_SECRET;

  function fetchBeer(){
    axios.get("/beers?key=" + key + '&p=' + page)
    .then(response => {
        console.log(response.data.data);
        setBeerList(beerList.concat(response.data.data));
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
  }

  const handleMore = event => {
    event.preventDefault();
    // Traitement avec chargement supplémentaire
    let newPage = page + 1;
    setPage(newPage);
  }

  useEffect(() => {
    fetchBeer();
  }, [page]);

  return (
    <div>
      <span className="text">Nombre de bières trouvés : {beerList.length || <Loading/>}</span>
      <div className="row row-beers">
        {beerList.map(beer => {
          return <Beer key={beer.id} id={beer.id} icon={beer.labels || "./img/default.png"} nameDisplay={beer.nameDisplay}/>;
        })}
        <div className="text-center">
          <Button variant="warning" key="load-more" id="load-more" onClick={handleMore}>
            Charger plus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BeerList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Beer = props => {
  // on récupère la fonction dispatch qui permettra de dispatcher des actions
  const [idBeer, setIdBeer] = useState('');
  const key = process.env.REACT_APP_BREWERY_SECRET;

  const handleDelete = event => {
    event.preventDefault();
    // Event de confirmation
    let btn = event.target;

    // Traitement de la suppression
    axios.delete(`/beer/${idBeer}?key=${key}`,
      {
          headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          },
      })
    .then(function (response) {
        // handle success
        console.log(response);
        if(response.statusText === 'OK'){
          btn.classList.remove('btn-danger');
          btn.classList.add('btn-success');
          btn.innerText = "Suppression réussie.";
          btn.setAttribute("disabled", true);
        }
        else {
            // setError(true)
        }
    })
    .catch(function (error) {
        // handle error
        console.error(error);
        // setError(true);
    });
  }

  // Chargement de l'ID dans notre objet pour le delete
  useEffect(() => {
    setIdBeer(props.id)
  }, [props.id])

  return (
    <Link to={`/beer/${idBeer}`} className="card-link">
      <Card style={{ width: '18rem' }} className="card-beer">
        <Button onClick={handleDelete} id="btn-delete" variant="danger">Supprimer</Button>
        <Card.Img className="img-beer" variant="top" src={props.icon.medium || props.icon} />
        <Card.Body>
          <Card.Title className="text-warning">{props.nameDisplay}</Card.Title>
        </Card.Body>
        <Button variant="dark">En savoir plus</Button>
      </Card>
    </Link>
  );
};

export default Beer;

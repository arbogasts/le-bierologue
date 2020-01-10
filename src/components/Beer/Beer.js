import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Beer = props => {
  // on récupère la fonction dispatch qui permettra de dispatcher des actions

  return (
    <Link to={`/beer/${props.id}`} className="card-link">
      <Card style={{ width: '18rem' }} className="card-beer">
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

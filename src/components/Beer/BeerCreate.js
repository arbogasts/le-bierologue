import React, { useState, useEffect } from "react";
import axios from "axios";
import querystring from "querystring"
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container'
import { Form, Button, Col } from "react-bootstrap";
import Loading from "../Loading";
import Success from "../Utilities/Success";
import Error from "../Utilities/Error";

const BeerCreate = props => {
  // on récupère la fonction dispatch qui permettra de dispatcher des actions
  const [style, setStyle] = useState([]);
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(false);
  const key = process.env.REACT_APP_BREWERY_SECRET;

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
        // Get data from form elements in the body
        const requestBody = {
            name:       form.elements.name.value,
            styleId:    form.elements.styleId.value,
            description:form.elements.description.value,
            abv:        form.elements.abv.value,
            ibu:        form.elements.ibu.value,
        }
    
        // Requête POST
        axios.post(`/beer?key=${key}`,
            querystring.stringify(requestBody), 
            {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
        .then(function (response) {
            // handle success
            console.log(response);
            if(response.status === 201){
                setSuccess(requestBody.name);
            }
            else {
                setError(true)
            }
        })
        .catch(function (error) {
            // handle error
            console.error(error);
            setError(true);
        });
    
        // Pas de validation auto, gestion manuelle
        // Stop propagation of asynchronous event
        event.preventDefault();
        event.stopPropagation();
    }
    setValidated(true);
  };

  useEffect(() => {
		const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        // Méthode permettant d'obtenir tous les styles séléctionnables des bières
		async function fetchStyle() {
			try {
				let res = await axios.get(`/styles?key=${key}`,
					{ cancelToken:source.token });
				if (res.data){
					setStyle(res.data.data);
				}
				else
          			console.log('/404');
			} 
			catch (err) {
				if (axios.isCancel(err))
					source.cancel();
				console.log('/404');
			}
        }

        fetchStyle();

		return () => {
			source.cancel();
		}
	}, [])

  return (
	<div className="beer-details">
		<Container>
			<Card>
				<Card.Body>
					<Container>
                        <Card.Title><strong>Nouvelle bière :</strong></Card.Title>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Nom de la bière *</Form.Label>
                                <Form.Control required type="text" placeholder="Nom de la bière (Meteor Pils, Meteor Ink, Meteor Tenebris...)" />
                            </Form.Group>

                            <Form.Group controlId="styleId">
                                <Form.Label>Style *</Form.Label>
                                {style ? (
                                    <Form.Control required as="select">
                                        <option value="">Veuillez séléctionnez un style</option>
                                        {style.map(item => {
                                            return <option key={item.id} value={item.id}>{item.shortName || item.name}</option>
                                        })}
                                    </Form.Control>
                                    ) : <Loading/>
                                }
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="3" />
                            </Form.Group>

                            <Form.Row>
                                <Col sm="6">
                                    <Form.Group controlId="abv">
                                        <Form.Label>Pourcentage (ABV)</Form.Label>
                                        <Form.Control type="number" step="0.1" />
                                    </Form.Group>
                                </Col>
                                <Col sm="6">
                                    <Form.Group  controlId="ibu">
                                        <Form.Label>Amertume (IBU)</Form.Label>
                                        <Form.Control type="number" step="0.1" />
                                    </Form.Group>
                                </Col>
                            </Form.Row>

                            <Button variant="warning" type="submit">
                                Créer la bière
                            </Button>
                        </Form>
                        {(success) ? <Success key={success} name={success} /> : ""}
                        {(error) ? <Error key={error} name={error} /> : ""}
					</Container>
				</Card.Body>
			</Card>
		</Container>
	</div>
  );
};

export default BeerCreate;

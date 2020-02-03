import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import { Row, Col, Badge, OverlayTrigger, Tooltip, Tabs, Tab } from "react-bootstrap";

const BeerRandom = props => {
  // on récupère la fonction dispatch qui permettra de dispatcher des actions
  const [beer, setBeer] = useState([]);
  const key = process.env.REACT_APP_BREWERY_SECRET;

  useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();
		async function fetchBeer() {
			try {
				let res = await axios.get(`/beer/random?key=${key}`,
					{ cancelToken:source.token });
				if (res.data){
                    console.log(res.data.data)
					setBeer(res.data.data);
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

        fetchBeer();

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
						<Row>
							<Col sm={4} xs={12}>
								{
									beer.labels ? 
									<img alt="" src={beer.labels.medium} className="d-inline-block align-top"/>
									: <img alt="Icône par défaut des bières" src="../img/default.png" className="d-inline-block align-top"/>
								}
							</Col>
							<Col sm={8} xs={12} className="mt-4">
								<Card.Title>{beer.nameDisplay || <Loading/>}</Card.Title>
								<p title="Style de la bière">{
									beer.style ?
									beer.style.category.name 
									: null
									}
								</p>
								<ListGroup horizontal className='justify-content-center'>
									<ListGroup.Item>{beer.abv}°</ListGroup.Item>
									<ListGroup.Item>{beer.ibu} IBU 
										<OverlayTrigger overlay={
											<Tooltip id="tooltip">
												La valeur en IBU (International Bitterness Unit) va donner une idée de l'amertume de la bière. Plus le nombre est élevé, plus la bière sera amère.
											</Tooltip>
										}>
											<Badge variant="info">?</Badge>
										</OverlayTrigger> 
									</ListGroup.Item>
								</ListGroup>
							</Col>
							<Col sm={12} md={12}>
								<Card.Text>
									<span>Description de la bière : </span><br/>
									{beer.description}
								</Card.Text>
							</Col>
						</Row>
					</Container>
				</Card.Body>
			</Card>
		</Container>
		<Container>
			<Card>
				<Card.Body>
					<Tabs defaultActiveKey="glasses" id="tab-details-beer">
						<Tab eventKey="glasses" title="Dans quelle verre ?">
							{
								beer.glass ?
								(<p>
									<br/>
									Nos professionnels vous conseille d'associer votre bière avec un verre "{beer.glass.name}" pour une association parfaite.
									<img alt="Image du verre de bière associé" src={`/img/glasses/${beer.glass.name}.png`}/>
								</p>)
								: (<p>Aucunes informations disponibles</p>)
							}
						</Tab>
						<Tab eventKey="foods" title="Que manger avec ?">
							<p>
								{beer.foodPairings || "Aucunes informations disponibles"}
							</p>
						</Tab>
						<Tab eventKey="style" title="Style de la bière ?">
							<p>
								{beer.style ? (
									<div>
										<p><strong>Nom :</strong> {beer.style.name}</p>
										<p><strong>Surnom :</strong> {beer.style.shortName}</p>
										<p><strong>Description :</strong> {beer.style.description}</p>
									</div>
								) : "Aucunes informations disponibles"}
							</p>
						</Tab>
					</Tabs>
				</Card.Body>
			</Card>
			
		</Container>
	</div>
  );
};

export default BeerRandom;

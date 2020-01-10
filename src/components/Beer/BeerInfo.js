import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import { Row, Col, Badge, OverlayTrigger, Tooltip, Tabs, Tab } from "react-bootstrap";

const BeerInfo = props => {
  // on récupère la fonction dispatch qui permettra de dispatcher des actions
  const [idBeerUrl, setIdBeerUrl] = useState("");
  const [beer, setBeer] = useState([]);
  const key = process.env.REACT_APP_BREWERY_SECRET;

  useEffect(() => {
    setIdBeerUrl(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();
		async function fetchBeer() {
			try {
				let res = await axios.get(`/beer/${idBeerUrl}?key=${key}`,
					{ cancelToken:source.token });
				if (res.data){
					setBeer(res.data.data);
					console.log(beer);
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

		if (idBeerUrl)
			fetchBeer();

		return () => {
			source.cancel();
		}
	}, [idBeerUrl])

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
									<p>Description de la bière : </p>
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
								<img alt="Image du verre de bière associé" src={`/img/glasses/${beer.glass.name}.jpg`}/>
								: (<p>Aucunes informations disponibles</p>)
							}
						</Tab>
						<Tab eventKey="foods" title="Que manger avec ?">
							<p>
								{beer.foodPairings || "Aucunes informations disponibles"}
							</p>
						</Tab>
					</Tabs>
				</Card.Body>
			</Card>
			
		</Container>
	</div>
  );
};

export default BeerInfo;

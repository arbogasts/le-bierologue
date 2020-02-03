import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import { Row, Col, Badge, OverlayTrigger, Tooltip, Tabs, Tab } from "react-bootstrap";

const BeerCreate = props => {
  // on récupère la fonction dispatch qui permettra de dispatcher des actions
  const [style, setStyle] = useState([]);
  const key = process.env.REACT_APP_BREWERY_SECRET;

  useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();
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
						<Row>
							
						</Row>
					</Container>
				</Card.Body>
			</Card>
		</Container>
	</div>
  );
};

export default BeerCreate;

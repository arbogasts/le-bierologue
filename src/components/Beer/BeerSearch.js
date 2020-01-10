import React, { useState } from "react";
import Container from 'react-bootstrap/Container'
import { Col } from "react-bootstrap";
import axios from "axios";
import Beer from "./Beer";

const BeerSearch = props => {
  const [beerInput, setBeerInput] = useState("");
  const [beerSearch, setBeerSearch] = useState([]);
  const key = process.env.REACT_APP_BREWERY_SECRET;

  const reset = () => {
    setBeerInput("");
    setBeerSearch([]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // reset();
    searchBeers();
  }

  const searchBeers = (event) => {
    const CancelToken = axios.CancelToken;
		const source = CancelToken.source();
		async function fetchBeer() {
			try {
				let res = await axios.get(`/beers/?key=${key}&name=*${beerInput}*`,
					{ cancelToken:source.token });
				if (res.data){
					setBeerSearch(res.data.data);
					console.log(beerSearch);
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

		if (beerInput)
			fetchBeer();
		return () => {
			source.cancel();
		}
  }

  return (
    <div className="container">
      <div className="row">
        <Container>
          <Col>
          <form id="search-beer" onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                className="form-control"
                value={beerInput}
                onChange={event => setBeerInput(event.target.value)} />
            </label>
            <input
              type="submit"
              className="btn btn-warning"
              value="Rechercher"
              />
          </form>
          </Col>
          <Col>
            <div id="beer-list" className="row">
              {beerSearch ? 
                (beerSearch.map(beer => {
                return <Beer key={beer.id} id={beer.id} icon={beer.labels || "./img/default.png"} nameDisplay={beer.nameDisplay}/>;
                })) : 
                (
                  <Col>
                    <p>Aucun résultat trouvé</p>
                  </Col>
                )}
            </div>
          </Col>
        </Container>
      </div>
    </div>
  );
};

export default BeerSearch;

import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import { Col, Button } from "react-bootstrap";
import axios from "axios";
import Beer from "./Beer";

const BeerSearch = props => {
  const [beerInput, setBeerInput] = useState("");
  const [beerSearch, setBeerSearch] = useState([]);
  const key = process.env.REACT_APP_BREWERY_SECRET;

  const reset = () => {
    setBeerInput("");
    setBeerSearch([]);
    window.localStorage.clear();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setBeerSearch([]);
    if(beerInput.length >= 2){
      searchBeers();
    }
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
          window.localStorage.setItem('beerInput',beerInput);
          window.localStorage.setItem('beerSearch',JSON.stringify(res.data.data));
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

  useEffect(() => {
    let beerInput = window.localStorage.getItem('beerInput');
    let beerSearch = window.localStorage.getItem('beerSearch');
    if(beerInput && beerSearch && beerSearch !== undefined){
      setBeerInput(beerInput)
      setBeerSearch(JSON.parse(beerSearch));
    }
  }, [])

  return (
    <div className="container">
      <div className="row">
        <Container>
          <Col>
            <h1>Rechercher une bière</h1>
          </Col>
          <Col>
          <form id="search-beer" onSubmit={handleSubmit}>
            <label htmlFor="beer_name">
              <input
                type="text"
                className="form-control"
                placeholder="Nom de bière (Bud, Guinness...)"
                title="2 caractères minimum"
                id="beer_name"
                name="beer_name"
                value={beerInput}
                onChange={event => setBeerInput(event.target.value)} />
            </label>
            <input
              type="submit"
              className="btn btn-warning"
              value="Rechercher"
              />
            <Button variant="dark" key="Réinitialiser" onClick={reset}>Réinitialiser</Button>
          </form>
          </Col>
        </Container>
        <Container>
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

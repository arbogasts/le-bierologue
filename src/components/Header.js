import React from "react";
import { Switch, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import Home from "./Home";
import Beers from "./Beers";
import BeerInfo from "./Beer/BeerInfo";
import BeerRandom from "./Beer/BeerRandom";
import BeerCreate from "./Beer/BeerCreate";


const Header = () => {
  return (
    <div className="Header">
        <div className="content">
            <Navbar bg="dark" variant="dark" >
                <Navbar.Brand as={Link} to="/">
                    <img alt="" src="./img/beer_logo.png" width="25" height="32" className="d-inline-block align-top"/>{'Le Biérologue'}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                        <Nav.Link as={Link} to="/beers">Bières</Nav.Link>
                        <Nav.Link as={Link} to="/random">Bière aléatoire</Nav.Link>
                        <Nav.Link as={Link} to="/create">Créer une bière</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
        <div className="switch">
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/beers' component={Beers} />
                <Route exact path="/beer/:id" component={BeerInfo} />
                <Route exact path='/create' component={BeerCreate} />
                <Route exact path='/random' component={BeerRandom} />
                <Route render={function () {
                return <div className="text-center">
                        <img width="700" alt="" src="./img/404.png"/>
                        <p>Error 404 : Not found</p>
                    </div>
                }} />
            </Switch>
        </div>
    </div>
  );
}

export default Header;

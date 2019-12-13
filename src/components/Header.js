import React from "react";
import { Switch, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Home from "./Home";
import Users from "./Users";
import Beers from "./Beers";
import BeerInfo from "./Beer/BeerInfo";


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
                        <Nav.Link as={Link} to="/users">Users</Nav.Link>
                        <Nav.Link as={Link} to="/beers">Bières</Nav.Link>
                        <Nav.Link as={Link} to="/favorites">Mes bières favorites</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
        <div className="switch">
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/users' component={Users} />
                <Route exact path='/beers' component={Beers} />
                <Route exact path="/beer/:id" component={BeerInfo} />
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

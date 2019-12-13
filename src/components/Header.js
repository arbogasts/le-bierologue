import React from "react";
import { Switch, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav"
import Home from "./Home";
import Users from "./Users";


const Header = () => {
  return (
    <div className="Header">
        <div className="content">
            <Navbar bg="dark" variant="dark" >
                <Navbar.Brand as={Link} to="/">
                    <img alt="" src="./img/beer.png" width="58" height="34" className="d-inline-block align-top"/>{'Le Biérologue'}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                        <Nav.Link as={Link} to="/users">Users</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
        <div className="switch">
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/users' component={Users} />
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

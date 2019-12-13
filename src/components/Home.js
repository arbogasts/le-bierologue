import React from "react";
import BeerSearch from "./Beer/BeerSearch";

const Home = () => {
  return (
    <div className="Home">
      <img className="d-inline-block align-top" width="500" src="./img/wallpaper.png" alt=""/>
      <BeerSearch/>
    </div>
  );
}

export default Home;

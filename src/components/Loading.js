import React from "react";
import Loader from 'react-loader-spinner';

const Loading = props => {
  return (
    <div
        style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
    >
        <Loader type="TailSpin" color="#e5b53a"/>
  </div>);
};

export default Loading;

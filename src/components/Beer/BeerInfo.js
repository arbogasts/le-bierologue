import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";

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
				if (res.data)
					setBeer(res.data.data);
				else
          console.log('/404');
			} catch (err) {
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
      <div>
          <p>Détail de la bière : {JSON.stringify(beer) || <Loading/>}</p>
      </div>
  );
};

export default BeerInfo;

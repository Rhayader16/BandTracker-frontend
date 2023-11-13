import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import myApi from "../../service/axios";

function OneArtistPage() {
  const [artist, setArtist] = useState(null);
  let { artistId } = useParams();

  const getArtist = () => {
    myApi
      .get(`/api/artists/${artistId}`)
      .then((response) => setArtist(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getArtist();
  }, []);

  if (!artist) return <p>Loading</p>;

  return (
    <>
      <div className="container">
        <h1 id="artist-name">{artist.name}</h1>
        <img src={artist.photo} alt={artist.name} />
      </div>
    </>
  );
}

export default OneArtistPage;

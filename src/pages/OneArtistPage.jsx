import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import myApi from "../../service/axios";

function OneArtistPage() {
  const [artist, setArtist] = useState(null);
  const [venues, setVenues] = useState(null);
  let { artistId } = useParams();

  const getArtist = () => {
    myApi
      .get(`/api/artists/${artistId}`)
      .then((response) => {
        setArtist(response.data.oneArtist);
        setVenues(response.data.allVenuesOfArtist);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getArtist();
  }, []);

  if (!artist) return <p>Loading</p>;

  return (
    <>
      <div className="container">
        <h1 className="artist-name">{artist.name}</h1>
        <img src={artist.photo} alt={artist.name} />
        <p className="genre">{artist.genre}</p>
        <p className="concert-dates">{artist.concertDate}</p>
        <ul className="album">
          {artist.album.map((album, index) => (
            <div key={index} className="album-card">
              <li>{album.name}</li>
              <li>{album.year}</li>
              <li>{album.picture}</li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default OneArtistPage;

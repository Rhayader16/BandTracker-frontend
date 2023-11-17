import React from "react";
import { useState, useEffect } from "react";
import myApi from "../service/axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getAllArtists = () => {
    myApi
      .get("api/artists")
      .then((response) => setArtists(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllArtists();
  }, []);

  return (
    <div className="artist-grid">
      <div>
        <h1 className="main-title-1">Welcome to Band Tracker!</h1>
      </div>
      <div className="grid-container">
        <div className="artists-container">
          {artists.map((artist, index) => (
            <div key={index} className="artist-card">
              <Link to={`/artist/${artist._id}`} className="artist-link">
                <img src={artist.photo} alt={artist.name} />
                <p>{artist.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

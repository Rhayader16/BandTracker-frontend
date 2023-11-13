import React from "react";
import { useState, useEffect } from "react";
import myApi from "../../service/axios";
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
      {artists.map((artist, index) => (
        <div key={index} className="artist-card">
          <Link to={`/artist/${artist._id}`}>
            <img src={artist.photo} alt={artist.name} />
            <p>{artist.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default HomePage;

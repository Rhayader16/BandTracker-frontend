import React, { useEffect, useState } from "react";
import myApi from "../../service/axios";
import { Link } from "react-router-dom";

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await myApi.get("/api/favourites");
      setFavourites(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <h1>My Favourite Artists</h1>
      <ul>
        {favourites.map((favourite) => (
          <li key={favourite._id} className="artist-section">
            <Link to={`/artist/${favourite.artist._id}`}>
              <p>Artist: {favourite.artist.name}</p>
              <img src={favourite.artist.photo} alt={favourite.artist.name} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritesPage;

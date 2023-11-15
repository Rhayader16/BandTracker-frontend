import React, { useEffect, useState } from "react";
import myApi from "../../service/axios";

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
          <li key={favourite._id}>
            <p>Artist: {favourite.artist.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritesPage;

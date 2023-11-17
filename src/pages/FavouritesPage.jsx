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
    <div className="container">
      <h1 className="title">My Favourite Artists</h1>
      <div>
        {favourites.map((favourite) => (
          <div key={favourite._id} className="artist-section">
            <Link
              className="artist-link-fav"
              to={`/artist/${favourite.artist._id}`}
            >
              <div className="artist-info">
                <div className="artist-image-container">
                  <img
                    className="artist-photo"
                    src={favourite.artist.photo}
                    alt={favourite.artist.name}
                  />
                </div>
                <div className="aname">
                  <p>{favourite.artist.name}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;

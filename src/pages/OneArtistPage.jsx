import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myApi from "../../service/axios";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function OneArtistPage() {
  const [artist, setArtist] = useState(null);
  const [venues, setVenues] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [name, setName] = useState("");
  const [year, setYear] = useState();
  const [picture, setPicture] = useState("");
  // const [editAlbum, setEditAlbum] = useState(null);
  const [isfavourite, setIsFavourite] = useState(false);
  let { artistId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const getArtist = () => {
    myApi
      .get(`/api/artists/${artistId}`)
      .then((response) => {
        console.log(response);
        setArtist(response.data.oneArtist);
        setAlbums(response.data.allAlbums);
      })
      .catch((error) => console.log(error));
  };

  const getVenues = () => {
    myApi
      .get(`/api/concerts/artist/${artistId}`)
      .then((response) => {
        console.log("venues");
        console.log(response);
        setVenues(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleAddAlbum = (e) => {
    e.preventDefault();
    myApi
      .post(`/api/albums/${artistId}`, { name, year, picture })

      .then((response) => {
        console.log(response);
        setName("");
        setYear("");
        setPicture("");
        getArtist();
      })
      .catch((error) => console.log(error));
  };

  const handleFavourite = (e) => {
    e.preventDefault();
    myApi
      .post(`/api/favourites`, { artistId })
      .then((response) => {
        setIsFavourite(true);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    myApi
      .delete(`/api/albums/${id}`)
      .then(() => {
        getArtist();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getArtist();
    getVenues();
  }, []);

  // console.log("venues");
  // console.log(venues);

  if (!artist) return <p>Loading</p>;

  return (
    <>
      <div className="container">
        <h1 className="artist-name">{artist.name}</h1>
        <img src={artist.photo} alt={artist.name} />
        <p className="genre">{artist.genre}</p>
        <button onClick={handleFavourite}>Favourite</button>
        {user && user.role === "admin" && (
          <li>
            <form onSubmit={handleAddAlbum}>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="">Year</label>
              <input
                type="text"
                value={year}
                id="year"
                onChange={(e) => setYear(e.target.value)}
              />
              <label htmlFor="picture">Picture</label>
              <input
                type="url"
                id="picture"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
              />
              <button>Create Album</button>
            </form>
          </li>
        )}
        <ul className="album">
          {albums.map((album, index) => (
            <div key={album._id} className="album-card">
              <li>{album.name}</li>
              <li>{album.year}</li>
              <li>
                <img src={`${album.picture}`} />
              </li>
              {user && user.role === "admin" && (
                <li>
                  <button onClick={() => handleDelete(album._id)}>
                    Delete
                  </button>
                  <Link to={`/album/${album._id}/edit`}>Edit</Link>
                </li>
              )}
            </div>
          ))}
        </ul>

        {/* display: flex,
        flex-direction: column
        align items: center
        per concert-list */}
        <div className="concerts-list">
          {venues ? (
            venues.map((concert) => (
              //display flex, justify content: center per concert-card
              <div key={concert._id} className="concert-card">
                <Link to={`/oneVenuePage/${concert._id}`}>
                  <div>{concert.city}</div>
                </Link>
                <div>{concert.date}</div>
              </div>
            ))
          ) : (
            <p>No concert yey!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default OneArtistPage;

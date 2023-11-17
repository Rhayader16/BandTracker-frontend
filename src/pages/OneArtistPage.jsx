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
  const [myFav, setMyFav] = useState(null);
  const [isfavourite, setIsFavourite] = useState(false);
  const [userId, setUserId] = useState(null);
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

  const getUserId = () => {
    myApi
      .get(`/auth/getUserId/`)
      .then((response) => {
        setUserId(response.data.userId);
      })
      .catch((error) => console.log(error));
  };

  //come posso fare per implementare il comportamento on/off?

  const handleFavourite = (e) => {
    e.preventDefault();
    myApi
      .post(`/api/favourites`, { user: userId, artist: artistId })
      .then((response) => {
        setIsFavourite(true);
        setMyFav(response.data._id);
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
    getUserId();
  }, []);

  // console.log("venues");
  // console.log(venues);

  if (!artist) return <p>Loading</p>;

  return (
    <>
      <div className="container">
        <h1 className="artist-name">{artist.name}</h1>
        <img className="artist-image" src={artist.photo} alt={artist.name} />
        <div className="favourite-flex">
          <div>
            <p className="genre">
              <span>Genre:</span> {artist.genre}
            </p>
          </div>
          <div>
            <button class="btn" onClick={handleFavourite}>
              Favourite
            </button>
          </div>
        </div>
        {user && user.role === "admin" && (
          <form className="form-album" onSubmit={handleAddAlbum}>
            <div className="create-album-container">
              <div className="inner-container">
                <div className="form-line-one">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      value={name}
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Year</label>
                    <input
                      type="text"
                      value={year}
                      id="year"
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="picture">Picture</label>
                    <input
                      type="url"
                      id="picture"
                      value={picture}
                      onChange={(e) => setPicture(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-line-two">
                  <div>
                    <button className="btn">Create Album</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        <div className="album-info-container">
          {albums.map((album, index) => (
            <div key={album._id} className="album-card">
              <div className="album-infos">
                <div className="album-name">{album.name}</div>
                <div className="album-year">{album.year}</div>
              </div>
              <div>
                <img className="album-picture" src={`${album.picture}`} />
              </div>
              {user && user.role === "admin" && (
                <div className="edit-buttons">
                  <button
                    className="btn margin-zero scale"
                    onClick={() => handleDelete(album._id)}
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-red margin-zero scale"
                    to={`/album/${album._id}/edit`}
                  >
                    Edit
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* display: flex,
        flex-direction: column
        align items: center
        per concert-list */}
        <div className="divider"></div>
        <h2 className="subtitle">Next dates</h2>
        <div className="concerts-list">
          {venues ? (
            venues.map((concert) => {
              // Converti la data nel formato desiderato (giorno-mese-anno)
              const formattedDate = new Date(concert.date).toLocaleDateString(
                "it-IT",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              );

              return (
                //display flex, justify content: center per concert-card
                <div key={concert._id} className="concert-card">
                  <div className="concert-date">{formattedDate}</div>
                  <Link
                    className="concert-city btn"
                    to={`/oneVenuePage/${concert._id}`}
                  >
                    {concert.city}
                  </Link>
                </div>
              );
            })
          ) : (
            <p>No concert yet!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default OneArtistPage;

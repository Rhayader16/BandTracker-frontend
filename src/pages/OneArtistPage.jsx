import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import myApi from "../../service/axios";
import { useAuth } from "../../context/AuthContext";

function OneArtistPage() {
  const [artist, setArtist] = useState(null);
  const [venues, setVenues] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [name, setName] = useState("");
  const [year, setYear] = useState();
  const [picture, setPicture] = useState("");
  let { artistId } = useParams();
  const { user } = useAuth();

  const getArtist = () => {
    myApi
      .get(`/api/artists/${artistId}`)
      .then((response) => {
        console.log(response);
        setArtist(response.data.oneArtist);
        setVenues(response.data.allVenuesOfArtist);
        setAlbums(response.data.allAlbums);
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

  const handleDelete = (id) => {
    myApi
      .delete(`/api/albums/${id}`)
      .then(() => {
        getArtist();
        // Navigate("/");
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
        {user && user.role === "admin" && (
          <li>
            {/* <button onClick={handleForm}>Add an album</button> */}
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
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default OneArtistPage;

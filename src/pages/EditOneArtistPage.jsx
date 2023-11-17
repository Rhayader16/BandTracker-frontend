import React, { useState, useEffect } from "react";
import myApi from "../../service/axios";
import { useParams, useNavigate } from "react-router-dom";

function EditOneArtistPage() {
  const [artist, setArtist] = useState(null);
  const [newArtistData, setNewArtistData] = useState({});
  const { artistId } = useParams();
  const navigate = useNavigate();

  const getArtist = () => {
    myApi
      .get(`/api/artists/${artistId}`)
      .then((response) => setArtist(response.data))
      .catch((error) => console.log(error));
  };

  const handleEditArtist = () => {
    myApi
      .put(`/api/artists/${artistId}`, newArtistData)
      .then(() => {
        navigate("/"); // Redirects to homepage after editing using useNavigate
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteArtist = () => {
    myApi
      .delete(`/api/artists/${artistId}`)
      .then(() => {
        navigate("/"); // Redirects to homepage after deleting using useNavigate
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getArtist();
  }, []);
  console.log("test");
  console.log(artist);
  if (!artist) return <p>Loading</p>;

  return (
    <div className="container">
      <h1>Edit Artist</h1>
      <input
        type="text"
        placeholder="New Artist Name"
        value={artist.oneArtist.name || ""}
        onChange={(e) =>
          setNewArtistData({ ...newArtistData, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Genre"
        value={artist.oneArtist.genre || ""}
        onChange={(e) =>
          setNewArtistData({ ...newArtistData, genre: e.target.value })
        }
      />
      <input
        type="date"
        placeholder="New Concert Date"
        value={artist.oneArtist.concertDate || ""}
        onChange={(e) =>
          setNewArtistData({ ...newArtistData, concertDate: e.target.value })
        }
      />

      {artist.oneArtist.album.map((album, index) => (
        <div key={album._id}>
          <input
            type="text"
            placeholder={`Album ${index + 1} Name`}
            value={
              artist.oneArtist.album && artist.oneArtist.album[index]
                ? artist.oneArtist.album[index].name || ""
                : ""
            }
            onChange={(e) =>
              setNewArtistData({
                ...newArtistData,
                album: [
                  ...(newArtistData.album || []),
                  {
                    ...newArtistData.album[index],
                    name: e.target.value,
                  },
                ],
              })
            }
          />
          <input
            type="date"
            placeholder={`Album ${index + 1} Year`}
            value={
              artist.oneArtist.album && artist.oneArtist.album[index]
                ? artist.oneArtist.album[index].year || ""
                : ""
            }
            onChange={(e) =>
              setNewArtistData({
                ...newArtistData,
                album: [
                  ...(newArtistData.album || []),
                  {
                    ...newArtistData.album[index],
                    year: e.target.value,
                  },
                ],
              })
            }
          />
          <input
            type="text"
            placeholder={`Album ${index + 1} Picture`}
            value={
              artist.oneArtist.album && artist.oneArtist.album[index]
                ? artist.oneArtist.album[index].picture || ""
                : ""
            }
            onChange={(e) =>
              setNewArtistData({
                ...newArtistData,
                album: [
                  ...(newArtistData.album || []),
                  {
                    ...newArtistData.album[index],
                    picture: e.target.value,
                  },
                ],
              })
            }
          />
        </div>
      ))}
      <input
        type="text"
        placeholder="Photo"
        value={artist.oneArtist.photo || ""}
        onChange={(e) =>
          setNewArtistData({ ...newArtistData, photo: e.target.value })
        }
      />
      <button onClick={handleEditArtist}>Edit Artist</button>
      <button onClick={handleDeleteArtist}>Delete Artist</button>
    </div>
  );
}

export default EditOneArtistPage;

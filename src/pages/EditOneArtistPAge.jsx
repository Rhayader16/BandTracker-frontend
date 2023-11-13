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

  if (!artist) return <p>Loading</p>;

  return (
    <div className="container">
      <h1>Edit Artist</h1>
      <input
        type="text"
        placeholder="New Artist Name"
        value={newArtistData.name || ""}
        onChange={(e) =>
          setNewArtistData({ ...newArtistData, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Genre"
        value={newArtistData.genre || ""}
        onChange={(e) =>
          setNewArtistData({ ...newArtistData, genre: e.target.value })
        }
      />
      <input
        type="date"
        placeholder="New Concert Date"
        value={newArtistData.concertDate || ""}
        onChange={(e) =>
          setNewArtistData({ ...newArtistData, concertDate: e.target.value })
        }
      />
      {/* console.log(typeof artist.album) */}
      {artist.album.map((album, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Album ${index + 1} Name`}
            value={
              newArtistData.album && newArtistData.album[index]
                ? newArtistData.album[index].name || ""
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
              newArtistData.album && newArtistData.album[index]
                ? newArtistData.album[index].year || ""
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
              newArtistData.album && newArtistData.album[index]
                ? newArtistData.album[index].picture || ""
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
        value={newArtistData.photo || ""}
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

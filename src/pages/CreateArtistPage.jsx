import React, { useState } from "react";
import myApi from "../../service/axios";
import { useNavigate } from "react-router-dom";

const allGenre = [
  "Rock",
  "Pop,",
  "Metal",
  "Indie",
  "Alternative",
  "Hip Hop",
  "Jazz",
  "Blues",
  "Rap",
  "Soul",
  "R&B",
];
function CreateArtistPage() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("-1");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await myApi.post("/api/artists", { name, genre, photo });
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="title">
        <h1>Create a new Artist</h1>
      </div>
      <div className="divider"></div>
      <div className="album-edit-form">
        <form onSubmit={handleSubmit}>
          <div className="album-edit-form-container">
            <div className="mt2 width70">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt2 width70">
              <label htmlFor="genre">Genre</label>
              <select
                name="genre"
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="-1" disabled>
                  Select a Genre
                </option>
                {allGenre.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt2 width70">
              <label htmlFor="photo">Photo</label>
              <input
                type="url"
                id="photo"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>
            <div className="divider"></div>
            <div className="button-container-update">
              <button className="btn">Create Artist</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateArtistPage;

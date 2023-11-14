import React, { useState } from "react";
import myApi from "../../service/axios";

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await myApi.post("/api/artists", { name, genre, photo });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
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
      <div>
        <label htmlFor="photo">Photo</label>
        <input
          type="url"
          id="photo"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
      </div>
      <button>Create Artist</button>
    </form>
  );
}

export default CreateArtistPage;

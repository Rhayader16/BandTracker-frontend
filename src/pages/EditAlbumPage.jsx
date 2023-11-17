import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import myApi from "../service/axios";

function EditAlbumPage() {
  const [albumName, setAlbumName] = useState(null);
  const [albumPicture, setAlbumPicture] = useState(null);
  const [albumYear, setAlbumYear] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { albumId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    myApi
      .get(`/api/albums/${albumId}`)
      .then((response) => {
        setAlbumName(response.data.name);
        setAlbumPicture(response.data.picture);
        setAlbumYear(response.data.year);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await myApi.put(`/api/albums/${albumId}`, {
        name: albumName,
        picture: albumPicture,
        year: albumYear,
      });
      console.log(response.data);
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <p>Loading</p>;

  return (
    <>
      <div className="container">
        <div className="form-update">
          <div className="title-medium">{albumName}</div>
          <div className="divider"></div>
          <div className="album-edit-form">
            <form onSubmit={handleUpdate}>
              <div className="album-edit-form-container">
                <div className="mt2 width70">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                  />
                </div>
                <div className="mt2 width70">
                  <label htmlFor="year">Year</label>
                  <input
                    type="text"
                    id="year"
                    value={albumYear}
                    onChange={(e) => setAlbumYear(e.target.value)}
                  />
                </div>
                <div className="mt2 width70">
                  <label htmlFor="picture">Picture</label>
                  <input
                    type="url"
                    id="picture"
                    value={albumPicture}
                    onChange={(e) => setAlbumPicture(e.target.value)}
                  />
                </div>
              </div>
              <div className="divider"></div>
              <div className="button-container-update">
                <button className="btn">Update Album</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditAlbumPage;

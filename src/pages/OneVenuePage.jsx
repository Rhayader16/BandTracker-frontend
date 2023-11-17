import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myApi from "../../service/axios";
import { useAuth } from "../../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function OneVenuePage() {
  const [venue, setVenue] = useState(null);
  let { venueId } = useParams();
  const { user } = useAuth();

  const getVenue = () => {
    myApi
      .get(`/api/concerts/venue/${venueId}`)
      .then((response) => {
        setVenue(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getVenue();
  }, []);

  if (!venue) return <p>Loading</p>;
  console.log(venue);
  return (
    <div className="container">
      <div className="venue-list">
        <div className="artist-name">{venue.artist.name}</div>
        <div className="venue-city">{venue.city}</div>
        <div className="divider"></div>
        <div className="venue-venue">{venue.venue}</div>
        <div className="venue-address">{venue.address}</div>
        <div className="map-container">
          <MapContainer
            className="map"
            center={[venue.coordinates[0], venue.coordinates[1]]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "400px", width: "70vw" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[venue.coordinates[0], venue.coordinates[1]]}>
              <Popup>
                <img src="/vite.svg" alt="Vite vite" />
                <h2>Your Concert is here: </h2>
                <p>{venue.address}</p>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default OneVenuePage;

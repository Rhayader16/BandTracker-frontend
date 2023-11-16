import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
      <ul className="venue-list">
        <li>{venue.artist.name}</li>
        <li>{venue.city}</li>
        <li>{venue.venue}</li>
        <li>{venue.address}</li>
        <li>{venue.date}</li>
        <li>
          <MapContainer
            center={[venue.coordinates[0], venue.coordinates[1]]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "400px", width: "400px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[venue.coordinates[0], venue.coordinates[1]]}>
              <Popup>
                <h2>Concert here: </h2>
                <p>{venue.address}</p>
              </Popup>
            </Marker>
          </MapContainer>
        </li>
      </ul>
    </div>
  );
}

export default OneVenuePage;

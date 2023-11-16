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
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "200px", width: "200px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={venue.coordinates[0][1]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                <img src="/vite.svg" alt="Vite vite" />
                <h1>Dat popup</h1>
              </Popup>
            </Marker>
          </MapContainer>
          console.log(venue)
          {venue.coordinates[0]}, {venue.coordinates[1]}
        </li>
      </ul>
    </div>
  );
}

export default OneVenuePage;

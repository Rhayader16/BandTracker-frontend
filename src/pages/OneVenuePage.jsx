import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import myApi from "../../service/axios";
import { useAuth } from "../../context/AuthContext";

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
          {venue.coordinates[0]}, {venue.coordinates[1]}
        </li>
      </ul>
    </div>
  );
}

export default OneVenuePage;

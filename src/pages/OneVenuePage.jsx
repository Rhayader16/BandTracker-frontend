import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import myApi from "../../service/axios";
import { useAuth } from "../../context/AuthContext";

function OneVenuePage() {
  const [venue, setVenue] = useState(null);
  const [artist, setArtist] = useState(null);
  const [artistId, setArtistId] = useState(null);
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
  }, []); // Questo chiama getVenue al montaggio del componente

  useEffect(() => {
    if (venue) {
      let artistId = venue.artist;
      setArtistId(artistId);
      if (artistId) {
        myApi
          .get(`/api/artists/${artistId}`)
          .then((response) => {
            setArtist(response.data.oneArtist);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [venue]);

  console.log(venue);
  return (
    <div className="container">
      <ul className="venue-list">
        <li>{artist && artist.name}</li>
        <li>{venue && venue.city}</li>
        <li>{venue && venue.venue}</li>
        <li>{venue && venue.address}</li>
        <li>{venue && venue.date}</li>
        <li>
          {venue && venue.coordinates[0]}, {venue && venue.coordinates[1]}
        </li>
      </ul>
    </div>
  );
}

export default OneVenuePage;

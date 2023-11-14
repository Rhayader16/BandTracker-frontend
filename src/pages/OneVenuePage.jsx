import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import myApi from "../../service/axios";
import { useAuth } from "../../context/AuthContext";

function OneVenuePage() {
  const [venue, setVenue] = useState(null);
  const [artists, setArtists] = useState(null);
  let { venueId } = useParams();
  const { user } = useAuth();

  const getVenue = () => {
    myApi.get(`/api/venues`);
  };

  return <div>OneVenuePage</div>;
}

export default OneVenuePage;

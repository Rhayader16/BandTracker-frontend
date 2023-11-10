import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import AllVenuesPage from "./pages/AllVenuesPage";
// import Homepage from "./pages/HomePage";
// import OneArtistPage from "./pages/OneArtistPage";
// import OneVenuePage from "./pages/OneVenuePage";

import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          {/*What should I display in the homepage? AAAAAHHHH!!*/}
          {/* <Route path="/" element={<Homepage />} />{" "}
          <Route element={<LoggedInUser />}>
            <Route path="/concerts" element={<AllVenuesPage />} />
            <Route path="/:artistId" element={<OneArtistPage />} />
            <Route path="/concert" element={<OneVenuePage />} />
          </Route> */}
          {/* This paths are available to the any user */}
          {/* <Route element={<LoggedOutUser />}> */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
          {/* </Route> */}
        </Routes>
      </div>
    </>
  );
}

export default App;

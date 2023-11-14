import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import AllVenuesPage from "./pages/AllVenuesPage";
import Homepage from "./pages/HomePage";
import OneArtistPage from "./pages/OneArtistPage";
// import OneVenuePage from "./pages/OneVenuePage";
import LoggedInUser from "./navigation/LoggedInUser";
import LoggedOutUser from "./navigation/LoggedOutUser";
import AdminRoute from "./navigation/AdminRoute";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EditOneArtistPage from "./pages/EditOneArtistPage";
import CreateArtistPage from "./pages/CreateArtistPage";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          {/*What should I display in the homepage? AAAAAHHHH!!*/}
          <Route path="/" element={<Homepage />} />
          <Route element={<LoggedInUser />}>
            {/* <Route path="/concerts" element={<AllVenuesPage />} /> */}
            <Route path="/artist/:artistId" element={<OneArtistPage />} />
            {/* <Route path="/concert" element={<OneVenuePage />} /> */}
          </Route>
          <Route element={<AdminRoute />}>
            <Route
              path="/artist/edit/:artistId"
              element={<EditOneArtistPage />}
            />
            <Route path="/artist/create" element={<CreateArtistPage />} />
          </Route>
          {/* This paths are available to the any user */}
          <Route element={<LoggedOutUser />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="*" element={<ErrorPage />} /> */}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

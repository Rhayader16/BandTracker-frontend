import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoggedInUser from "./navigation/LoggedInUser";
import LoggedOutUser from "./navigation/LoggedOutUser";
import AdminRoute from "./navigation/AdminRoute";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/HomePage";
import OneArtistPage from "./pages/OneArtistPage";
import OneVenuePage from "./pages/OneVenuePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CreateArtistPage from "./pages/CreateArtistPage";
import EditAlbumPage from "./pages/EditAlbumPage";
import FavouritesPage from "./pages/FavouritesPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route element={<LoggedInUser />}>
            <Route path="/favourites" element={<FavouritesPage />}></Route>
            <Route path="/artist/:artistId" element={<OneArtistPage />} />
            <Route path="/oneVenuePage/:venueId" element={<OneVenuePage />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/artist/create" element={<CreateArtistPage />} />
            <Route
              path="/album/:albumId/edit"
              element={<EditAlbumPage />}
            ></Route>
          </Route>
          {/* This paths are available to the any user */}
          <Route element={<LoggedOutUser />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

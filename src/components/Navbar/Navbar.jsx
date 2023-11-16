import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "../Navbar/Navbar.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  // const [searchQuery, setSearchQuery] = useState("");

  // const handleSearch = () => {
  //   Navigate("/q?=" + searchQuery);
  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleSearch();
  //   }
  // };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <Link to="/">
            <img
              src="http://www.danielemanzo.com/band-tracker/logo.png"
              alt=""
            />
          </Link>
        </div>
        {/* <div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div> */}
        <div className="menu-container">
          {isLoggedIn && (
            <>
              <span>{user && user.name}</span>
              <Link to="/favourites">Your Favourites</Link>
              {user && user.role === "admin" && (
                <>
                  <Link to="/artist/create">Create Artist</Link>
                </>
              )}
              <button className="logout-btn" onClick={logOutUser}>
                Logout
              </button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/signup">
                <button className="signup-btn">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { useContext, useState } from "react";
import myApi from "../../service/axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    myApi
      .post("/auth/login", requestBody)
      .then(async (response) => {
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);

        await authenticateUser();

        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Login</h1>

        <form onSubmit={handleLoginSubmit}>
          <div className="input-data-container">
            <div className="email-field">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div className="password-field">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
            </div>
          </div>
          <button className="login-btn-form" type="submit">
            Login
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <dir className="divider"></dir>
        <p>Don't have an account yet?</p>
        <Link to={"/signup"}>Sign Up</Link>
      </div>
    </div>
  );
}

export default LoginPage;

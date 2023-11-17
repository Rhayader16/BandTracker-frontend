import { useState } from "react";
import myApi from "../../service/axios";
import { Link, useNavigate } from "react-router-dom";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    myApi
      .post("/auth/signup", requestBody) //here we create the new user
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signup-page">
      <div className="login-box">
        <h1>SignupPage</h1>
        <div className="divider"></div>
        <form onSubmit={handleSignupSubmit}>
          <div className="input-data-container">
            <div className="email-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                placeholder="Email Address"
              />
            </div>
            <div className="password-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                placeholder="Insert a Password"
              />
            </div>
            <div className="email-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                placeholder="Insert your name"
              />
            </div>
          </div>
          <button className="login-btn-form" type="submit">
            Sign Up
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Already have a account?</p>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}

export default SignupPage;

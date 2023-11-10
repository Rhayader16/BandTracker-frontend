import { useState } from "react";
import myApi from "../../service/axios";
import { Link, useNavigate } from "react-router-dom";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [erroMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    myApi
      .post("/auth/signup", requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <h1>SignupPage</h1>
      <form onSubmit={handleSignupSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={handleName} />
        <button type="submit">Sign Up</button>
      </form>
      {erroMessage && <p className="error-message">{errorMessage}</p>}
      <p>Already have a account?</p>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}

export default SignupPage;

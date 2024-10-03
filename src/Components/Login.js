import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginUser = (e) => {
    e.preventDefault();
    const loginData = { email, password };

    axios
      .post("http://localhost:8080/api/auth/login", loginData)
      .then((response) => {
        console.log("Login response data:" , response.data)
        const token = response.data.jwt; 
        const role=response.data.userRole;
        console.log("Rols from local storage" ,role)
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", role) 
        alert("Login successful");
        navigate("/books");
      })
      .catch((error) => {
        console.error("there was an error loggin in.", error);
        alert("Invalid credentials! Please try again.");
      });
  };

  const handleSignupRedirect = () => {
    navigate("/signup"); 
  };

  return (
    <>
      {/* Login form */}
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLoginUser}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <button type="submit">Login</button>
          <p className="signup-text">
            New user?{" "}
            <span onClick={handleSignupRedirect} className="signup-link">
              Sign up here
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;

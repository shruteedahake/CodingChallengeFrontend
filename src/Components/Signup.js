import React, { useState } from "react";
import axios from "axios";
import '../Styles/Signup.css'
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState("0");
  const navigate = useNavigate();

  const handleSignupUser = (e) => {
    e.preventDefault();
    const signupData = {
      email: signupEmail,
      password: signupPassword,
      name,
      userRole: parseInt(userRole, 10),
    };

    axios
      .post("http://localhost:8080/api/auth/signup", signupData)
      .then((response) => {
        alert("Signup successful!");
        navigate("/")
      })
      .catch((error) => {
        console.error("There was an error signing up!", error);
        alert("Invalid credentials! Please try again.");
      });
  };

  const handleLoginRedirect=()=>{
    navigate('/login')
  }

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignupUser} className="signup-form">
        <input
          type="email"
          placeholder="Email"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
        />
        <br />
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
        >
          <option value="0">Admin</option>
          <option value="1">User</option>
        </select>
        <br />
        <button type="submit">SignUp</button><br></br>
        <p>
            Already a user ?{" "}
            <span onClick={handleLoginRedirect} className="signup-link">
            Login
                </span> 
        </p>

      </form>
    </div>
  );
};

export default Signup;

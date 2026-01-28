import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import "./Login.css"; // Reusing login styles

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    try {
      await authApi.register({ username: email, password });
      alert("User registered successfully");
      navigate("/"); // Redirect to login
    } catch (err) {
      console.error("REGISTER FAILED", err);
      alert("Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign Up</h2>
        <form onSubmit={register}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <div className="note">
          <p>
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

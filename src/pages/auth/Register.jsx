import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import "./Login.css"; // Reusing login styles

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      await authApi.register({ username: email, password });
      setMessage("User registered successfully! Redirecting...");
      setIsError(false);
      setTimeout(() => navigate("/"), 2000); // Redirect to login after 2 seconds
    } catch (err) {
      console.error("REGISTER FAILED", err);
      const errorMsg = typeof err.response?.data === 'string'
        ? err.response.data
        : "Registration failed. Please try again.";
      setMessage(errorMsg);
      setIsError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign Up</h2>
        {message && (
          <div className={`message-box ${isError ? "error" : "success"}`}>
            {message}
          </div>
        )}
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

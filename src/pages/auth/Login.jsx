import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authApi from "../../api/authApi";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("LOGIN CLICKED");

    try {
      const res = await authApi.login({
        username,
        password,
      });

      console.log("LOGIN SUCCESS", res.data);

      // ✅ SAVE AUTH STATE (THIS IS CRITICAL)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // ✅ REDIRECT BASED ON ROLE
      if (res.data.role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/products");
      }
    } catch (err) {
      console.error("LOGIN FAILED", err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign In</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button type="submit">Login</button>
        </form>
        <div className="note">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

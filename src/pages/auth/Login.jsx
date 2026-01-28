import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authApi from "../../api/authApi";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("GOOGLE LOGIN SUCCESS", credentialResponse);
    try {
      const res = await authApi.googleLogin({
        idToken: credentialResponse.credential,
      });

      console.log("BACKEND GOOGLE LOGIN SUCCESS", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/orders");
      }
    } catch (err) {
      console.error("GOOGLE LOGIN FAILED", err);
      alert("Google login failed. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("LOGIN CLICKED");

    try {
      const res = await authApi.login({
        username: email,
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
        navigate("/orders");
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
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
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

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="google-login-btn">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>

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

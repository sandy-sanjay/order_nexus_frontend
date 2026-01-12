import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      await authApi.register({ username, password });
      alert("User registered successfully");
    } catch (err) {
      console.error("REGISTER FAILED", err);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={register}>
      <h2>User Register</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
}

export default Register;

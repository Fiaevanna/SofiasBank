import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./Form.css";
import axios from "axios";

function LoginForm({ onLoggedIn }) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  async function login() {
    try {
      const response = await axios.post(
        "http://localhost:1337/users/login",
        {
          email,
          password,
        }
      );
      if (response.status == 200) {
        onLoggedIn(email,password)
      }
    } catch (error) {
      alert("Try again");
    }
  }

  return (
    <>
      <h1>Login bellow!</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={login}>Sign in</button>
      </form>
    </>
  );
}

export default LoginForm;

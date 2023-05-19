import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./Form.css";
import axios from "axios";



function RegisterForm() {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  async function register() {
    try {
      const response = await axios.post(
        "http://localhost:1337/users/register",
        {
          email,
          password,
        }
      );
      if (response.status == 201) {
        alert("Your loged in");
      }
    } catch (error) {
      alert("Try again");
    }
  }

  return (
    <>
      <h1>Register bellow!</h1>
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
        <button onClick={register}>Sign up</button>
      </form>
    </>
  );
}

export default RegisterForm;

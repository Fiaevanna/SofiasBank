import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegisterForm from "./RegisterForm.jsx";
import LoginForm from "./LoginForm.jsx";


function NotLoggedInPage({ onLoggedIn }) {
  const [currentPage, setCurrentPage] = useState("Login");


  return (
    <>
    <h1 className="title">SAB</h1>
      <div className="nav">
        <button onClick={() => setCurrentPage("Login")}>Login</button>
        <button onClick={() => setCurrentPage("Register")}>Register</button>
      </div>

      {currentPage == "Login" ? <LoginForm onLoggedIn={onLoggedIn} /> : <RegisterForm onRegisterd={() => setCurrentPage("Login")} />}
    </>
  );
}

export default NotLoggedInPage;


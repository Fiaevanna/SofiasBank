import { useState, useEffect } from "react";

import "./App.css";

import NotLoggedInPage from "./NotLoggedInPage.jsx";
import Bank from "./Bank.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function checkIsLoggedIn() {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (email && password) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  function onLoggedIn(email, password) {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    setIsLoggedIn(true);
  }
  function handleOnLogout() {
    localStorage.clear()
    setIsLoggedIn(false)
  }
  return (
    <>
      {isLoggedIn == true ? (
        <Bank onLogout={handleOnLogout} />
      ) : (
        <NotLoggedInPage onLoggedIn={onLoggedIn} />
      )}
    </>
  );
}

export default App;

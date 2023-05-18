import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegisterForm from "./RegisterForm.jsx";
import LoginForm from "./LoginForm.jsx";


const pages = ['Login', 'Register', 'BankAccounts', 'BankAccount' ]
function App() {
  const [currentPage, setCurrentPage] = useState('Login');

  function updateCount() {
    
  }

  return (
    <>
    <div>
      <button onClick={ () => setCurrentPage('Login')}>Login</button>
      <button onClick={ () => setCurrentPage('Register')}>Register</button>
    </div>
  
      {
        currentPage == 'Login' ?   <LoginForm /> : <RegisterForm />
      }
    </>
  );
}

export default App;

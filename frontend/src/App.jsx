import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegisterForm from './RegisterForm.jsx'
import LoginForm from './LoginForm.jsx'

function App() {
  const [count, setCount] = useState(0)

  function updateCount () {
    setCount(count + 1)
  }

  return (
    <>
       <RegisterForm/>
       <LoginForm/>
       </>
  )
}

export default App

import { useState } from "react";
import axios from "axios";
import "./Form.css";

function CreateBankAccountForm({onCreated}) {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  async function create() {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    try {
      const response = await axios.post(
        "http://localhost:1337/bankaccounts",
        {
          name,
          balance,
        },
        {
          headers: {
            email: email,
            password: password,
          },
        }
      );
      if (response.status == 201) {
        alert("Balance is uppdated");
        setName(""); 
        setBalance("");
        onCreated()
      }
    } catch (error) {
      alert("Try again");
      console.log(error)
    }
  }

  return (
    <>
      <h1>Create a bankaccount</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          id="name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label htmlFor="balance">Balance</label>
        <input
          name="balance"
          id="balance"
          type="number"
          value={balance}
          onChange={(event) => {
            setBalance(event.target.value);
          }}
        />
        <button onClick={create}>Create</button>
      </form>
    </>
  );
}

export default CreateBankAccountForm;

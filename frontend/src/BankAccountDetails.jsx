import "./BankAccountDetails.css";
import { useState } from "react";
import axios from "axios";

function BankAccountDetails({ bankAccount, onSaved, onDeleted }) {
  const [insert, setInsert] = useState("");
  const [withdraw, setWithdraw] = useState("");

  async function insertAmount() {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    try {
      const response = await axios.patch(
        `http://localhost:1337/bankaccounts/${bankAccount.bankAccountNumber}/insert`,
        {
        
          balance: Number(insert),
        },
        {
          headers: {
            email: email,
            password: password,
          },
        }
      );
      if (response.status == 200) {
        alert("Balance is uppdated"); 
        setInsert("");
        onSaved()
      }
    } catch (error) {
      alert("Try again");
      console.log(error)
    }
  }

  async function withdrawAmount() {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    try {
      const response = await axios.patch(
        `http://localhost:1337/bankaccounts/${bankAccount.bankAccountNumber}/withdraw`,
        {
        
          balance: Number(withdraw),
        },
        {
          headers: {
            email: email,
            password: password,
          },
        }
      );
      if (response.status == 200) {
        alert("Balance is uppdated"); 
        setInsert("");
        onSaved()
      }
    } catch (error) {
      alert("Try again");
      console.log(error)
    }
  }

  async function deleteAccount() {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    try {
      const response = await axios.delete(
        `http://localhost:1337/bankaccounts/${bankAccount.bankAccountNumber}`,
       
        {
          headers: {
            email: email,
            password: password,
          },
        }
      );
      if (response.status == 200) {
        alert("Account is deleted!"); 
        onDeleted()
      }
    } catch (error) {
      alert("Try again");
      console.log(error)
    }
  }

  return (
    <div>
      <div className="bankAccountDetails">
        <div className="info">
          <p>Name: {bankAccount.name}</p>

          <p>Account number: {bankAccount.bankAccountNumber}</p>
          <p>Balance: {bankAccount.balance}</p>
        </div>

        <div className="withDraw">
          <label htmlFor="insert">Input amount you wish to insert</label>
          <input
          value={insert}
            type="number"
            name="insert"
            onChange={(event) => {
              setInsert(event.target.value);
            }}
          />
          <button onClick={insertAmount}>Insert</button>
        </div>

        <div className="withDraw">
          <label htmlFor="withdraw">Input amount you wish to withdraw</label>
          <input
           value={withdraw}
            type="number"
            name="withdraw"
            onChange={(event) => {
              setWithdraw(event.target.value);
            }}
          />
          <button onClick={withdrawAmount}>Withdraw</button>
        </div>

        <button onClick={deleteAccount} id="delete">
          Delete account
        </button>
      </div>
    </div>
  );
}

export default BankAccountDetails;

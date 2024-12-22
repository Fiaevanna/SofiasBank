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
        onSaved();
      }
    } catch (error) {
      alert("Try again");
      console.log(error);
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
        onSaved();
      }
    } catch (error) {
      alert("Try again");
      console.log(error);
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
        onDeleted();
      }
    } catch (error) {
      alert("Try again");
      console.log(error);
    }
  }

  return (
    <div>
      <h3>
        UPDATE ACCOUNT BALANCE, <br /> edit currency
      </h3>
      <div className="bankAccountDetails">
        <div className="info">
          <div className="cardInfo">
            <p>NAME:</p>
            <p> {bankAccount.name}</p>
          </div>
          <div className="cardInfo">
            <p> ACCOUNT NR:</p>
            <p> {bankAccount.bankAccountNumber}</p>
          </div>

          <div className="cardInfo">
            <p> BALANCE:</p>
            <p> {bankAccount.balance}:-</p>
          </div>
        </div>
      </div>
      <div className="bankAccountDetails">
        <div className="withDraw">
          <label htmlFor="insert">Enter insert amount</label>
          <input
            value={insert}
            type="number"
            name="insert"
            placeholder="200 000"
            onChange={(event) => {
              setInsert(event.target.value);
            }}
          />
          <button onClick={insertAmount}>Insert</button>
        </div>
      </div>
      <div className="bankAccountDetails">
        <div className="withDraw">
          <label htmlFor="withdraw">Enter withdraw amount</label>
          <input
            value={withdraw}
            type="number"
            name="withdraw"
            placeholder="200 000"
            onChange={(event) => {
              setWithdraw(event.target.value);
            }}
          />
          <button onClick={withdrawAmount}>Withdraw</button>
        </div>
      </div>
      <div className="bankAccountDetails">
        <button onClick={deleteAccount} id="delete">
          Delete account
        </button>
      </div>
    </div>
  );
}

export default BankAccountDetails;

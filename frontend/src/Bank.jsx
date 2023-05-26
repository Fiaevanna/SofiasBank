import { useState, useEffect } from "react";
import CreateBankAccountForm from "./CreateBankAccountForm.jsx";
import BankAccountsList from "./BankAccountsList";
import BankAccountDetails from "./BankAccountDetails";
import axios from "axios";

function Bank({onLogout}) {
  // till vänster (currentBankAccount) är variablen medans (setCurrentBankAccount) sätter om variablen och uppdaterar DOM
  const [currentBankAccount, setCurrentBankAccount] = useState(undefined);
  const [currentPage, setCurrentPage] = useState("List");
  const [bankAccounts, setBankAccounts] = useState([]);

  function handelOnBankAccountChange(bankaccount) {
    console.log(bankaccount);
    setCurrentBankAccount(bankaccount);
    setCurrentPage("Details");
  }

  async function handleOnSaved(){
    const response = await getAllBankAccount();
    const currentBankAccountNew = response.find((bankAccount) => {
      return bankAccount._id == currentBankAccount._id; 

    })
    setCurrentBankAccount(currentBankAccountNew)
  }


  async function handleOnDeleted(){
    await getAllBankAccount();
    setCurrentPage("List")
  }

  async function handleOnCreated () {
    await getAllBankAccount();
    setCurrentPage("List")
  }
  
  useEffect(() => {
    getAllBankAccount();
  }, []);

  async function getAllBankAccount() {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    try {
      const response = await axios.get("http://localhost:1337/bankaccounts", {
        headers: {
          email: email,
          password: password,
        },
      });
      if (response.status == 200) {
        setBankAccounts(response.data);
        return response.data; 
      }
    } catch (error) {
      alert("Try again");
      console.log(error);
    }
  }


  return (
    <>
      <h1 className="title">SAB</h1>
      <div className="nav">
        <button onClick={() => setCurrentPage("List")}>List</button>
        <button onClick={() => setCurrentPage("Create")}>Create</button>
        <button onClick={onLogout}>Logout</button>
      </div>
     
      {currentPage == "List" &&  <BankAccountsList bankAccounts={bankAccounts} onBankAccountChange={handelOnBankAccountChange} />}
      {currentPage == "Create" &&  <CreateBankAccountForm onCreated={handleOnCreated}/>}
      {currentPage == "Details" && <BankAccountDetails onDeleted={handleOnDeleted} onSaved={handleOnSaved} bankAccount={currentBankAccount} />}
    </>
  );
}

export default Bank;

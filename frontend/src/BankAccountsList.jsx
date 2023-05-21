import { useState, useEffect } from "react";
import axios from "axios";
import "./BankAccountsList.css";

function BankAccountsList({onBankAccountChange, bankAccounts}) {



  return (
    <div className="bankAccountListMain">
      <h3>Accounts</h3>
      {bankAccounts.map((bankaccount) => (
        <div onClick={() => onBankAccountChange(bankaccount)} className="bankAccountListItem" key={bankaccount.bankAccountNumber}>
          
          <p>Name: {bankaccount.name}</p>

          <p>Account number: {bankaccount.bankAccountNumber}</p>
          <p>Balance: {bankaccount.balance}</p>
          
        </div>
      ))}
    </div>
  );
}

export default BankAccountsList;

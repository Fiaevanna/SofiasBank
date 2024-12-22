import { useState, useEffect } from "react";
import axios from "axios";
import "./BankAccountsList.css";

function BankAccountsList({ onBankAccountChange, bankAccounts }) {
  return (
    <div className="bankAccountListMain">
      <h3>
        OVERVIEW, <br /> Click card to edit details
      </h3>
      {bankAccounts.map((bankaccount) => (
        <div
          onClick={() => onBankAccountChange(bankaccount)}
          className="bankAccountListItem"
          key={bankaccount.bankAccountNumber}
        >
          <div className="cardInfo">
            <p>NAME:</p>
            <p> {bankaccount.name}</p>
          </div>
          <div className="cardInfo">
            <p>ACCOUNT NR:</p>
            <p>{bankaccount.bankAccountNumber}</p>
          </div>
          <div className="cardInfo">
            <p>BALANCE:</p>
            <p> {bankaccount.balance}:-</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BankAccountsList;

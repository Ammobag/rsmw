import { React, useState } from "react";
import "./styles.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import "firebase/database";
import "firebase/auth";
import {} from "../../firebase";
import Getonce, {
  postTransaction,

} from "../../functions/dbquery";
import Select from "react-dropdown-select";


export default function AddTransaction() {
  const [amount, setamount] = useState("");
  const [month, setmonth] = useState("");
  const [year, setyear] = useState("");
  const [value, setvalue] = useState("");

  const [error, seterror] = useState("");

  const history = useHistory();

  var users = Getonce("users/");

  var options = [];

  for (const key in users) {
    if (Object.hasOwnProperty.call(users, key)) {
      const element = users[key];
      var insert = {
        name: element.name,
        value: element.UID,
      };

      options.push(insert);
    }
  }

  const months = [
    { name: "January" },
    { name: "February" },
    { name: "March" },
    { name: "April" },
    { name: "May" },
    { name: "June" },
    { name: "July" },
    { name: "August" },
    { name: "September" },
    { name: "October" },
    { name: "November" },
    { name: "December" },
  ];

  var d = new Date();
  var currentYear = d.getFullYear();
  var years = [];

  for (let index = 2010; index <= currentYear + 1; index++) {
    years.push({ name: index });
  }

  const handleSubmit = (e) => {
    if (value && amount && month && year) {
      if(value.length === 0){
        postTransaction(value[0].value, amount, month[0].name, year[0].name);
        history.replace("/dashboard")
      }else{
        for (let i = 0; i < value.length; i++) {
          const element = value[i];
          postTransaction(element.value, amount, month[0].name, year[0].name);
        }
        history.replace("/dashboard")
      }
    } else {
      seterror("Please enter a valid username and password");
    }
  };

  return (
    <div className="body">
      <div className="login-wrapper">
        <div style={{ color: "red" }}>{error}</div>
        <div className="textField-wrapper">
          <Select
            multi
            style={{ width: 300 }}
            placeholder="Select Resident"
            color={"#000"}
            searchBy={"name"}
            searchable={true}
            labelField={"name"}
            valueField={"value"}
            options={options}
            dropdownGap={5}
            onChange={(values) => setvalue(values)}
            noDataLabel="No matches found"
          />

          <TextField
            id="amount"
            label="Amount"
            type="number"
            variant="outlined"
            style={{ width: 300 }}
            margin="dense"
            value={amount}
            onChange={(e) => setamount(e.target.value)}
          />

          <Select
            style={{ width: 300 }}
            placeholder="Select Month"
            color={"#000"}
            labelField={"name"}
            valueField={"name"}
            options={months}
            dropdownGap={5}
            onChange={(values) => setmonth(values)}
            noDataLabel="No matches found"
          />
          <Select
            style={{ width: 300 }}
            placeholder="Select Year"
            color={"#000"}
            labelField={"name"}
            valueField={"name"}
            options={years}
            dropdownGap={5}
            onChange={(values) => setyear(values)}
            noDataLabel="No matches found"
          />
        </div>

        <div>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Fees
          </Button>
        </div>
      </div>
    </div>
  );
}

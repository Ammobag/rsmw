import React, { useState } from "react";
import UserNavigation from "./UserNavigation";
import Button from "@material-ui/core/Button";
import { useTable } from "react-table";
import styles from "./UserTransactions.module.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import sizeObject from "../functions/dataHandling";

import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export default function UserTransactions() {
  // const[data, setdata] = useState([])
  const [data, setdata] = useState([{
          col4: "No Records",
        },])
  const [user, setuser] = useState("");
  const [thisuser, setthisuser] = useState(null);
  // eslint-disable-next-line
  const [type, settype] = useState(null);
  const [fetch, setfetch] = useState(false);
  const [amount, setamount] = useState(0)
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  var allYear = []
  var d = new Date();
  var n = d.getFullYear();

  for (let i = n-5; i <= n+1; i++) {
      allYear.push(i)
  }

  var database = firebase.database();

  if(!user){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setuser(user.uid);
        var Ref = database.ref("users/" + user.uid + "/");
          Ref.once("value", (snapshot) => {
            var users = snapshot.val();
            setthisuser(users)
            settype(users.villaType);

            if(users.villaType === "Miranda"){
              setamount(11059)
            }else if (users.villaType === "Leon") {
              setamount(7489)
            }else if (users.villaType === "Pedro") {
              setamount(6540)
            }
        });
      }
    });
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const __DEV__ = document.domain === "localhost";

  async function displayRazorpay() {
    var id = Date.now();
    var users = thisuser;
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const cartAmount = amount * 100;
    const d = new Date();
    var i = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    const query = await axios.post("https://idealvillas.herokuapp.com/pay", {
      amount: cartAmount,
    });

    const { REACT_APP_RAZ_TEST_KEY_ID, REACT_APP_RAZ_PRODUCTION_KEY_ID } =
      process.env;

    const options = {
      key: __DEV__
        ? REACT_APP_RAZ_TEST_KEY_ID
        : REACT_APP_RAZ_PRODUCTION_KEY_ID,
      currency: "INR",
      amount: query.data.amount,
      order_id: query.data.id,
      name: "Ideal Villa",
      description: "Make your payment",

      handler: function (response) {

        firebase
          .database()
          .ref("maintenance/" + id + "/")
          .set({
            UID : user,
            amount: amount,
            dueMonth: month,
            dueYear: year,
            orderID: response.razorpay_order_id,
            paidDate: i,
            paymentID: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            status: "Paid"
          })
        window.location.reload(true)
      },
      prefill: {
        name: users.name,
        email: users.email,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }



    async function displayRazorpayFine(amount, id, users) {
    
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const cartAmount = amount * 100;
    const d = new Date();
    var i = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    const query = await axios.post("https://idealvillas.herokuapp.com/pay", {
      amount: cartAmount,
    });

    const { REACT_APP_RAZ_TEST_KEY_ID, REACT_APP_RAZ_PRODUCTION_KEY_ID } =
      process.env;

    const options = {
      key: __DEV__
        ? REACT_APP_RAZ_TEST_KEY_ID
        : REACT_APP_RAZ_PRODUCTION_KEY_ID,
      currency: "INR",
      amount: query.data.amount,
      order_id: query.data.id,
      name: "Ideal Villa",
      description: "Make your payment",

      handler: function (response) {

            firebase.database().ref("maintenance/" + id + "/").child("paymentID").set(response.razorpay_payment_id);
            firebase.database().ref("maintenance/" + id + "/").child("orderID").set(response.razorpay_order_id);
            firebase.database().ref("maintenance/" + id + "/").child("signature").set(response.razorpay_signature);
            firebase.database().ref("maintenance/" + id + "/").child("paidDate").set(i);
            firebase.database().ref("maintenance/" + id + "/").child("status").set("Paid");
        window.location.reload(true)
      },
      prefill: {
        name: users.name,
        email: users.email,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }



  const payButton = (status, amount, id, users) => {
    if (status !== "Paid") {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => displayRazorpayFine(amount, id, users)}
          style={{ margin: 8 }}
        >
          Pay Now
        </Button>
      );
    } else {
      return <div>Already Paid</div>;
    }
  };


  if (!fetch && thisuser) {
    var temp = []
    var Ref = database.ref("maintenance/").orderByChild("UID").equalTo(user);
    Ref.once("value", (snapshot) => {
      var query = snapshot.val();
      for (const key in query) {
        if (Object.hasOwnProperty.call(query, key)) {
          const element = query[key];
          var insert = {
            col1: element.UID,
            col2: thisuser.name,
            col3: element.amount,
            col4: element.dueMonth,
            col5: element.dueYear,
            col6: element.status,
            col7: element.paidDate,
            col8: payButton(element.status, element.amount, key, thisuser),
          };

          temp.unshift(insert)

          if(temp.length === sizeObject(query)){
            setdata(temp)
          }
        }
      }
      setfetch(true)
    });
  }

  const checkPaid = (month, year) => {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if(element.col4 === month && element.col5 === year && element.col3 === amount) {
        return true;
      }
    }
    return false;
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "col2",
      },
      {
        Header: "Amount",
        accessor: "col3",
      },
      {
        Header: "Month",
        accessor: "col4",
      },
      {
        Header: "Year",
        accessor: "col5",
      },
      {
        Header: "Status",
        accessor: "col6",
      },
      {
        Header: "Paid Date",
        accessor: "col7",
      },
      {
        Header: "Pay",
        accessor: "col8",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className={styles.userTransactions}>
      <UserNavigation />
      <div className={styles.transactionsWrapper}>
        <h1 className={styles.dueSection}>Monthly Maintenance Fees : ₹ {amount}</h1>
        
          <div style={{flexDirection: 'row'}}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={month}
                  displayEmpty
                  onChange={(e)=>{setMonth(e.target.value)}}
                  style={{width: 150, textAlign: "center", margin: 25}}
                >
                  <MenuItem value="" disabled>
                    Month
                  </MenuItem>
                  <MenuItem value={"January"}>January</MenuItem>
                  <MenuItem value={"February"}>February</MenuItem>
                  <MenuItem value={"March"}>March</MenuItem>
                  <MenuItem value={"April"}>April </MenuItem>
                  <MenuItem value={"May"}>May</MenuItem>
                  <MenuItem value={"June"}>June</MenuItem>
                  <MenuItem value={"July"}>July</MenuItem>
                  <MenuItem value={"August"}>August</MenuItem>
                  <MenuItem value={"September"}>September</MenuItem>
                  <MenuItem value={"October"}>October</MenuItem>
                  <MenuItem value={"November"}>November</MenuItem>
                  <MenuItem value={"December"}>December</MenuItem>
                </Select>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={year}
                  displayEmpty
                  onChange={(e)=>{setYear(e.target.value)}}
                  style={{width: 150, textAlign: "center", margin: 25}}
                >
                  <MenuItem value="" disabled>
                    Year
                  </MenuItem>
                  {allYear.map((val, index)=>{
                    return(<MenuItem key={index} value={val}>{val}</MenuItem>);
                  })}
                </Select>
                 <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    if(year && month && !checkPaid(month, year)){
                      console.log("Loading...")
                      displayRazorpay()
                    }

                    if(checkPaid(month, year)){
                      alert("Already Paid")
                    }
                  }}
                  style={{ margin: 8 }}
                >
                  Pay Online
                </Button>
            </div>
        
        <div style={{ height: 30 }} />
        <div className={styles.tableWrapper}>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: "10px",
                            border: "solid 0px gray",
                            background: "#ffffff",
                            minWidth: "12.5vw",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

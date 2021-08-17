import React, { useState } from "react";
import UserNavigation from "./UserNavigation";
import Button from "@material-ui/core/Button";
import { useTable } from "react-table";
import styles from "./UserTransactions.module.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import sizeObject from "../functions/dataHandling";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function UserTransactions() {
  var query = Getonce("maintenance/");
  // const[data, setdata] = useState([])
  var data = [];
  const [tempdata, settempdata] = useState([]);
  const [user, setuser] = useState("");
  const [fetch, setfetch] = useState(false);
  var list = [];
  var temp = [];

  var amount = 0;
  var c = 0;
  var database = firebase.database();
  const history = useHistory();

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

  async function displayRazorpay(amount, id, user) {
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

    const info = {
      amount: cartAmount,
    };

    const query = await axios.post("http://localhost:8080/pay", {
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
          .child("paymentID")
          .set(response.razorpay_payment_id);
        firebase
          .database()
          .ref("maintenance/" + id + "/")
          .child("orderID")
          .set(response.razorpay_order_id);
        firebase
          .database()
          .ref("maintenance/" + id + "/")
          .child("signature")
          .set(response.razorpay_signature);
        firebase
          .database()
          .ref("maintenance/" + id + "/")
          .child("paidDate")
          .set(i);
        firebase
          .database()
          .ref("maintenance/" + id + "/")
          .child("status")
          .set("Paid");
        history.replace("/transaction");
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const payButton = (status, amount, id, user) => {
    if (status !== "Paid") {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => displayRazorpay(amount, id, user)}
          style={{ margin: 8 }}
        >
          Pay Now
        </Button>
      );
    } else {
      return <div>Already Paid</div>;
    }
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setuser(user.uid);
    }
  });
  if (data.length === 0 || data[0].col4 === "No Records" || fetch === false) {
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        c++;
        const element = query[key];

        var Ref = database.ref("users/" + element.UID + "/");
        Ref.once("value", (snapshot) => {
          var user = snapshot.val();
          console.log(fetch);
          setfetch(true);
          var insert = {
            col1: element.UID,
            col2: user.name,
            col3: element.amount,
            col4: element.dueMonth,
            col5: element.dueYear,
            col6: element.status,
            col7: element.paidDate,
            col8: payButton(element.status, element.amount, key, user),
          };

          list.push(insert);

          if (list.length === sizeObject(query) && fetch === false) {
            settempdata(list);
          }
        });
      }
    }

    var temp = [];
    for (let index = 0; index < tempdata.length; index++) {
      const element = tempdata[index];

      if (element.col1 == user) {
        temp.push(element);
        console.log(element);
        if (element.col6 == "Not Paid") {
          amount = amount + Number(element.col3);
        }
      }
    }

    console.log(temp);
    data = temp;

    if (data.length === 0) {
      data = [
        {
          col4: "No Records",
        },
      ];
    }
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
        <h1 className={styles.dueSection}>Amount Due : ₹ {amount}</h1>
        <div style={{ height: 30 }} />
        <div className={styles.tableWrapper}>
          <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
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

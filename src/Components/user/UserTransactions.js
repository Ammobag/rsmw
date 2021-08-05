import React, { useState } from "react";
import UserNavigation from "./UserNavigation";
import { useTable } from "react-table";
import "./UserTransactions.module.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import sizeObject from "../functions/dataHandling";
import { useHistory } from "react-router-dom";

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

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setuser(user.uid);
    }
  });
  if (data.length === 0 || data[0].col4 == "No Records" || fetch == false) {
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
          };

          list.push(insert);

          if (list.length === sizeObject(query) && fetch == false) {
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
        amount = amount + Number(element.col3);
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
        Header: "UID",
        accessor: "col1", // accessor is the "key" in the data
      },
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
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="userTransactions">
      <UserNavigation />
      <div className="transactionsWrapper">
        <div className="dueSection">
          <div className="due">Amount Due : </div>
          <div className="dueAmount">₹ {amount}</div>
        </div>
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
  );
}

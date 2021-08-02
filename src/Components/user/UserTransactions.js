import React, { useState } from "react";
import UserNavigation from "./UserNavigation"
import { useTable } from "react-table";
import "./style.css";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";

export default function UserTransactions() { 
  
  const [name, setname] = useState();
  const [user, setuser] = useState();
  
  var amount = 0;
  var query = Getonce("maintenance/");
  var data = [];
  var database = firebase.database();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setuser(user)
    } 
  });

  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key)) {
      const element = query[key];
      var Ref = database.ref("users/" + element.UID + "/");
      Ref.once("value", (snapshot) => {
        var query = snapshot.val();
        setname(query.name);
      });

      var insert = {
        col1: element.UID,
        col2: name,
        col3: element.amount,
        col4: element.dueMonth,
        col5: element.dueYear,
        col6: element.status,
        col7: element.paidDate,
      };
      if(element.UID === user.uid){
        data.push(insert);
        if(element.status === "Not Paid")
          amount = amount + element.amount;
      }
    }
  }

  if(data.length === 0){
    data = [
      {
        col4: "No Records",
      }
    ]
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

    return( 
      <div className="main-body"> 
        <UserNavigation/>
        <div className="feed-page">
          <div className="dueSection">
            <div className="due">Amount Due : </div>
            <div className="dueAmount">₹ {amount}</div>
          </div>
          <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: "solid 3px red",
                        background: "aliceblue",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
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
                            border: "solid 1px gray",
                            background: "papayawhip",
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
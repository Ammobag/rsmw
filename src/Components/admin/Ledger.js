import React, { useState } from "react";
import { useTable } from "react-table";
import "./Ledger.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import sizeObject from "../functions/dataHandling";


export default function Ledger() {

  var query = Getonce("maintenance/");
  const[data, setdata] = useState([])
  var list = [];
  var database = firebase.database();
  const history = useHistory()

  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key)) {
      const element = query[key];
      var Ref = database.ref("users/" + element.UID + "/");
      Ref.once("value", (snapshot) => {
        var user = snapshot.val();
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
       
        if(list.length === sizeObject(query)){
          setdata(list)
        }
      });

      
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

  const handleAdd = (e) => {
    history.push("/dashboard/addTransaction");
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        disableElevation
      >
        Add New Transaction
      </Button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
    </React.Fragment>
  );
}

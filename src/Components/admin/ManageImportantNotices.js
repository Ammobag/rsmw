import React, { useState } from "react";
import { useTable } from "react-table";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import sizeObject from "../functions/dataHandling";
import styles from "./ManageContractors.module.css";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

export default function ManageImportantNotices() {
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);
  var query = Getonce("importantNotices/");
  var list = [];
  const history = useHistory();
  if (!fetch) {
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const element = query[key];
        console.log(element);
        var insert = {
          col1: element.date,
          col2: element.body,
          col3: (
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteImportantNotice}
              disableElevation
            >
              Delete
            </Button>
          ),
        };
        list.push(insert);
      }
      function handleDeleteImportantNotice() {
        firebase.database().ref("/importantNotices").child(key).remove();
        history.replace("/dashboard/manageImportantNotices");
      }
      console.log(list.length, sizeObject(query));
      if (list.length === sizeObject(query)) {
        setData(list);
        setFetch(true);
      }
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Important Notice Date",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Important Notice Body",
        accessor: "col2",
      },
      {
        Header: "Delete",
        accessor: "col3",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  function handleAddImpNotice() {
    history.push("/dashboard/addImportantNotices");
  }

  return (
    <section className={styles.main}>
      <div style={{ height: 30 }} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddImpNotice}
        disableElevation
        style={{ width: 300 }}
      >
        Add Imp Notice
      </Button>
      <div style={{ height: 30 }} />
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
                        maxWidth: "600px",
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
    </section>
  );
}

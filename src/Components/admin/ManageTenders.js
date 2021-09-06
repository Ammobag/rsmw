import React, { useState } from "react";
import { useTable } from "react-table";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import sizeObject from "../functions/dataHandling";
import styles from "./ManageTenders.module.css";
import firebase from "firebase/app";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
export default function ManageTenders() {
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);
  const history = useHistory();
  var query = Getonce("tenders/");
  var list = [];
  if (!fetch) {
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const element = query[key];
        console.log(element);
        var insert = {
          col1: element.tenderName,
          col2: element.tenderOpeningDate,
          col3: element.tenderClosingDate,
          col4: element.tenderAmount,
          col5: element.tenderDetails,
          col6: (
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteTender}
              disableElevation
            >
              Delete
            </Button>
          ),
        };
        list.push(insert);
      }
      function handleDeleteTender() {
        firebase.database().ref("/tenders").child(key).remove();
        window.location.reload(true);
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
        Header: "Tender Name",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Tender Opening Date",
        accessor: "col2",
      },
      {
        Header: "Tender Closing Date",
        accessor: "col3",
      },
      {
        Header: "Tender Amount",
        accessor: "col4",
      },
      {
        Header: "Tender Details",
        accessor: "col5",
      },

      {
        Header: "Delete",
        accessor: "col6",
      },
    ],
    []
  );
  function handleAddTender() {
    history.push("/dashboard/addTender");
  }
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <section className={styles.main}>
      <div style={{ height: 30 }} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTender}
        disableElevation
      >
        Add Tender
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

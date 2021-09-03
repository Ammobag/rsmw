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

export default function ManageContractors() {
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);
  var query = Getonce("contractors/");
  var list = [];
  var database = firebase.database();
  const history = useHistory();
  if (!fetch) {
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const element = query[key];
        console.log(element);
        var insert = {
          col1: element.contractorName,
          col2: element.contractorCategory,
          col3: element.contractorContact,
          col4: (
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteContractor}
              disableElevation
            >
              Delete
            </Button>
          ),
        };
        list.push(insert);
      }
      function handleDeleteContractor() {
        firebase.database().ref("/contractors").child(key).remove();
        history.replace("/dashboard/manageTenders");
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
        Header: "Contractor Name",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Contractor Category",
        accessor: "col2",
      },
      {
        Header: "Contractor Contact",
        accessor: "col3",
      },
      {
        Header: "Contractor Contact",
        accessor: "col4",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  function handleAddContractor() {}

  return (
    <section className={styles.main}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddContractor}
        disableElevation
        style={{ width: 300 }}
      >
        Add New Contractor
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

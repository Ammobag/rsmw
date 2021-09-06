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


export default function TenderApplication() {
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);
  var query = Getonce("tenderApplication/");
  var list = [];
  // eslint-disable-next-line

  if (!fetch) {
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const element = query[key];
        console.log(element);
        var insert = {
          col1: element.name,
          col2: element.email,
          col3: element.contact,
          col4: element.description,
          col5: (
            <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{ height: 10 }} />
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteContractor}
              disableElevation
            >
              Delete
            </Button>
            <div style={{ height: 10 }} />
            <a target="_blank"  rel="noreferrer" href={"https://console.firebase.google.com/u/0/project/rsmw-56be8/storage/rsmw-56be8.appspot.com/files/~2Ftenderapplication~2F"+ element.id}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
            >
              View Files
            </Button>
            </a>
            </div>
          ),
        };
        list.push(insert);
      }

      function handleDeleteContractor() {
        firebase.database().ref("tenderApplication/").child(key).remove();
        window.location.reload(true)
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
        Header: "Name",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Email",
        accessor: "col2",
      },
      {
        Header: "Contact Number",
        accessor: "col3",
      },
      {
        Header: "Description",
        accessor: "col4",
      },
      {
        Header: "Actions",
        accessor: "col5",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <section className={styles.main}>
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

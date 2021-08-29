import React, { useState } from "react";
import { useTable } from "react-table";
import styles from "./Ledger.module.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import sizeObject from "../functions/dataHandling";

export default function Ledger() {
  const [searchInput, setsearchInput] = useState();
  const [alldata, setalldata] = useState([]);
  var query = Getonce("maintenance/");
  const [data, setdata] = useState([]);
  var list = [];
  var database = firebase.database();
  const history = useHistory();

  if (data.length !== sizeObject(query) && !searchInput) {
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

          if (list.length === sizeObject(query)) {
            setdata(list);
            setalldata(list);
          }
        });
      }
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

  const globalSearch = () => {
    let filteredData = [];

    if (searchInput) {
      for (let i = 0; i < alldata.length; i++) {
        const element = alldata[i];
        console.log(element);
        console.log(element.col1, searchInput);
        if (
          element.col1.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col2.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col3
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          element.col4.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col6.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col7.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col5
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        ) {
          filteredData.push(element);
        }
      }
      setdata(filteredData);
    }
  };

  const handleAdd = (e) => {
    history.push("/dashboardaddTransaction");
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className={styles.main}>
      <section>
        <div className={styles.actions}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              id="search"
              label="Search"
              type="text"
              variant="outlined"
              margin="dense"
              style={{ width: 200 }}
              value={searchInput}
              onChange={(e) => setsearchInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={globalSearch}
              className={styles.addNewTransactionBtn}
            >
              <SearchIcon />
            </Button>
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            disableElevation
            style={{ width: 300 }}
          >
            Add New Transaction
          </Button>
        </div>

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
      </section>
    </div>
  );
}

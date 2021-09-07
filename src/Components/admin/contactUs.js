import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useTable } from "react-table";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./ManageUsers.module.css";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";

import sizeObject from "../functions/dataHandling";

export default function AdminContact() {
  const [searchInput, setsearchInput] = useState();
  const [alldata, setalldata] = useState([]);
  const [data, setdata] = useState([]);
  const [fetch, setFetch] = useState(false)
  var query = Getonce("contactus/");

  var list = [];

  if (!fetch && !searchInput) {
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const element = query[key];

        var insert = {
          col1: element.name,
          col2: element.phone,
          col3: element.email,
          col4: element.description,

        };

        list.push(insert);
        if (list.length === sizeObject(query)) {
          setdata(list);
          setalldata(list);
          setFetch(true)
        }
      }
    }
  }

  const globalSearch = () => {
    let filteredData = [];
    if (searchInput) {
      for (let i = 0; i < alldata.length; i++) {
        const element = alldata[i];

        if (
          element.col1
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          element.col2
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          element.col3
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          element.col4
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

  if (data.length === 0) {
    setdata([
      {
        col4: "No Records Found",
      },
    ]);
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Phone",
        accessor: "col2",
      },
      {
        Header: "Email",
        accessor: "col3",
      },
      {
        Header: "Description",
        accessor: "col4",
      },
    ],
    []
  );


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
            <Button variant="contained" color="primary" onClick={globalSearch}>
              <SearchIcon />
            </Button>
          </div>

        </div>
        <div className={styles.tableWrapper}>
          <table {...getTableProps()} style={{ marginTop: "2rem" }}>
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

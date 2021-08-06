import React, { useState } from "react";

import { useTable } from "react-table";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./ManageUsers.module.css";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import { useHistory } from "react-router-dom";
import sizeObject from "../functions/dataHandling";

export default function ManageUsers() {
  const [searchInput, setsearchInput] = useState();
  const [alldata, setalldata] = useState([]);
  const [data, setdata] = useState([]);
  var query = Getonce("users/");
  const history = useHistory();
  var list = [];

  if(data.length != sizeObject(query) && !searchInput){
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const element = query[key];

        var insert = {
          col1: element.UID,
          col2: element.name,
          col3: element.phonenumber,
          col4: element.flatno,
          col5: element.blockno,
        };

        list.push(insert)
        console.log(list.length, sizeObject(query))
        if(list.length === sizeObject(query)){
          setdata(list)
          setalldata(list)
        }
      }
    }
  }

  const globalSearch = () => {
    let filteredData = []
    if (searchInput) {
      for (let i = 0; i < alldata.length; i++) {
        const element = alldata[i];
        console.log(element.col8, searchInput)
        if(
          element.col1.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col2.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col3.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col4.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col5.toString().toLowerCase().includes(searchInput.toLowerCase()) 
          

        ){
          filteredData.push(element)
        }
      }
      setdata(filteredData)
    }
  };

  if (data.length === 0) {
    setdata( [
      {
        col4: "No Records Found",
      },
    ])
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
        Header: "Phone Number",
        accessor: "col3",
      },
      {
        Header: "Flat No.",
        accessor: "col4",
      },
      {
        Header: "Block No.",
        accessor: "col5",
      },
    ],
    []
  );

  const handleAdd = (e) => {
    history.push("/dashboard/adduser");
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className={styles.main}>
      <section>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          disableElevation
        >
          Add User
        </Button>
        <div>
        <TextField
          id="search"
          label="Search"
          type="text"
          variant="outlined"
          margin="dense"
          style={{ margin: 8 }}
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={globalSearch}>
            Search
        </Button>
      </div>
        <div className={styles.tableWrapper}>

      <table {...getTableProps()} style={{ marginTop: "2rem" }}>
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
        </div>
      </section>
    </div>
  );
}

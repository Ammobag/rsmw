import { useTable } from "react-table";
import styles from "./NoticeBoard.module.css";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import sizeObject from "../functions/dataHandling";
import { useHistory } from "react-router-dom";

export default function NoticeBoard() {
  const [searchInput, setsearchInput] = useState();
  const [alldata, setalldata] = useState([]);
  const [data, setdata] = useState([]);
  var query = Getonce("notices/");

  var list = [];
  const history = useHistory();

  if (data.length !== sizeObject(query) && !searchInput) {
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const element = query[key];

        var insert = {
          col1: element.issuerName,
          col2: element.issuerDesignation,
          col3: element.subject,
          col4: element.body,
          col5: element.date,
        };

        list.push(insert);
        console.log(list.length, sizeObject(query));
        if (list.length === sizeObject(query)) {
          setdata(list);
          setalldata(list);
        }
      }
    }
  }

  const globalSearch = () => {
    let filteredData = [];
    if (searchInput) {
      for (let i = 0; i < alldata.length; i++) {
        const element = alldata[i];
        console.log(element.col8, searchInput);
        if (
          element.col1.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col2.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col3.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col4.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col5.toLowerCase().includes(searchInput.toLowerCase())
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
        Header: "Issuer Name",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Issuer Designation",
        accessor: "col2",
      },
      {
        Header: "Subject",
        accessor: "col3",
      },
      {
        Header: "Body",
        accessor: "col4",
      },
      {
        Header: "Date",
        accessor: "col5",
      },
    ],
    []
  );

  const handleAdd = (e) => {
    history.push("/dashboard/addNotification");
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
            <Button variant="contained" color="primary" onClick={globalSearch}>
              <SearchIcon />
            </Button>
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            disableElevation
          >
            Add New Notice
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
                  <tr
                    {...row.getRowProps()}
                    style={{ borderBottom: "1px solid #dedede" }}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: "30px",
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
        </div>
      </section>
    </div>
  );
}

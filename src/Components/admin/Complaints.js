import React, { useState } from "react";
import { useTable } from "react-table";
import styles from "./Complaints.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import ComplaintStatus from "./AdminActions/handleComplaintStatus";
import sizeObject from "../functions/dataHandling";
import SearchIcon from "@material-ui/icons/Search";

export default function Complaints() {
  const [searchInput, setsearchInput] = useState();
  const [alldata, setalldata] = useState([]);
  const [fetch, setFetch] = useState(false);
  var query = Getonce("complaints/");
  const [data, setdata] = useState([]);
  var list = [];
  var database = firebase.database();


  if (!fetch && !searchInput) {
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const element = query[key];
        var Ref = database.ref("users/" + element.UID + "/");
        Ref.once("value", (snapshot) => {
          var user = snapshot.val();
          const Stat = () => {
            return <ComplaintStatus token={key} defaults={element.status} />;
          };

          var insert = {
            col1: element.UID,
            col2: user.name,
            col3: element.subject,
            col4: element.body,
            col5: Stat(),
            col6: element.dateOpened,
            col7: element.dateClosed,
            col8: "status:" + element.status,
          };

          list.push(insert);
          if (list.length === sizeObject(query)) {
            setdata(list);
            setalldata(list);
            setFetch(true);
          }
        });
      }
    }
  }

  const globalSearch = () => {
    let filteredData = [];
    if (searchInput) {
      for (let i = 0; i < alldata.length; i++) {
        const element = alldata[i];
        if (
          element.col1.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col2.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col3.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col4.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col6.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col7.toLowerCase().includes(searchInput.toLowerCase()) ||
          element.col8.toLowerCase() === searchInput.toLowerCase()
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
        Header: "UID",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Name",
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
        Header: "Status",
        accessor: "col5",
      },
      {
        Header: "Date Opened",
        accessor: "col6",
      },
      {
        Header: "Date Closed",
        accessor: "col7",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className={styles.main}>
      <div className={styles.actions}>
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
      <section>
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

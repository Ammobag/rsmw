import React, { useState } from "react";
import { useTable } from "react-table";
import "./Ledger.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import { useHistory } from "react-router-dom";
import sizeObject from "../functions/dataHandling";
import styles from "./ManageContent.module.css";
import SearchIcon from "@material-ui/icons/Search";

export default function ManageContent() {
  const [searchInput, setsearchInput] = useState();
  const [alldata, setalldata] = useState([]);
  const [data, setdata] = useState([]);
  var query = Getonce("posts/");
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
          var dateNow = new Date(element.timestamp);
          var date = `${dateNow.toLocaleString("en", {
            day: "2-digit",
          })} ${dateNow.toLocaleString("en", {
            month: "short",
          })} at ${dateNow.toLocaleString("ru", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}`;

          const ViewLink = () => {
            return <a href={element.image}>View Image</a>;
          };

          const deletePost = () => {
            firebase.database().ref("posts/").child(key).remove();
            history.replace("/dashboard/manageContent");
          };

          const DeleteButton = () => {
            return (
              <Button
                variant="contained"
                color="primary"
                onClick={deletePost}
                disableElevation
              >
                Delete
              </Button>
            );
          };

          var insert = {
            col1: element.postID,
            col2: user.name,
            col3: element.body,
            col4: date,
            col5: ViewLink(),
            col6: DeleteButton(),
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

  const globalSearch = () => {
    let filteredData = [];
    if (searchInput) {
      for (let i = 0; i < alldata.length; i++) {
        const element = alldata[i];
        console.log(element.col8, searchInput);
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
            .includes(searchInput.toLowerCase()) ||
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
        Header: "Post ID",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "col2",
      },
      {
        Header: "Body",
        accessor: "col3",
      },
      {
        Header: "Date",
        accessor: "col4",
      },
      {
        Header: "Files",
        accessor: "col5",
      },
      {
        Header: "Delete Post",
        accessor: "col6",
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
            <SearchIcon />
          </Button>
          <div></div>
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

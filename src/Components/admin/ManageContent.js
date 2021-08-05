import React, { useState } from "react";
import { useTable } from "react-table";
import "./Ledger.module.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import sizeObject from "../functions/dataHandling";
import styles from "./ManageContent.module.css";

export default function ManageContent() {
  var query = Getonce("posts/");
  const [data, setdata] = useState([]);
  var list = [];
  var database = firebase.database();
  const history = useHistory();

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
        }
      });
    }
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

  const handleAdd = (e) => {
    history.push("/dashboard/addTransaction");
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className={styles.main}>
      <section>
        <div className={styles.tableWrapper}>
          {" "}
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

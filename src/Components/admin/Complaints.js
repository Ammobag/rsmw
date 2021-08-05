import React, { useState } from "react";

import { useTable } from "react-table";
import styles from "./Complaints.module.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import ComplaintStatus from "./AdminActions/handleComplaintStatus";

export default function Complaints() {
  const [name, setname] = useState();
  var query = Getonce("complaints/");
  var data = [];
  var database = firebase.database();

  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key)) {
      const element = query[key];
      var Ref = database.ref("users/" + element.UID + "/");
      Ref.once("value", (snapshot) => {
        var query = snapshot.val();
        setname(query.name);
      });

      const Stat = () => {
        return <ComplaintStatus token={key} defaults={element.status} />;
      };

      var insert = {
        col1: element.UID,
        col2: name,
        col3: element.subject,
        col4: element.body,
        col5: Stat(),
        col6: element.dateOpened,
        col7: element.dateClosed,
      };

      data.push(insert);
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

import React from "react";

import { useTable } from "react-table";
import Button from "@material-ui/core/Button";

import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import { useHistory } from "react-router-dom";

export default function ManageUsers() {
  var query = Getonce("users/");
  var data = [];
  const history = useHistory();

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
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        disableElevation
      >
        Add User
      </Button>

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
    </React.Fragment>
  );
}

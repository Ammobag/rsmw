import React from "react";

import { useTable } from "react-table";

import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";

export default function NoticeBoard() {
  var query = Getonce("notices/");
  var data = [];

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

      data.push(insert);
    }
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
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
  );
}

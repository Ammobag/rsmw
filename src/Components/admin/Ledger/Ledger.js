import React from "react";

import { useTable } from 'react-table'
import "./Ledger.css";


import "firebase/database";
import "firebase/auth";
import {} from "../../firebase";
import Getonce, { Getname } from "../../functions/dbquery";



export default function Ledger() {

  var query = Getonce('maintenance/')
  var data = []

  console.log(Getname('fM2LwdjpYmb7nhSn8X4KLsHfasm2'))

  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key)) {
      const element = query[key];

      var insert = {
        col1: element.UID,
        col2: element.UID,
        col3: element.amount,
        col4: element.dueMonth,
        col5: element.dueYear,
        col6: element.status,
        col7: element.paidDate,
      };
      
      
      data.push(insert)

    }
  }





  const columns = React.useMemo(
    () => [
      {
        Header: 'UID',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Name',
        accessor: 'col2',
      },
      {
        Header: 'Amount',
        accessor: 'col3',
      },
      {
        Header: 'Month',
        accessor: 'col4',
      },
      {
        Header: 'Year',
        accessor: 'col5',
      },
      {
        Header: 'Status',
        accessor: 'col6',
      },
      {
        Header: 'Paid Date',
        accessor: 'col7',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

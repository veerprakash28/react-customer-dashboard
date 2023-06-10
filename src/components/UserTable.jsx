import React from "react";

import { BsFillPencilFill } from "react-icons/bs";

import "./UserTable.css";

export const UserTable = ({ rows, editRow }) => {
  return (
    <div className="table-wrapper">
      <table className="table" cellSpacing={20}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>GENDER</th>
            <th>UNIVERSITY</th>
            <th>CITY</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const customerName = row.firstName + " " + row.lastName;
            const gender =
              row.gender.charAt(0).toUpperCase() + row.gender.slice(1);
            return (
              <tr key={idx}>
                <td>
                  <div className="customer image-wrapper">
                    <img src={row.image} alt="" className="image" />
                  </div>
                  <div className="customer text-wrapper">
                    <h4>{customerName}</h4>
                    <p className="email">{row.email}</p>
                  </div>
                </td>
                <td>{row.phone}</td>
                <td>
                  <span className={`label label-${row.gender}`}>{gender}</span>
                </td>
                <td className="university">{row.university}</td>
                <td>{row.company.address.city}</td>

                <td className="fit">
                  <span className="actions" onClick={() => editRow(idx)}>
                    <BsFillPencilFill className="edit-btn" />
                    <span>Edit</span>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

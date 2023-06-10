import { useEffect, useState } from "react";

import "./App.css";
import { UserTable } from "./components/UserTable";
import { AddUser } from "./components/AddUser";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const getUserData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      const sortedRows = data.users;
      setRows(sortedRows);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  // Function for Updating User
  const handleUpdate = async (formState, id) => {
    try {
      const nameParts = formState.customerName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts[1] || "";
      const updatedData = {
        firstName: firstName || formState.firstName,
        lastName: lastName || "",
        gender: formState.gender,
        university: formState.university,
        company: {
          address: {
            city: formState.city || formState.company.address.city,
          },
        },
      };

      const response = await fetch(`https://dummyjson.com/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedRow = await response.json();
        const updatedRows = [...rows];

        if (rowToEdit === null) {
          updatedRows.push(updatedRow);
        } else {
          updatedRows[rowToEdit] = updatedRow;
        }

        setRows(updatedRows);
      } else {
        console.error("Error adding/editing user:", response.status);
      }
    } catch (error) {
      console.error("Error adding/editing user:", error);
    }

    setModalOpen(false);
    setRowToEdit(null);
  };

  // Function for Adding User
  const handleSubmit = async (newRow) => {
    try {
      const nameParts = newRow.customerName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts[1] || "";
      const userData = {
        ...newRow,
        firstName,
        lastName,
        image: "https://robohash.org/hicveldicta.png",
        email: "dummymail@gmail.com",
        company: {
          address: {
            city: newRow.city || "",
          },
        },
      };
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedRows = [...rows];

        if (rowToEdit === null) {
          updatedRows.push(data);
        } else {
          updatedRows[rowToEdit] = data;
        }

        setRows([data, ...rows]);
      } else {
        console.error("Error adding/editing user:", response.status);
      }
    } catch (error) {
      console.error("Error adding/editing user:", error);
    }

    setModalOpen(false);
    setRowToEdit(null);
  };

  return (
    <div className="App">
      <div className="header-container">
        <h2 className="heading">Customer List</h2>
        <button onClick={() => setModalOpen(true)} className="btn">
          Add Customer
        </button>
      </div>
      {modalOpen && (
        <AddUser
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          onUpdate={handleUpdate}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
      <UserTable rows={rows} editRow={handleEditRow} />
    </div>
  );
}

export default App;

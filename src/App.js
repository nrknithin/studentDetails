import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const App = () => {
  const customStyles = {
    headCells: {
      style: { "font-size": "14px", "font-weight": "700" },
    },
    cells: {
      style: { paddingRight: "0px" },
    },
  };

  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [dob, setDOB] = useState([]);
  const [contact, setContact] = useState([]);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [dobError, setDOBError] = useState(false);
  const [contactError, setContactError] = useState(false);

  const [columns] = useState([
    {
      selector: "firstName",
      name: "First Name",
      width: "150px",
      sortable: true,
    },
    {
      selector: "lastName",
      name: "First Name",
      width: "150px",
      sortable: true,
    },
    {
      selector: "dob",
      name: "Date of Birth",
      width: "150px",
      sortable: true,
    },
    {
      selector: "contact",
      name: "Contact Number",
      width: "150px",
      sortable: true,
    },
  ]);
  const onFNameChange = (e) => {
    let firstNameFormat = /^[a-zA-Z]+$/;
    if (firstNameFormat.test(e.target.value)) {
      setFirstName(e.target.value);
      setFirstNameError(false);
    } else setFirstNameError(true);
  };
  const onLNameChange = (e) => {
    let secondNameFormat = /^[a-zA-Z ]+$/;
    if (secondNameFormat.test(e.target.value)) {
      setLastName(e.target.value);
      setLastNameError(false);
    } else setLastNameError(true);
  };
  const onDOBChange = (e) => {
    setDOB(e.target.value);
  };
  const onContactChange = (e) => {
    if (e.target.value < 9999999999) {
      setContact(e.target.value);
      setContactError(false);
    } else setContactError(true);
  };
  const handleAddNew = () => {
    ChangeView(!gridView);
    setFirstName("");
    setLastName("");
    setDOB("");
    setContact("");
  };

  const handleSubmit = () => {
    if (firstName !== "" && lastName !== "" && dob !== "" && contact !== "") {
      setData([
        ...data,
        {
          firstName,
          lastName,
          dob,
          contact,
        },
      ]);
      ChangeView(!gridView);
    } else alert("all fields are required");
  };

  const [gridView, ChangeView] = useState(true);
  return (
    <div>
      {gridView ? (
        <div
          style={{ position: "center !important", height: "70% !important" }}
        >
          <button onClick={handleAddNew}>Add New</button>
          <DataTable
            columns={columns}
            data={data}
            noHeader
            defaultSortField="Rfqnum"
            customStyles={customStyles}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="400px"
          />
        </div>
      ) : (
        <div className="container">
          <div>
            <label for="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={onFNameChange}
              value={firstName}
            />
            <label hidden={!firstNameError}>Invalid Data</label>
          </div>
          <div>
            <label for="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={onLNameChange}
              value={lastName}
            />
            <label hidden={!lastNameError}>Invalid Data</label>
          </div>
          <div>
            <label for="dob">DOB</label>
            <input type="date" id="dob" name="dob" onChange={onDOBChange} />
            <label hidden={!dobError}>Not a Proper Date</label>
          </div>
          <div>
            <label for="contact">Contact Number</label>
            <input
              min="1111111111"
              max="9999999999"
              type="number"
              id="contact"
              name="contact"
              onChange={onContactChange}
              value={contact}
            />
            <label hidden={!contactError}>Not a proper Contact Number</label>
          </div>
          <br />
          <div>
            <button onClick={() => ChangeView(!gridView)}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

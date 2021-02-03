import React, { useState } from "react";
import DataTable from "react-data-table-component";
import editIcon from "./img/green-edit-icon.png";
import deleteIcon from "./img/black-delete-icon.png";

const App = () => {
  const customStyles = {
    headCells: {
      style: { "font-size": "14px", "font-weight": "700" },
    },
    cells: {
      style: { paddingRight: "0px" },
    },
  };

  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    contactNo: "",
  });
  const [course, setCourse] = useState({
    name: "",
    details: "",
  });
  const [tableData, setTableData] = useState([]);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [dobError, setDOBError] = useState(false);
  const [contactError, setContactError] = useState(false);

  const EditStudent = ({ row }) => (
    <img
      onClick={() => editStudent(row)}
      style={{ width: "20px", cursor: "pointer" }}
      src={editIcon}
    />
  );
  const editStudent = (row) => {};
  const DeleteStudent = ({ row }) => (
    <img
      onClick={() => deleteStudent(row.id)}
      style={{ width: "20px", cursor: "pointer" }}
      src={deleteIcon}
    />
  );
  const deleteStudent = (id) => {
    setStudentData(
      studentData.filter((item) => {
        return item.id !== id;
      })
    );
  };
  const [columns] = useState([
    {
      width: "35px",
      cell: (row) => <EditStudent row={row} />,
    },
    {
      width: "35px",
      cell: (row) => <DeleteStudent row={row} />,
    },
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
      selector: "contactNo",
      name: "Contact Number",
      width: "150px",
      sortable: true,
    },
  ]);
  const [columnsCourse] = useState([
    {
      selector: "courseName",
      name: "Course Name",
      width: "150px",
      sortable: true,
    },
    {
      selector: "courseDetails",
      name: "Course Details",
      width: "150px",
      sortable: true,
    },
  ]);
  const onFNameChange = (e) => {
    let firstNameFormat = /^[a-zA-Z]+$/;
    if (firstNameFormat.test(e.target.value)) {
      setStudentData({ ...studentData, firstName: e.target.value });
      setFirstNameError(false);
    } else setFirstNameError(true);
  };
  const onLNameChange = (e) => {
    let secondNameFormat = /^[a-zA-Z ]+$/;
    if (secondNameFormat.test(e.target.value)) {
      setStudentData({ ...studentData, lastName: e.target.value });
      setLastNameError(false);
    } else setLastNameError(true);
  };
  const onDOBChange = (e) => {
    setStudentData({ ...studentData, dob: e.target.value });
  };
  const onContactChange = (e) => {
    if (e.target.value < 9999999999) {
      console.log(studentData);
      setStudentData({ ...studentData, contactNo: e.target.value });
      setContactError(false);
    } else setContactError(true);
  };
  const onCourseNameChange = (e) => {
    setCourse({ ...course, name: e.target.value });
  };
  const onCourseDetailsChange = (e) => {
    setCourse({ ...course, details: e.target.value });
  };
  const handleAddCourse = () => {};
  // }
  const handleAddStudent = () => {
    if (
      studentData.firstName !== "" &&
      studentData.lastName !== "" &&
      studentData.dob !== "" &&
      studentData.contactNo !== ""
    ) {
      setTableData([...tableData, { id: Math.random() * 10, ...studentData }]);

      ///Add Api for Student Data here student Data Available in studentData
    } else alert("all fields are required");
  };

  const [addCourse, ChangeCourseView] = useState(false);
  return (
    <div>
      <button onClick={() => ChangeCourseView(!addCourse)}>
        {addCourse ? "Add Student" : "Add Course"}
      </button>
      {addCourse ? (
        <div className="container">
          <div>
            <label for="courseName">Course Name</label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              onChange={onCourseNameChange}
              value={course.name}
            />
          </div>
          <div>
            <label for="courseDetails">Course Details</label>
            <input
              type="text"
              id="courseDetails"
              name="courseDetails"
              onChange={onCourseDetailsChange}
              value={course.details}
            />
          </div>
          <div>
            <button onClick={handleAddCourse}>Add Course</button>
          </div>
          <Table
            columns={columnsCourse}
            data={course}
            customStyles={customStyles}
            exp={false}
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
            />
            <label hidden={!firstNameError}>Invalid studentData</label>
          </div>
          <div>
            <label for="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={onLNameChange}
            />
            <label hidden={!lastNameError}>Invalid studentData</label>
          </div>
          <div>
            <label for="dob">DOB</label>
            <input type="date" id="dob" name="dob" onChange={onDOBChange} />
            <label hidden={!dobError}>Not a Proper Date</label>
          </div>
          <div>
            <label for="contactNo">Contact Number</label>
            <input
              min="1111111111"
              max="9999999999"
              type="number"
              id="contactNo"
              name="contactNo"
              onChange={onContactChange}
              value={studentData.contactNo}
            />
            <label hidden={!contactError}>Not a proper Contact Number</label>
          </div>
          <br />
          <div>
            <button onClick={handleAddStudent}>Add Student</button>
          </div>
          <div
            style={{ position: "center !important", height: "70% !important" }}
          >
            {/* <Table
              columns={columns}
              studentData={studentData}
              customStyles={customStyles}
              columnsCourse={columnsCourse}
              exp={true}
            /> */}
          </div>
        </div>
      )}
      <Table
        columns={columns}
        data={tableData}
        customStyles={customStyles}
        exp={false}
      />
    </div>
  );
};

const Table = (props) => {
  console.log(props.data);
  return (
    <DataTable
      columns={props.columns}
      data={props.data}
      noHeader
      customStyles={props.customStyles}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="400px"
      expandOnRowClicked
    />
  );
};
export default App;

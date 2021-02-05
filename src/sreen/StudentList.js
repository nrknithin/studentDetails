import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const renderBody = (data) => {
  return (
    data.sort(function(a,b){
       return a.id-b.id;
    }).map(obj => {
      return <Row obj={obj} key={obj.id}/>;
    })
  );
};

const Row = ({ obj }) => {
  let { id, firstName, contactNo } = obj;
  const [isEdit, setEdit] = useState(false);
  const [name, setName] = useState(firstName);

  const update = () => {
    if (name.trim() === '') {
      alert('Cannot be empty');
    }
    axios
      .post('http://localhost:8080/sage/student/update', {...obj, firstName:name})
      .then(data => {alert("Success")
    setEdit(false)})
      .catch(error => {
        alert(error.response.data);
      });
  };

  const deleteStudent=()=>{
    axios
    .delete('http://localhost:8080/sage/student/delete/'+id)
    .then(data => {
        alert("Success")
    })
    .catch(error => {
      alert(error.response.data);
    });
  }
  return (
    <tr key={id}>
      <td className="opration">
        <button
          onClick={() => {
            if (isEdit) {
              update();
            } else {
              setEdit(true);
            }
          }}>
          {isEdit ? 'Done' : 'Update'}
        </button>
      </td>
      <td>{isEdit ? <input type="text" key={id} value={name} onChange={event => setName(event.target.value)} /> : firstName}</td>
      <td>{contactNo}</td>
      <td className="opration">
        <button onClick={() => deleteStudent()}>Delete</button>
      </td>
    </tr>
  );
};
const renderHeader = () => {
  let headerElement = ['', 'first Name', 'contact No', ''];

  return headerElement.map((key, index) => {
    return <th key={index}>{key.toUpperCase()}</th>;
  });
};

export default function StudentList() {
    const [students, setStudents] = useState([]); 
    useEffect(()=>{
        axios
      .get('http://localhost:8080/sage/student/getall')
      .then(data => setStudents(data.data))
      .catch(error => {
        alert(error.response.data);
      });
    },[])
  return (
    <div style={{ flex: 1 }}>
      <h1 id="title">Student List</h1>
      <table id="student">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody(students)}</tbody>
      </table>
    </div>
  );
}

import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const renderBody = (data) => {
  return (
    data.sort(function(a,b){
       return a.id-b.id;
    }).map(obj => {
      return <Row obj={obj} />;
    })
  );
};

const Row = ({ obj }) => {
  let { id, courseName } = obj;
  const [isEdit, setEdit] = useState(false);
  const [name, setName] = useState(courseName);

  const update = () => {
    if (name.trim() === '') {
      alert('Cannot be empty');
    }
    axios
      .post('http://localhost:8080/sage/course/update', {...obj, courseName:name})
      .then(data => {alert("Success")
    setEdit(false)})
      .catch(error => {
        alert(error.response.data);
      });
  };

  const deleteCourse=()=>{
    axios
    .delete('http://localhost:8080/sage/course/delete/'+id)
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
      <td>{isEdit ? <input type="text" value={name} onChange={event => setName(event.target.value)} /> : courseName}</td>
      <td className="opration">
        <button onClick={() => deleteCourse()}>Delete</button>
      </td>
    </tr>
  );
};
const renderHeader = () => {
  let headerElement = ['', 'Course Name', ''];

  return headerElement.map((key, index) => {
    return <th key={index}>{key.toUpperCase()}</th>;
  });
};

export default function CourseList() {
    const [courses, setCourses] = useState([]); 
    useEffect(()=>{
        axios
      .get('http://localhost:8080/sage/course/getall')
      .then(data => setCourses(data.data))
      .catch(error => {
        alert(error.response.data);
      });
    }, [])
  return (
    <div style={{ flex: 1 }}>
      <h1 id="title">Course List</h1>
      <table id="course">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody(courses)}</tbody>
      </table>
    </div>
  );
}

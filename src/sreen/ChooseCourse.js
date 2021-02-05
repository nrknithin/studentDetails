import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ChooseCourse() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [course, setCourse] =useState({id:''});
  const [student, setStudent] = useState({id:''})
  useEffect(() => {
    axios
      .get('http://localhost:8080/sage/student/getall')
      .then(data => setStudents(data.data))
      .catch(error => {
        alert(error.response.data);
      });
  }, []);
  const onStudentSelect = (id) =>{
setStudent({id})
    axios
    .get('http://localhost:8080/sage/course/getall/' + id)
    .then(data => setCourses(data.data))
    .catch(error => {
      alert(error.response.data);
    });
  }
  const onCourseSelect = (id) =>{
      setCourse({id})
  }
  const handleSubmit = () => {
    axios
    .get('http://localhost:8080/sage/student/take/student/' + student.id + '/course/'+course.id)
    .then(data => alert("Success"))
    .catch(error => {
      alert(error.response.data);
    });
  };
  return (
    <div>
      <h1 id="title">Choose course</h1>
      <select
        name="Course"
        id="course"
        onChange={a => { onStudentSelect(a.target.value);
        }}>
        <option value="" disabled selected>
          Student
        </option>
        {students.map(s => {
          return <option key={s.id} value={s.id}>{`${s.firstName} (${s.contactNo})`}</option>;
        })}
      </select>
      <select name="Course" id="course"
        onChange={a => { onCourseSelect(a.target.value);
        }}>
        <option value="" disabled selected>
          Course
        </option>
        {courses.map(s => {
          return <option key={s.id} value={s.id}>{`${s.courseName}`}</option>;
        })}
      </select>
      <input type="submit" value="Submit" onClick={handleSubmit} />
    </div>
  );
}

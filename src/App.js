import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import StudentForm from "./sreen/StudentForm";
import StudentList from "./sreen/StudentList";
import CourseForm from "./sreen/CourseForm";
import CourseList from "./sreen/CourseList";
import ChooseCourse from "./sreen/ChooseCourse";


export default function BasicExample() {
  return (
    <div className="App">
      <header className="App-header">
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/student">
            <StudentForm />
          </Route>
          <Route path="/studentList">
            <StudentList />
          </Route>
          <Route path="/course">
            <CourseForm />
          </Route>
          <Route path="/courseList">
            <CourseList />
          </Route>
          <Route path="/chooseCourse">
            <ChooseCourse />
          </Route>
        </Switch>
    </Router>
    </header>
    </div>
  );
}


function Home() {
  return (
    <div>
      <h2>Sage</h2>
    </div>
  );
}


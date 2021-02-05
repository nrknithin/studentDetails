import React from 'react';
import '../App.css';
import axios from 'axios';

class CourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { courseName: '', description: '' };

    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstName(event) {
    this.setState({ courseName: event.target.value });
  }
  handleLastName(event) {
    this.setState({ description: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.courseName.trim() === '' || this.state.description.trim() === '') {
      alert('Fields cant be empty.');
      return;
    }
    axios
      .post('http://localhost:8080/sage/course/create', this.state)
      .then(data => alert('Success'))
      .catch(error => {
        alert(error.response.data);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1 id="title">Course Form</h1>
        <div>
          <div>
            <label>
              Course Name : {'   '}
              <input type="text" value={this.state.courseName} onChange={this.handleFirstName} />
            </label>{' '}
          </div>
          <div>
            <label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description
              : {'   '}
              <textarea id="w3review" name="w3review" rows="4" cols="50" onChange={this.handleLastName}>
                {this.state.description}
              </textarea>
            </label>
          </div>
        </div>
        <input type="submit" value="Submit" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default CourseForm;

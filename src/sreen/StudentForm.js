import React from 'react';
import '../App.css';
import axios from 'axios';

class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', dob: '', contactNo: '' };

    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleDob = this.handleDob.bind(this);
    this.handleContact = this.handleContact.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstName(event) {
    this.setState({ firstName: event.target.value });
  }
  handleLastName(event) {
    this.setState({ lastName: event.target.value });
  }
  handleDob(event) {
      console.log(event.target.value)
    this.setState({ dob: event.target.value });
  }
  handleContact(event) {
      let t = event.target.value;
      if(/^[0-9\b]+$/.test(t) && t.length < 11){
    this.setState({ contactNo: event.target.value });
      }
  }

  handleSubmit(event) {
      if(this.state.contactNo.trim() === "" || this.state.lastName.trim() === "" || this.state.firstName.trim() === "" || this.state.dob.trim() === "") {
          if(this.state.contactNo.trim().length <10) {
              alert("Invalid Contact Number")
          }
          alert("Fields cant be empty.")
          return;
      }
      axios.post('http://localhost:8080/sage/student/create', this.state)
      .then(data => alert('Success'))
      .catch(error => {
        alert(error.response.data)
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1 id='title'>Student Form</h1>
        <div>
            <div>
          <label>
            First Name : {'   '}
            <input type="text" value={this.state.firstName} onChange={this.handleFirstName} />
          </label>     </div>
          <div>
          <label>
            Last Name : {'   '}
            <input type="text" value={this.state.lastName} onChange={this.handleLastName} />
          </label>
          </div>
          <div>
          <label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DOB :&nbsp;
            <input type="date" value={this.state.dob} onChange={this.handleDob} />
          </label>
          </div>
          <div>
          <label>
            ContactNo : {'   '}
            <input type="text" maxlength="10" pattern="\d{10}" title="Please enter exactly 10 digits" value={this.state.contactNo} onChange={this.handleContact} />
          </label>
          </div>
        </div>
        <input type="submit" value="Submit" onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default StudentForm;

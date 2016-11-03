import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;

class EmployeeList extends Component {
  componentWillMount() {
    this.page = 2;
  }
  handleButtonClick() {
    Meteor.subscribe('employees', PER_PAGE * this.page);
    this.page += 1;
  }
  render() {
    // this.props.employees => an array of employee objects
    var renderedEmployeeDetail = this.props.employees.map(employee => {
      return <EmployeeDetail key={employee._id} employee={employee} />
    });
    return (
      <div>
	<div className="employee-list">
	  {renderedEmployeeDetail}
	</div>
	<button onClick={this.handleButtonClick.bind(this)}
		className="btn btn-primary">Load More...</button>
      </div>
    );
  }
};

/* the below is where we do circus and send meteor data as react props */
export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees', PER_PAGE);

  // return an object. Whatever we return will be sent to EmployeeList as props
  return { employees: Employees.find({}).fetch()};
}, EmployeeList);

import React, { Component } from 'react';
import {Col,Row} from 'reactstrap';
import RegisterEmployeesForm from './RegisterEmployeeForm';



class RegisterEmployee extends Component {

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <RegisterEmployeesForm/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default RegisterEmployee;

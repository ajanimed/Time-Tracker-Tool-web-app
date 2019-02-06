import React, { Component } from 'react';

import EmployeesTab from './EmployeesTab';
import {Col,Row} from 'reactstrap';


class Employees extends Component {


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <EmployeesTab limit={4}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Employees;

import React, { Component } from 'react';
import {Col,Row} from 'reactstrap';
import RegisterSupervisorForm from './RegisterSupervisorForm';



class RegisterSupervisor extends Component {

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <RegisterSupervisorForm/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default RegisterSupervisor;

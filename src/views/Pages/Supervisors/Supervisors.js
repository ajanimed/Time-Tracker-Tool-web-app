import React, { Component } from 'react';
import SupervisorsTab from './SupervisorsTab';
import {Col,Row} from 'reactstrap';


class Supervisors extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <SupervisorsTab limit={4}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Supervisors;

import React, { Component } from 'react';

import {Col,Row} from 'reactstrap';


class Employees extends Component {


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <h4>{this.props.match.params.id}</h4>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Employees;

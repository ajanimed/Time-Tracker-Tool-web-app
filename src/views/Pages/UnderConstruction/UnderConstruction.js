import React, { Component } from 'react';
import {Col,Row} from 'reactstrap';


class UnderConstruction extends Component {


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <h1>В разработке</h1>
          </Col>
        </Row>
      </div>
    )
  }
}

export default UnderConstruction;

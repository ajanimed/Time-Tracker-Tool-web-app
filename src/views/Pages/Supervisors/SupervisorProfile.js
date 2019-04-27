import React, { Component } from 'react';

import {Col,Row} from 'reactstrap';


class SupervisorProfile extends Component {


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <h1>В разработке</h1>
            <p>id : {this.props.match.params.id}</p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SupervisorProfile;

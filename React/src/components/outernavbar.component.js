import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Stack } from 'react-bootstrap';

export default class Outernavbar extends Component {
  render() {
    return (
      <Row className='sign-navbar p-3'>
        <Col>
          <Link to={''}> Home</Link>
        </Col>
        <Col>
          <Link to={''}> Premium</Link>
        </Col>
        <Col>
          <Link to={'/sign-up'}> Sign up</Link>
        </Col>
        <Col>
          <Link to={'/sign-in'}> Log in</Link>
        </Col>
      </Row>
    );
  }
}

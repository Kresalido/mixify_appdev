import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Stack } from 'react-bootstrap';

export default class Outernavbar extends Component {
  render() {
    return (
      <Row className='sign-navbar p-3'>
        <Stack direction='horizontal' gap={4}>
          <Link to={''}> Home</Link>
          <Link to={''}> Premium</Link>
          <Link to={'/sign-up'}> Sign up</Link>
          <Link to={'/'}> Log in</Link>
        </Stack>
      </Row>
    );
  }
}

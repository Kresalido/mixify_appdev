import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Outernavbar from './outernavbar.component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, InputGroup, FormControl, Button, Stack } from 'react-bootstrap';

export default class Login extends Component {
  componentDidMount() {
    const justRegistered = localStorage.getItem('justRegistered');

    if (justRegistered) {
      toast.success("Registration successful! Please log in to continue");
      localStorage.removeItem('justRegistered');
    }
  }

  constructor(props) {
    super(props);
    const udata = localStorage.getItem('user');
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: false
    };
  }

  onChangeUserEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    this.setState({ isButtonDisabled: true });
    // Check if email or password is empty
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const userObject = {
      email: email,
      password: password
    };


    axios
      .post('http://127.0.0.1:8000/api/login', userObject) // change to docker
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          toast.success("Login successful!");
          localStorage.setItem('jwt_token', res.data.access_token);
          if (res.data.is_admin) {
            window.location.href = '/admin'
          } else {
            window.location.href = '/'
          }
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Wrong email or password');
        this.setState({ isButtonDisabled: false });
      });

    this.setState({ email: '', password: '' });
  }

  createLineBreaker() {
    return (
      <div className="line-breaker d-flex justify-content-start" style={{ alignItems: 'center', marginBottom: '10px', height: '1px', width: '380px' }}>
        <span className="line" style={{ flex: '1', height: '1px', border: '1px solid #808080', marginBottom: '30px', backgroundColor: '#808080' }}></span>
        <span style={{ color: '#A9A9A9', fontSize: '16px', marginBottom: '30px' }}>or</span>
        <span className="line" style={{ flex: '1', height: '1px', border: '1px solid #808080', marginBottom: '30px', backgroundColor: '#808080' }}></span>
      </div>
    );
  }

  render() {
    return (
      <Container className='vh-100' fluid>
        <Row className='vh-100'>
          <Col xs={5} className='singing-background'>
          </Col>
          <Col xs={7} className='vh-100 sign-container px-5'>
            <Col className='vh-100'>
              <Outernavbar />
              <Row className='h-15'>
                <div className='sign d-flex justify-content-center text-center align-items-center'>
                  <div className='d-flex align-items-end'>
                    <h3 className='p-1'>Log in to</h3>
                    <h1 className='ps-3'>MIXIFY</h1>
                  </div>
                </div>
              </Row>
              <Row className='h-70'>
                <Form onSubmit={this.onSubmit} className='sign-form'>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FormControl
                        type="text"
                        onChange={this.onChangeUserEmail}
                        name="email"
                        value={this.state.email}
                        placeholder="Email"
                        className='input'
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FormControl
                        type="password"
                        onChange={this.onChangePassword}
                        name="password"
                        value={this.state.password}
                        placeholder="Password"
                        className='input'
                      />
                    </InputGroup>
                  </Form.Group>
                  <Row className='d-flex justify-content-between'>
                    <Col xs={3} className='p-2'>
                      <Form.Group className="mb-3">
                        <Form.Check className='d-flex'
                          type="checkbox"
                          label={
                            <div className='d-flex px-2'>
                              <p className='remember-me'>Remember me</p>
                            </div>
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={6} className='d-flex justify-content-end'>
                      <a className='d-flex justify-content-end align-items-start forgot-password'>
                        Forgot Password?
                      </a>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-column align-items-center">
                    <Col className='d-flex justify-content-center align-center mb-5'>
                      <Button id="signupButton" type="submit" size='lg' className="btn-dark sign-button" disabled={this.state.isButtonDisabled}>
                        Log in
                      </Button>
                    </Col>
                    <Col className="d-flex flex-column align-items-center mb-3">
                      {this.createLineBreaker()}
                    </Col>
                    <Col>
                      <Stack direction='vertical' className='d-flex flex-column align-items-center' gap={2}>
                        <Button href="/signup/facebook" className="btn-dark sign-with-button">
                          <img src="./google.png" alt="Sign up with Google" />
                          <div>
                            Sign up with Google
                          </div>
                        </Button>
                        <Button href="/signup/facebook" className="btn-dark sign-with-button">
                          <img src="./facebook.png" alt="Sign up with Facebook" />
                          <div>
                            Sign up with Facebook
                          </div>
                        </Button>
                        <Button href="/sign-up/artist" className="btn-dark sign-with-button">
                          <img src="./user.png" alt="Sign up as an Artist" className="artist" />
                          <div>
                            Sign up as Artist
                          </div>
                        </Button>
                        <span className='d-flex justify-content-center align-items-center'>
                          <div className='d-flex justify-content-center align-items-center'>
                            <div className='have-account'>
                              Dont have an account?
                            </div>
                            <Link to="/sign-up" className='p-2 pt-3' style={{ color: 'gray', width: 'auto' }}>Sign up here.</Link>
                          </div>
                        </span>
                      </Stack>
                    </Col>
                  </Row>
                </Form>
              </Row>
            </Col>
          </Col>
        </Row>
      </Container>
    );
  }
}
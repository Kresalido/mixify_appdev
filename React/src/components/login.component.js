import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Outernavbar from './outernavbar.component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, InputGroup, FormControl, Button, Stack } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);
    const udata = localStorage.getItem('user');
    // let loggedIN = true;
    // if (udata == null) {
    //   loggedIN = false;
    // }
    this.state = {
      email: '',
      password: '',
      // loggedIN,
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

    // Check if the user is SuperAdmin
    // NOTE: MOVE THIS TO THE BACKEND
    if (email === 'superadmin@mixify.com' && password === 'superadmin') {
      // Redirect to AdminDashboard
      // window.location.href = "/admin";
      return; // Exit the function
    }

    const userObject = {
      email: email,
      password: password
    };

    axios
      .post('http://127.0.0.1:8000/api/login', userObject) // change to docker
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('user', JSON.stringify(res.data));
          // this.setState({
          //   loggedIN: true
          // });
          toast.success("Login successful!");
          // Check if the user is an admin
          if (res.data.is_admin) {
            // Redirect to /admin
            this.props.history.push('/admin');
          } else {
            // Redirect to /home
            this.props.history.push('/home');
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
      <div className="line-breaker" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', height: '1px', width: '380px' }}>
        <span className="line" style={{ flex: '1', height: '1px', border: '1px solid #808080', marginBottom: '30px', backgroundColor: '#808080' }}></span>
        <span style={{ padding: '0 10px', color: '#A9A9A9', fontSize: '16px', marginBottom: '30px' }}>or</span>
        <span className="line" style={{ flex: '1', height: '1px', border: '1px solid #808080', marginBottom: '30px', backgroundColor: '#808080' }}></span>
      </div>
    );
  }

  render() {
    // if (this.state.loggedIN) {
    //   return <Navigate to="/dashboard" />;
    // }
    return (
      <Container className='vh-100' fluid>
        <Row className='vh-100'>
          <Col xs={5} className='singing-background'>
            <p>okay</p>
          </Col>
          <Col xs={7} className='vh-100 sign-container'>
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
                  <Row className='d-flex justify-content-center'>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Check className='d-flex'
                          type="checkbox"
                          label={
                            <div className='d-flex px-3'>
                              <p className='remember-me'>Remember me</p>
                            </div>
                          }
                        // checked={termsChecked}
                        // onChange={() => setTermsChecked(!termsChecked)}
                        />
                      </Form.Group>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                      <a className='d-flex justify-content-end forgot-password'>
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
                      <Stack direction='vertical' className='d-flex flex-column align-items-center'>
                        <Button href="/signup/facebook" className="btn-dark sign-with-button">
                          <img src="./google.png" alt="Sign up with Facebook" style={{ width: '30px', height: '30px', marginRight: '3px' }} />
                          <div className='p-2 d-flex align-items-center justify-content-center flex-grow-1'>
                            Sign up with Google
                          </div>
                        </Button>
                        <Button href="/signup/facebook" className="btn-dark sign-with-button">
                          <img src="./facebook.png" alt="Sign up with Facebook" style={{ width: '30px', height: '30px', marginRight: '3px' }} />
                          <div className='p-2 d-flex align-items-center justify-content-center flex-grow-1'>
                            Sign up with Facebook
                          </div>
                        </Button>
                        <Button href="/signup/artist" className="btn-dark sign-with-button">
                          <img src="./user.png" alt="Sign up as an Artist" style={{ width: '30px', height: '30px', marginRight: '3px', marginTop: '3px' }} />
                          <div className='p-2 d-flex align-items-center justify-content-center flex-grow-1'>
                            Sign up as Artist
                          </div>
                        </Button>
                        <span className='d-flex justify-content-center align-items-center'>
                          <div className='d-flex justify-content-center align-items-center'>
                            <div className='have-account'>
                              Dont have an account?
                            </div>
                            <Link to="/sign-up" className='p-2 pt-3' style={{ color: 'gray', width: 'auto' }}>Log in here.</Link>
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
      // <div className="App">
      //   <Outernavbar />
      //   <div className="auth-wrapper">
      //     <div className="auth-inner">
      //       <form onSubmit={this.onSubmit}>
      //         <div style={{ position: 'relative' }} className="heading-primary">
      //           <h3 style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, fontSize: '20px', lineHeight: '96px', display: 'inline-block', color: 'white', margin: '0 15px 0 5px' }}>Log in to</h3>
      //           <h4 style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, fontSize: '40px', display: 'inline-block', lineHeight: '96px', color: 'red', margin: '0px 0px 0 0px', textShadow: '1px 1px 0px #F3F3F3' }}>MIXIFY</h4>
      //         </div>
      //         <div className="mb-3" style={{ borderBottom: '1px solid #9D9797' }}>
      //           <input
      //             type="text"
      //             onChange={this.onChangeUserEmail}
      //             name="email"
      //             value={this.state.email}
      //             placeholder="Username or email"
      //             style={{ color: '#9D9797', display: 'inline-block', width: '100%', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #000' }}
      //           />
      //         </div>
      //         <div className="mb-3" style={{ borderBottom: '1px solid #9D9797' }}>
      //           <input
      //             type="password"
      //             onChange={this.onChangePassword}
      //             name="password"
      //             value={this.state.password}
      //             placeholder="Password"
      //             style={{ color: '#9D9797', display: 'inline-block', width: '100%', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #000' }}
      //           />
      //         </div>
      //         <div>
      //           <div className="custom-control custom-checkbox">
      //             <input
      //               type="checkbox"
      //               className="custom-control-input"
      //               id="customCheck1"
      //             />
      //             <label className="custom-control-label" htmlFor="customCheck1">
      //               <a href="/remember-me" style={{ color: 'gray', fontStyle: 'italic', textDecoration: 'none', fontSize: '16px', display: 'inline-block' }}>Remember me</a>
      //               <p className="forgot-password mb-0" style={{ fontStyle: 'italic', display: 'inline-block', textDecoration: 'none', marginBottom: '10px', marginLeft: '140px' }}>
      //                 <a href="/forgot-password" style={{ color: 'gray', textDecoration: 'none' }}>Forgot Password?</a>
      //               </p>
      //             </label>
      //           </div>
      //         </div>
      //         <div className="d-flex flex-column align-items-center">
      //           <div>
      //             <button type="submit" className="btn btn-dark" style={{ backgroundColor: '#3F0D06', fontFamily: 'Poppins', fontStyle: 'normal', borderRadius: '20px', marginLeft: '10px', padding: '5px 10px', fontSize: '16px', width: '125px', height: '40px' }}disabled={this.state.isButtonDisabled}>
      //               Log in
      //             </button>
      //           </div>
      //         </div>
      //         <div className="mt-3 text-center text-muted">
      //           <div className="line-breaker" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      //             <span className="line" style={{ flex: '1', height: '1px', backgroundColor: '#808080' }}></span>
      //             <span style={{ padding: '0 10px', color: '#808080', fontSize: '16px' }}>or</span>
      //             <span className="line" style={{ flex: '1', height: '1px', backgroundColor: '#808080' }}></span>
      //           </div>
      //         </div>
      //         <div className="row">
      //           <div className="col">
      //             <a href="/signup/google" className="btn btn-dark" style={{ width: '300px', height: '40px', borderRadius: '20px', marginBottom: '8px', marginLeft: '50px', display: 'flex', alignItems: 'center' }}>
      //               <img src="./google.png" alt="Sign up with Google" style={{ width: '30px', height: '30px', marginRight: '5px', marginTop: '3px' }} />
      //               <span style={{ marginLeft: '30px', color: '#fff', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '14px', fontWeight: 400 }}>Sign up with Google</span>
      //             </a>
      //           </div>
      //           <div className="col">
      //             <a href="/signup/facebook" className="btn btn-dark" style={{ width: '300px', height: '40px', borderRadius: '20px', marginBottom: '8px', marginLeft: '50px', display: 'flex', alignItems: 'center' }}>
      //               <img src="./facebook.png" alt="Sign up with Facebook" style={{ width: '30px', height: '30px', marginRight: '5px', marginTop: '3px' }} />
      //               <span style={{ marginLeft: '30px', color: '#fff', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '14px', fontWeight: 400 }}>Sign up with Facebook</span>
      //             </a>
      //           </div>
      //           <div className="col">
      //             <a href="/signup/artist" className="btn btn-dark" style={{ width: '300px', height: '40px', borderRadius: '20px', marginBottom: '8px', marginLeft: '50px', display: 'flex', alignItems: 'center' }}>
      //               <img src="./user.png" alt="Sign up as an Artist" style={{ width: '30px', height: '30px', marginRight: '5px', marginTop: '3px' }} />
      //               <span style={{ marginLeft: '30px', color: '#fff', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '14px', fontWeight: 400 }}>Sign up as an Artist</span>
      //             </a>
      //           </div>
      //         </div>
      //       </form>
      //       <p style={{ color: 'gray', textAlign: 'center', marginBottom: '9px', fontSize: '12px' }}>
      //         Don't have an account? <Link to="/sign-up" style={{ color: 'gray' }}>Create an account</Link>
      //       </p>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
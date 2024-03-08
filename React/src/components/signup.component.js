import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Form, Button, InputGroup, FormControl, Container, Row, Col, Stack } from 'react-bootstrap';
import Outernavbar from './outernavbar.component';

class SignUp extends Component {
  // componentDidMount() {
  //   // Set background image on body tag
  //   document.body.style.backgroundImage = `url(${bg})`;
  //   document.body.style.backgroundSize = '600px 650px';
  //   document.body.style.backgroundRepeat = 'no-repeat';
  // }

  // componentWillUnmount() {
  //   // Reset background image on body tag when component unmounts
  //   document.body.style.backgroundImage = 'none';
  //   document.body.style.backgroundSize = 'auto';
  // }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      isButtonDisabled: false,
      showTermsModal: false,
      agreedToTerms: false,
    };
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  onChangePasswordConfirmation = (e) => {
    this.setState({ password_confirmation: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (
      !this.state.username.trim() ||
      !this.state.email.trim() ||
      !this.state.password.trim() ||
      !this.state.password_confirmation.trim()
    ) {
      toast.error("Please fill in all fields");
      return; // Prevent form submission
    }

    if (!this.state.agreedToTerms) {
      toast.error("Please agree to the Terms and Conditions");
      return;
    }

    const userObject = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };

    const showToastMessage2 = () => {
      toast.success("Registration successful!", {
        autoClose: 3000
      });
    };

    axios
      .post('http://127.0.0.1:8080/api/auth/register', userObject) // change to docker
      .then((res) => {
        console.log(res);
        if (res.data.message === "User successfully registered") {
          showToastMessage2();// Display success notification
          window.location = "/sign-in";
        } else {
          this.setState({ isButtonDisabled: false });
        }
      })
      .catch((error) => {
        if (
          error.response.data === "{\"email\":[\"The email has already been taken.\"]}"
        ) {
          toast.error("Registration failed. Please try again");
          this.setState({ isButtonDisabled: false });
        }
        console.log(error)
      });

    this.setState({
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      isButtonDisabled: true,
    });
  };

  handleCloseTermsModal = () => {
    this.setState({ showTermsModal: false });
  };

  handleAgreeToTerms = () => {
    this.setState({ agreedToTerms: true, showTermsModal: false }, () => {
      // After setting the state, simulate a click event on the sign-up button
      document.getElementById('signupButton').click();
    });
  };

  handleCheckboxChange = (e) => {
    this.setState({ agreedToTerms: e.target.checked });
  };


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
                    <h3 className='p-1'>Sign up to</h3>
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
                        onChange={this.onChangeUsername}
                        name="username"
                        value={this.state.username}
                        placeholder="Username"
                        className='input'
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FormControl
                        type="text"
                        onChange={this.onChangeEmail}
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
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <FormControl
                        type="password"
                        onChange={this.onChangePasswordConfirmation}
                        name="confirmpassword"
                        value={this.state.password_confirmation}
                        placeholder="Confirm Password"
                        className='input'
                      />
                    </InputGroup>
                  </Form.Group>
                  <Row className='d-flex justify-content-center'>
                    <Form.Group className="mb-3">
                      <Form.Check className='d-flex'
                        type="checkbox"
                        label={
                          <div className='d-flex px-3'>
                            <p className='agree-to'>I agree to</p>
                            <p className='terms-and-conditions'>
                              Terms and Conditions
                            </p>
                          </div>
                        }
                      // checked={termsChecked}
                      // onChange={() => setTermsChecked(!termsChecked)}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="d-flex flex-column align-items-center">
                    <Col className='d-flex justify-content-center align-center mb-5'>
                      <Button id="signupButton" type="submit" size='lg' className="btn-dark sign-button" disabled={this.state.isButtonDisabled}>
                        Sign up
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
                              Already have an account?
                            </div>
                            <Link to="/sign-in" className='p-2 pt-3' style={{ color: 'gray', width:'auto' }}>Log in here.</Link>
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
      //       <div className="App">
      //         <Outernavbar />
      //         <div className="auth-wrapper">
      //           <div className="auth-inner">
      //             <form onSubmit={this.onSubmit}>
      //               <div style={{ position: 'relative', display: 'inline-block' }}>
      //                 <div style={{ position: 'relative', display: 'inline-block' }} className="heading-primary">
      //                   <h3 style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, fontSize: '20px', lineHeight: '96px', display: 'inline-block', color: 'white', margin: '0 15px 0 60px' }}>Sign up to</h3>
      //                   <h4 style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, fontSize: '40px', display: 'inline-block', lineHeight: '96px', color: 'red', margin: '0px 0px 0 0px', textShadow: '1px 1px 0px #F3F3F3' }}>MIXIFY</h4>
      //                 </div>
      //               </div>
      //               <ToastContainer />
      //               <div className="mb-3" style={{ borderBottom: '1px solid #9D9797' }}>
      //                 <input
      //                   type="text"
      //                   onChange={this.onChangeUsername}
      //                   name="username"
      //                   value={this.state.username}
      //                   placeholder="Username"
      //                   style={{ color: 'gray', display: 'inline-block', width: '100%', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, backgroundColor: 'transparent', margin: '0px 0px 0px 0px', border: 'none', borderBottom: '1px solid #000' }}
      //                 />
      //               </div>
      //               <div className="mb-3" style={{ borderBottom: '1px solid #9D9797' }}>
      //                 <input
      //                   type="text"
      //                   onChange={this.onChangeEmail}
      //                   name="email"
      //                   value={this.state.email}
      //                   placeholder="Email"
      //                   style={{ color: '#9D9797', display: 'inline-block', width: '100%', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #000' }}
      //                 />
      //               </div>
      //               <div className="mb-3" style={{ borderBottom: '1px solid #9D9797' }}>
      //                 <input
      //                   type="password"
      //                   onChange={this.onChangePassword}
      //                   name="password"
      //                   value={this.state.password}
      //                   placeholder="Password"
      //                   style={{ color: '#9D9797', display: 'inline-block', width: '100%', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #000' }}
      //                 />
      //               </div>
      //               <div className="mb-3" style={{ borderBottom: '1px solid #9D9797' }}>
      //                 <input
      //                   type="password"
      //                   onChange={this.onChangePasswordConfirmation}
      //                   name="confirmpassword"
      //                   value={this.state.password_confirmation}
      //                   placeholder="Confirm Password"
      //                   style={{ color: '#9D9797', display: 'inline-block', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #000' }}
      //                 />
      //               </div>
      //               <div className="form-check mb-3" style={{ paddingLeft: '20px' }}>
      //                 <input
      //                   className="form-check-input"
      //                   type="checkbox"
      //                   onChange={this.handleCheckboxChange}
      //                   id="termsCheckbox"
      //                   checked={this.state.agreedToTerms}
      //                   required
      //                 />
      //                 <label className="form-check-label" htmlFor="termsCheckbox">
      //                   I agree to the <span className="terms-link" onClick={() => this.setState({ showTermsModal: true })}>Terms and Conditions</span>
      //                 </label>
      //               </div>
      //               <div className="d-flex flex-column align-items-center">
      //                 <div>
      //                  <button id="signupButton" type="submit" className="btn btn-dark" style={{ backgroundColor: '#3F0D06', fontFamily: 'Poppins', fontStyle: 'normal', marginTop: '5px', marginBottom: '15px', borderRadius: '20px', marginLeft: '10px', padding: '5px 10px', fontSize: '16px', width: '125px', height: '40px' }} disabled={this.state.isButtonDisabled}>
      //   Sign up
      // </button>
      //                 </div>
      //                 <div className="mt-3 text-center text-muted">
      //                   {/* Ensure there is content or add a height to the line-breaker */}
      //                   <div className="line-breaker" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', height: '1px', width: '380px' }}>
      //                     <span className="line" style={{ flex: '1', height: '1px', border: '1px solid #808080', marginBottom: '30px', backgroundColor: '#808080' }}></span>
      //                     <span style={{ padding: '0 10px', color: '#A9A9A9', fontSize: '16px', marginBottom: '30px' }}>or</span>
      //                     <span className="line" style={{ flex: '1', height: '1px', border: '1px solid #808080', marginBottom: '30px', backgroundColor: '#808080' }}></span>
      //                   </div>
      //                 </div>
      //                 {this.createButton()} {/* Call the createButton function here */}
      //               </div>
      //             </form>
      //             <p style={{ color: 'gray', textAlign: 'center', marginBottom: '9px', fontSize: '12px' }}>
      //               Already have an account? <Link to="/sign-in" style={{ color: 'gray' }}>Log in here.</Link>
      //             </p>
      //           </div>
      //         </div>
      //         {/* Modal for terms and conditions */}
      //         <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showTermsModal ? 'block' : 'none' }}>
      //           <div className="modal-dialog" role="document">
      //             <div className="modal-content">
      //               <div className="modal-header">
      //                 <h5 className="modal-title">Terms and Conditions</h5>
      //                 <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleCloseTermsModal}>
      //                   <span aria-hidden="true">&times;</span>
      //                 </button>
      //               </div>
      //               <div className="modal-body">
      //                 {/* Your terms and conditions content here */}
      //                 <p>By signing up, you agree to our terms and conditions.</p>
      //               </div>
      //               <div className="modal-footer">
      //                 <button type="button" className="btn btn-primary" onClick={this.handleAgreeToTerms}>Agree</button>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
    );
  }
}

export default SignUp;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Outernavbar from './outernavbar.component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import bg from '../bg.png';


class SignUp extends Component {
  componentDidMount() {
    // Set background image on body tag
    document.body.style.backgroundImage = `url(${bg})`;
    document.body.style.backgroundSize = '600px 650px';
    document.body.style.backgroundRepeat = 'no-repeat';
  }

  componentWillUnmount() {
    // Reset background image on body tag when component unmounts
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundSize = 'auto';
  }

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
  
  createButton() {
    return (
      <div className="row">
        <div className="col">
          <a href="/signup/facebook" className="btn btn-dark" style={{ width: '300px', height: '40px', borderRadius: '20px', marginBottom: '8px', marginLeft: '50px', display: 'flex', alignItems: 'center' }}>
            <img src="./google.png" alt="Sign up with Facebook" style={{ width: '30px', height: '30px', marginRight: '3px' }} />
            <span style={{ marginLeft: '30px', color: '#fff', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '14px', fontWeight: 400 }}>Sign up with Google</span>
          </a>
        </div>
        <div className="col">
          <a href="/signup/facebook" className="btn btn-dark" style={{ width: '300px', height: '40px', borderRadius: '20px', marginBottom: '8px', marginLeft: '50px', display: 'flex', alignItems: 'center' }}>
            <img src="./facebook.png" alt="Sign up with Facebook" style={{ width: '30px', height: '30px', marginRight: '3px' }} />
            <span style={{ marginLeft: '30px', color: '#fff', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '14px', fontWeight: 400 }}>Sign up with Facebook</span>
          </a>
        </div>
        <div className="col">
          <a href="/signup/artist" className="btn btn-dark" style={{ width: '300px', height: '40px', borderRadius: '20px', marginBottom: '8px', marginLeft: '50px', display: 'flex', alignItems: 'center' }}>
            <img src="./user.png" alt="Sign up as an Artist" style={{ width: '30px', height: '30px', marginRight: '3px', marginTop: '3px' }} />
            <span style={{ marginLeft: '30px', color: '#fff', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '14px', fontWeight: 400 }}>Sign up as an Artist</span>
          </a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <Outernavbar />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.onSubmit}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ position: 'relative', display: 'inline-block' }} className="heading-primary">
                  <h3 style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, fontSize: '20px', lineHeight: '96px', display: 'inline-block', color: 'white', margin: '0 15px 0 60px' }}>Sign up to</h3>
                  <h4 style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, fontSize: '40px', display: 'inline-block', lineHeight: '96px', color: 'red', margin: '0px 0px 0 0px', textShadow: '1px 1px 0px #F3F3F3' }}>MIXIFY</h4>
                </div>
              </div>
              <ToastContainer />
              <div className="mb-3" style={{ borderBottom: '1px solid #9D9797' }}>
                <input
                  type="text"
                  onChange={this.onChangeUsername}
                  name="username"
                  value={this.state.username}
                  placeholder="Username"
                  style={{ color: 'gray', display: 'inline-block', width: '100%', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, backgroundColor: 'transparent', margin: '0px 0px 0px 0px', border: 'none', borderBottom: '1px solid #000' }}
                />
              </div>
              <div className="mb-3" style={{ borderBottom: '1px solid #9D9797' }}>
                <input
                  type="text"
                  onChange={this.onChangeEmail}
                  name="email"
                  value={this.state.email}
                  placeholder="Email"
                  style={{ color: '#9D9797', display: 'inline-block', width: '100%', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #000' }}
                />
              </div>
              <div className="mb-3" style={{ borderBottom: '1px solid #9D9797' }}>
                <input
                  type="password"
                  onChange={this.onChangePassword}
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  style={{ color: '#9D9797', display: 'inline-block', width: '100%', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #000' }}
                />
              </div>
              <div className="mb-3" style={{ borderBottom: '1px solid #9D9797' }}>
                <input
                  type="password"
                  onChange={this.onChangePasswordConfirmation}
                  name="confirmpassword"
                  value={this.state.password_confirmation}
                  placeholder="Confirm Password"
                  style={{ color: '#9D9797', display: 'inline-block', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 600, width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #000' }}
                />
              </div>
              <div className="form-check mb-3" style={{ paddingLeft: '20px' }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={this.handleCheckboxChange}
                  id="termsCheckbox"
                  checked={this.state.agreedToTerms}
                  required
                />
                <label className="form-check-label" htmlFor="termsCheckbox">
                  I agree to the <span className="terms-link" onClick={() => this.setState({ showTermsModal: true })}>Terms and Conditions</span>
                </label>
              </div>
              <div className="d-flex flex-column align-items-center">
                <div>
                 <button id="signupButton" type="submit" className="btn btn-dark" style={{ backgroundColor: '#3F0D06', fontFamily: 'Poppins', fontStyle: 'normal', marginTop: '5px', marginBottom: '15px', borderRadius: '20px', marginLeft: '10px', padding: '5px 10px', fontSize: '16px', width: '125px', height: '40px' }} disabled={this.state.isButtonDisabled}>
  Sign up
</button>
                </div>
                <div className="mt-3 text-center text-muted">
                  {/* Ensure there is content or add a height to the line-breaker */}
                  <div className="line-breaker" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', height: '1px', width: '380px' }}>
                    <span className="line" style={{ flex: '1', height: '1px', border: '1px solid #808080', marginBottom: '30px', backgroundColor: '#808080' }}></span>
                    <span style={{ padding: '0 10px', color: '#A9A9A9', fontSize: '16px', marginBottom: '30px' }}>or</span>
                    <span className="line" style={{ flex: '1', height: '1px', border: '1px solid #808080', marginBottom: '30px', backgroundColor: '#808080' }}></span>
                  </div>
                </div>
                {this.createButton()} {/* Call the createButton function here */}
              </div>
            </form>
            <p style={{ color: 'gray', textAlign: 'center', marginBottom: '9px', fontSize: '12px' }}>
              Already have an account? <Link to="/sign-in" style={{ color: 'gray' }}>Log in here.</Link>
            </p>
          </div>
        </div>

        {/* Modal for terms and conditions */}
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showTermsModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Terms and Conditions</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleCloseTermsModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Your terms and conditions content here */}
                <p>By signing up, you agree to our terms and conditions.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.handleAgreeToTerms}>Agree</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;

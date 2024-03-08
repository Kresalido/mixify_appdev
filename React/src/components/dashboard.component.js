import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import bg from '../bg.png';


export default class Dashboard extends Component {
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
    const udata = localStorage.getItem('user');
    const odata = JSON.parse(udata);
    let loggedIN = true;
    if (udata == null) {
      loggedIN = false;
    }
    this.state = {
      user: odata?.user || {},
      loggedIN
    };
  }

  handleLogout = () => {
    localStorage.removeItem('user');
    this.setState({ loggedIN: false });
  }

  render() {
    if (!this.state.loggedIN) {
      return <Navigate to="/sign-in" />;
    }
    return (
      <div className="dashboard-container">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <div className="heading-primary">
                <h3>Dashboard</h3>
              </div>
              <div className="mb-3">
              <h1 style={{ fontFamily: 'Kanit', fontStyle: 'normal', fontSize: '28px', fontWeight: 'bold', color: '#800000', textAlign:'center'}}>Welcome to your profile <span>{this.state.user.first_name}</span></h1>
              </div>
              <div className="mb-3" style={{ textAlign: 'center' }}>
                <button type="button" className="btn btn-dark" onClick={this.handleLogout}>Logout</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

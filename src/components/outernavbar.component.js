import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Outernavbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={'/home'}
                  style={{
                    marginLeft: '650px',
                    color: 'gray',
                    transition: 'color 0.3s',
                    textDecoration: 'none'
                  }}
                  
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.color = 'gray';
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={'/premium'}
                  style={{
                    marginLeft: '40px',
                    color: 'gray',
                    transition: 'color 0.3s',
                    textDecoration: 'none'
                  }}
                  
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.color = 'gray';
                  }}
                >
                  Premium
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={'/sign-up'}
                  style={{
                    marginLeft: '40px',
                    color: 'gray',
                    transition: 'color 0.3s',
                    textDecoration: 'none'
                  }}
                  
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.color = 'gray';
                  }}
                >
                  Sign up
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={'/sign-in'}
                  style={{
                    marginLeft: '40px',
                    color: 'gray',
                    transition: 'color 0.3s',
                    textDecoration: 'none'
                  }}
                 
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.color = 'gray';
                  }}
                >
                  Log in
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

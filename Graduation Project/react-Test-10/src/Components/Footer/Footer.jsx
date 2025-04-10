import React from 'react';
// import Styles from './Footer.module.css'
import logo from '../../assets/Images/logo-transparent.png'; // Import the image

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-3">
            <img src={logo} alt="logo" />
          </div>
          
          <div className="col-md-3 mb-3">
            <h5>Go to</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50">Home</a></li>
              <li><a href="#" className="text-white-50">Countries</a></li>
              <li><a href="#" className="text-white-50">Tours</a></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-3">
            <h5>Rating</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50">High rated</a></li>
              <li><a href="#" className="text-white-50">Best sellers</a></li>
              <li><a href="#" className="text-white-50">Economic prices</a></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-3">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50">########@gmail.com</a></li>
              <li><a href="#" className="text-white-50">+201010477410</a></li>
              <li><a href="#" className="text-white-50">Location</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-top pt-3 mt-3 text-center text-white-50">
          <p>© 2025 Company, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer
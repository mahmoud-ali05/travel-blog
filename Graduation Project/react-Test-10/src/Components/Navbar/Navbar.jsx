import React from 'react';
import Styles from './Navbar.module.css'
import logo from '../../assets/Images/logo-transparent.png'; // Import the image
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section className="container">
  <div className="row">
    <nav className={`navbar navbar-expand-lg navbar-light ${Styles.navi}`}>
      <div className="container">
        <Link to='/' className="navbar-brand logo_icon" >
          <img src={logo} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className={`${Styles['nav-link']} dropdown-toggle`}
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                COUNTRIES
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/Cairo">Cairo</Link></li>
                    <li><Link className="dropdown-item" to="/Paris">Paris</Link></li>
                    <li><Link className="dropdown-item" to="/Rome">Rome</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/TOURS" className={`${Styles['nav-link']} active`} aria-current="page">TOURS</Link>
            </li>
            <li className="nav-item">
              <Link to="/CONTACT" className={Styles['nav-link']}>CONTACT</Link> {/* Fixed here */}
            </li>
          </ul>
          <div className="d-flex">
            <button type="button" className="btn btn-light">Sign up</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</section>
  );
};

export default Navbar
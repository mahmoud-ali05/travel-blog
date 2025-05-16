import React from 'react';
import Styles from './Navbar.module.css'
import logo from '../../assets/Images/logo-transparent.png'; // Import the image
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`${Styles.navi} ${isHomePage ? Styles['home-nav'] : ''}`}>
      <div className={Styles.logo}>
        <Link to='/' className="navbar-brand logo_icon">
          <img src={logo} alt="Logo" />
        </Link>
        <Link to='/' className={Styles['nav-link']}>Home</Link>
      </div>
      <div className={Styles['center-links']}>
        <div className="nav-item dropdown">
          <Link
            to="#"
            className={`${Styles['nav-link']} dropdown-toggle`}
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            COUNTRIES
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="/Cairo">Cairo</Link></li>
            <li><Link className="dropdown-item" to="/Paris">Paris</Link></li>
            <li><Link className="dropdown-item" to="/Rome">Rome</Link></li>
            <li><Link className="dropdown-item" to="/Moscow">Moscow</Link></li>
            <li><Link className="dropdown-item" to="/Brazil">Brazil</Link></li>
            <li><Link className="dropdown-item" to="/Tokyo">Tokyo</Link></li>
            <li><Link className="dropdown-item" to="/Sydney">Sydney</Link></li>
            <li><Link className="dropdown-item" to="/US">US</Link></li>
          </ul>
        </div>
        <Link to="/Tours" className={Styles['nav-link']}>TOURS</Link>
        {(!user || user.role !== 'admin') && (
          <Link to="/contact" className={Styles['nav-link']}>CONTACT</Link>
        )}
      </div>
      <div>
        {!user ? (
          <>
            <Link to="/login" className="btn btn-light">Login</Link>
            <Link to="/register" className="btn btn-light">Sign up</Link>
          </>
        ) : user.role === 'admin' ? (
          <>
            <div className="dropdown d-inline-block">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="adminDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.username || 'Admin'}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="adminDropdown">
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                <li><Link className="dropdown-item" to="/admin">Admin Dashboard</Link></li>
              </ul>
            </div>
            <button onClick={handleLogout} className="btn btn-light ms-2">Logout</button>
          </>
        ) : (
          <>
            <Link to="/profile" className="btn btn-light me-2">Profile</Link>
            <button onClick={handleLogout} className="btn btn-light">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar
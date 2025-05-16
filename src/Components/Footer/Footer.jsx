import React from 'react';
import Styles from './Footer.module.css';
import logo from '../../assets/Images/logo-transparent.png';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <div className="container">
        <div className={`row ${Styles.footerContent}`}>
          <div className="col-md-4 mb-4">
            <img src={logo} alt="logo" className={Styles.logo} />
            <p className="text-white-50">Discover the world with us. Your journey begins here.</p>
            <div className={Styles.socialLinks}>
              <a href="#" className={Styles.socialIcon}><FaFacebook /></a>
              <a href="#" className={Styles.socialIcon}><FaTwitter /></a>
              <a href="#" className={Styles.socialIcon}><FaInstagram /></a>
              <a href="#" className={Styles.socialIcon}><FaLinkedin /></a>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <h5 className={Styles.footerTitle}>Quick Links</h5>
            <ul className={Styles.linkList}>
              <li className={Styles.linkItem}>
                <Link to="/" className={Styles.link}>Home</Link>
              </li>
              <li className={Styles.linkItem}>
                <Link to="/tours" className={Styles.link}>Tours</Link>
              </li>
              <li className={Styles.linkItem}>
                <Link to="/contact" className={Styles.link}>Contact</Link>
              </li>
              <li className={Styles.linkItem}>
                <Link to="/profile" className={Styles.link}>Profile</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-md-4 mb-4">
            <h5 className={Styles.footerTitle}>Contact Us</h5>
            <ul className={Styles.linkList}>
              <li className={Styles.contactItem}>
                <MdEmail className={Styles.contactIcon} />
                <a href="mailto:to_where@gmail.com" className={Styles.link}>to_where@gmail.com</a>
              </li>
              <li className={Styles.contactItem}>
                <MdPhone className={Styles.contactIcon} />
                <a href="tel:+201010477410" className={Styles.link}>+201010477410</a>
              </li>
              <li className={Styles.contactItem}>
                <MdLocationOn className={Styles.contactIcon} />
                <a href="https://maps.app.goo.gl/VmDGyhTSp6GpG9LHA" className={Styles.link}>Our Location</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={Styles.copyright}>
          <p>© 2025 To Where, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
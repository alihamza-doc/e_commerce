import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 my-5">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/" className="text-white text-decoration-none">Home</Link>
          <Link to="/about" className="text-white text-decoration-none">About</Link>
          <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

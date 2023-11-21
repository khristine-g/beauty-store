import React from 'react';
import '../Navbar.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  return (
    <div>
      <ul className="navbar">
      <li>
          <Link to="/">Home</Link>
          
        </li>
       
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
          
        </li>
        <li>
          <Link to="/cart">Cart</Link>
          
        </li>
        
      </ul>
    </div>
  );
}

export default Navbar;

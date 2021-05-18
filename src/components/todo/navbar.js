import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand style={{ paddingLeft: '1rem' }}>Home</Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
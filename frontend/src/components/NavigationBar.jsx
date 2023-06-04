import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavigationBar() {
  const handleSelect = (eventKey) => {
    console.log(eventKey);
  };

  return (
    <Navbar bg="success" variant="light" fixed="top">
      <Nav className="mx-auto" onSelect={handleSelect}>
        <Nav.Link eventKey="Inicio" style={{ color: 'white', textAlign: 'right' }}>Inicio</Nav.Link>
        <Nav.Link eventKey="Registrar información" style={{ color: 'white', textAlign: 'right' }}>Registrar información</Nav.Link>
        <Nav.Link eventKey="Gestión de productos" style={{ color: 'white', textAlign: 'right' }}>Gestión de productos</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;

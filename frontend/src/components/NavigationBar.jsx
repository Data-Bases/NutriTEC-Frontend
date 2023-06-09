import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "wouter";

const names = {
  Generals:["Inicio", "Entrar", "Unirse"],
  Client:["Inicio", "Registrar Info", "Productos", "Recetas", "Salir"],
  Nutri:["Inicio", "Planes", "Gestion de Productos", "Salir"],
  Admin:["Inicio", "Salir"]
}

const urls = {
  Generals:["/", "/login", "/signup"],
  Client:["/client", "/client/info", "/client/products", "/client/recipes", "/"],
  Nutri:["/nutricionist", "/nutricionist/plans", "/nutricionist/products", "/"],
  Admin:["/admin", "/"]
}

function NavigationBar() {
  const [location, setLocation] = useLocation();
  const getActual = () =>
  {
    switch (location.split("/")[1]) {
      case "client":
          return "Client";
      case "nutricionist":
          return "Nutri";
      case "admin":
        return "Admin";
      default:
          return "Generals";
    }
  }

  const actual = getActual();

  const handleSelect = (eventKey) => {
    // console.log(eventKey);
  };
  // console.log(actual);
  return (
    <Navbar bg="success" variant="light" fixed="top">
      <Nav className="mx-auto" onSelect={handleSelect}>
        {names[actual].map((item, index) => 
            <Link href={urls[actual][index]} key={index}>
            <Nav.Link eventKey={item} style={{ color: 'white', textAlign: 'right' }} key={item}>{item}</Nav.Link>
            </Link>
        )}
        
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;

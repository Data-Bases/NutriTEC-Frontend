import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from "wouter";

const names = {
  Generals:["Inicio", "Entrar", "Unirse"],
  Client:["Inicio", "Registrar Info", "Gestion de Productos"],
  Nutri:["Inicio", "Planes", "Gestion de Productos"]
}

const urls = {
  Generals:["/", "/login", "/signup"],
  Client:["Inicio", "Registrar Info", "Gestion de Productos"],
  Nutri:["Inicio", "Planes", "Gestion de Productos"]
}

function NavigationBar() {
  const [location, setLocation] = useLocation();
  const getActual = () =>
  {
    switch (location.split("/)")[0]) {
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
    console.log(eventKey);
  };
  console.log(actual);
  return (
    <Navbar bg="success" variant="light" fixed="top">
      <Nav className="mx-auto" onSelect={handleSelect}>
        <Link href={urls[actual][0]} >
        <Nav.Link eventKey={names[actual][0]} style={{ color: 'white', textAlign: 'right' }}>{names[actual][0]}</Nav.Link>
        </Link>
        <Link href={urls[actual][1]} >
        <Nav.Link eventKey={names[actual][1]} style={{ color: 'white', textAlign: 'right' }}>{names[actual][1]}</Nav.Link>
        </Link>
        <Link href={urls[actual][2]} >
        <Nav.Link eventKey={names[actual][2]} style={{ color: 'white', textAlign: 'right' }}>{names[actual][2]}</Nav.Link>
        </Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;

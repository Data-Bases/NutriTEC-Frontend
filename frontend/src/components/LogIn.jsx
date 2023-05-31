import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";
import { baseURL } from "./backendConection";
import axios from "axios";
import { useLocation, Link } from "wouter";
import "../styles/Custom.scss";
import "../styles/Credentials.scss";
import herbs from "../assets/herbs.jpg";

function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [location, navigate] = useLocation();

    const sendData = () => {
        axios
            .get(
                baseURL + `Employee/EmployeeLogIn/${user}?password=${password}`
            )
            .then(function (response) {
                // console.log("Enviado", response)
                if (response.data.id > 0) {
                    //Se almacena el token en el navegador
                    //   localStorage.setItem("userId", response.data.id);
                    //   navigate("/gestion/Información")
                } else {
                    alert("Usuario o contraseña incorrectos");
                }
            })
            .catch(function (error) {
                if (error.response) {
                    // GET response with a status code not in range 2xx
                    console.log("Error", error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    alert(
                        "El servidor no respondió correctamente, codigo de error: " +
                            error.response.status
                    );
                } else if (error.request) {
                    // no response
                    console.log(error.request);
                    alert("Error al conectar con el Servidor");
                    // instance of XMLHttpRequest in the browser
                    // instance ofhttp.ClientRequest in node.js
                } else {
                    // Something wrong in setting up the request
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    };

    return (
        <div className="credentials p-5 d-flex">
            <img src={herbs} className="credentials-bg" />
            <form className="text-light d-flex credentials-form">
                <input
                    type="email"
                    placeholder="Cédula"
                    onChange={(event) => setUser(event.target.value)}
                    className="credentials-input"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    onChange={(event) => setPassword(event.target.value)}
                    className="credentials-input"
                />
                <Button
                    type="submit"
                    variant="outline-secondary"
                    className="btn-general"
                >
                  Ingresar
                </Button>
                <Link href="/">
                    <Button variant="outline-secondary" className="btn-general">
                        Regresar
                    </Button>
                </Link>
            </form>
        </div>
    );
}

export default Login;

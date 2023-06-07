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
                baseURL +
                    `/credentials/LogIn?email=${encodeURI(
                        user
                    )}&password=${password}`
            )
            .then(function (response) {
                console.log("Enviado", response.data);
                localStorage.setItem("userId", response.data.id);
                localStorage.setItem("userType", response.data.userType);
                switch (response.data.userType) {
                    case "N":
                        navigate("/nutricionist");
                        break;
                    case "P":
                        navigate("/client");
                        break;
                    case "A":
                        navigate("/admin");
                        break;
                    default:
                        alert("Error: Unknown user type);");
                        return;
                }
            })
            .catch(function (error) {
                if (error.response.status == 401) {	
                    alert("Error, Credenciales Inválidas");
                }
                else if (error.response) {
                    alert(
                        "El servidor no respondió correctamente, codigo de error: " +
                            error.response.status
                    );
                }
                else if (error.request) {
                    // no response
                    console.log(error.request);
                    alert("Error al conectar con el Servidor");
                    // instance of XMLHttpRequest in the browser
                    // instance ofhttp.ClientRequest in node.js
                } else {
                    // Something wrong in setting up the request
                    console.log("Error", error.message);
                }
            });
    };

    return (
        <div className="credentials p-5 d-flex">
            <img src={herbs} className="credentials-bg" />
            <form className="text-light d-flex credentials-form">
                <input
                    type="email"
                    placeholder="Email"
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
                    onClick={sendData}
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

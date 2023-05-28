import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "./backendConection";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "wouter";
import "../styles/Custom.scss";
import "../styles/SignUp.scss";
import herbs from "../assets/herbs.jpg";

const screens = {
    N1: [
        "Nombre",
        "Apellido",
        "Cedula",
        "Foto",
        "Codigo Nutricionista",
        "Nacimiento",
        "Peso",
        "IMC",
        "Email",
        "Contraseña",
    ],

    N2: ["Tarjeta", "Tipo de Cobro", "Direccion"],
    C1: [
        "Nombre",
        "Apellido",
        "Cedula",
        "País",
        "Calorias Máximas",
        "Nacimiento",
        "Peso",
        "IMC",
        "Email",
        "Password",
    ],
    C2: ["Cuello (mm)", "Cintura (mm)", "Cadera (mm)", "% Músculo", "% Grasa"],
};

function SignUp(props) {
    const pantalla = props.pantalla;
    const [location, navigate] = useLocation();

    const createClient = (event) => {
        event.preventDefault();
        const obj = event.target;
        axios
            .post(baseURL + `Client/CreateClient`, {
                //Body
                id: obj.cedula.value,
                name: obj.nombre.value,
                lastName1: obj.ape1.value,
                lastName2: obj.ape2.value,
                province: obj.provincia.value,
                canton: obj.canton.value,
                district: obj.distrito.value,
                email: obj.email.value,
                password: obj.password.value,
                weight: obj.peso.value,
                imc: obj.imc.value,
                birthday: obj.fecha.value,
            })
            .then(function (response) {
                console.log(response.data);
                navigate("/login");
            })
            .catch(function (error) {
                alert("Los datos son incorrectos");
                if (error.response) {
                    // POST response with a status code not in range 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // no response
                    console.log(error.request);
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
        <div className="signup p-5 d-flex">
            <img src={herbs} className="signup-bg" />
            <form onSubmit={createClient} className="d-flex signup-form">
                {screens[pantalla].map((item) => (
                    <input
                        type={
                            item == "Nacimiento"
                                ? "date"
                                : item == "Foto"
                                ? "file"
                                : item == "Contraseña"
                                ? "password"
                                : "text"
                        }
                        placeholder={item}
                        key={item}
                        id={item}
                        className="signup-input"
                    />
                ))}
                <Button type="submit" variant="outline-secondary">Registrarse</Button>
                <Link href="/">
                    <Button variant="outline-secondary">Regresar</Button>
                </Link>
            </form>
        </div>
    );
}

export default SignUp;

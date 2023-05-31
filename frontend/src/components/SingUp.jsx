import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "./backendConection";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "wouter";
import "../styles/Custom.scss";
import "../styles/Credentials.scss";
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
        <div className="credentials p-5 d-flex">
            <img src={herbs} className="credentials-bg" />
            <form onSubmit={createClient} className="d-flex credentials-form">
                {screens[pantalla].map((item) => (
                    <div className="credentials-input">
                        <label htmlFor={item}> {item} </label>
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
                            className=""
                        />
                    </div>
                ))}
                {pantalla.includes("1") ? (
                    <Link
                        href={
                            pantalla == "C1"
                                ? "/signup/cliente-2"
                                : "/signup/nutricionista-2"
                        }
                    >
                        <Button
                            variant="outline-secondary"
                            className="btn-general"
                        >
                            Siguiente
                        </Button>
                    </Link>
                ) : (
                    <Button
                        type="submit"
                        variant="outline-secondary"
                        className="btn-general"
                    >
                        Registrarse
                    </Button>
                )}
                <Link
                    href={
                        pantalla.includes("1")
                            ? "/signup/"
                            : pantalla == "C2"
                            ? "/signup/cliente-1"
                            : "/signup/nutricionista-1"
                    }
                >
                    <Button variant="outline-secondary" className="btn-general">
                        Regresar
                    </Button>
                </Link>
            </form>
        </div>
    );
}

export default SignUp;

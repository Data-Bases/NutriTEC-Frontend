import React, { useState, useEffect } from "react";
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
        "Apellidos",
        "Cedula",
        "Foto",
        "Codigo Nutricionista",
        "Nacimiento",
        "Peso",
        "IMC",
        "Email",
        "Contraseña",
    ],

    N2: ["Tarjeta", "Tipo de Cobro", "Provincia", "Canton", "Distrito"],
    C1: [
        "Nombre",
        "Apellidos",
        "Cedula",
        "Pais",
        "Calorias Máximas",
        "Nacimiento",
        "Peso",
        "IMC",
        "Email",
        "Contraseña",
    ],
    C2: ["Cuello (mm)", "Cintura (mm)", "Cadera (mm)", "% Músculo", "% Grasa"],
};

const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            // console.log(reader.result.split(",")[1]);
            resolve(reader.result.split(",")[1]);
            // "data:image/jpg;base64,    =sdCXDSAsadsadsa"
        };
    });
};

function SignUp(props) {
    const pantalla = props.pantalla;
    const [location, navigate] = useLocation();
    const [datos, setDatos] = useState({
        Nombre: null,
        Apellidos: null,
        Cedula: null,
        Pais: null,
        Foto: null,
        FotoEncoded: null,
        "Calorias Máximas": null,
        "Codigo Nutricionista": null,
        Nacimiento: null,
        Peso: null,
        IMC: null,
        Email: null,
        Contraseña: null,
        Tarjeta: null,
        "Tipo de Cobro": null,
        Provincia: null,
        Canton: null,
        Distrito: null,
        "Cuello (mm)": null,
        "Cintura (mm)": null,
        "Cadera (mm)": null,
        "% Músculo": null,
        "% Grasa": null,
    });

    const refs = {
        Nombre: React.createRef(),
        Apellidos: React.createRef(),
        Cedula: React.createRef(),
        Pais: React.createRef(),
        Foto: React.createRef(),
        "Calorias Máximas": React.createRef(),
        "Codigo Nutricionista": React.createRef(),
        Nacimiento: React.createRef(),
        Peso: React.createRef(),
        IMC: React.createRef(),
        Email: React.createRef(),
        Contraseña: React.createRef(),
        Tarjeta: React.createRef(),
        "Tipo de Cobro": React.createRef(),
        Provincia: null,
        Canton: null,
        Distrito: null,
        "Cuello (mm)": React.createRef(),
        "Cintura (mm)": React.createRef(),
        "Cadera (mm)": React.createRef(),
        "% Músculo": React.createRef(),
        "% Grasa": React.createRef(),
    };

    const createUser = () => {
        let apellido1 = datos.Apellidos.split(" ")[0];
        let apellido2 = datos.Apellidos.split(" ")[1];
        // console.log(apellido1, apellido2);
        // console.log(datos.FotoEncoded);
        if (pantalla == "N2") {
            const body = {
                email: datos.Email,
                password: datos.Contraseña,
                name: datos.Nombre,
                lastname1: apellido1,
                lastname2: apellido2 ? apellido2 : "",
                birthdate: datos.Nacimiento,
                weight: datos.Peso,
                imc: datos.IMC,
                nutritionistcode: datos["Codigo Nutricionista"],
                cardnumber: datos.Tarjeta,
                province: datos.Provincia,
                canton: datos.Canton,
                district: datos.Distrito,
                picture: datos.FotoEncoded,
                adminid: 1,
                chargetypeid: 1,
            };

            console.log(body);

            axios
                .post(baseURL + `/nutritionist/NutritionistSignUp`, body)
                .then(function (response) {
                    console.log("Enviado", response.data);
                    navigate("/login");
                })
                .catch(function (error) {
                    if (error.response.status == 401) {
                        alert("Error, Credenciales Inválidas");
                    } else if (error.response) {
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
                });
        } else if (pantalla == "C2") {
            let apellido1 = datos.Apellidos.split(" ")[0];
            let apellido2 = datos.Apellidos.split(" ")[1];
            const body = {
                nutriid: 0,
                email: datos.Email,
                name: datos.Nombre,
                lastname1: apellido1,
                lastname2: apellido2,
                birthdate: datos.Nacimiento,
                password: datos.Contraseña,
                country: datos.Pais,
                caloriesintake: datos["Calorias Máximas"]
            };

            console.log(body);

            axios
                .post(baseURL + `/nutritec/patient/PatientSignUp`, body)
                .then(function (response) {
                    console.log("Enviado", response.data);
                    navigate("/login");
                })
                .catch(function (error) {
                    if (error.response.status == 401) {
                        alert("Error, Credenciales Inválidas");
                    } else if (error.response) {
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
                });
        }
    };
    // console.log(datos["Foto"] ? datos["Foto"] : "Null");

    return (
        <div className="credentials p-5 d-flex">
            <img src={herbs} className="credentials-bg" />
            <form className="d-flex credentials-form">
                {screens[pantalla].map((item) => (
                    <div className="credentials-input" key={item + "div"}>
                        <label htmlFor={item} key={item + "label"}>
                            {" "}
                            {item}{" "}
                        </label>
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
                            onChange={(event) => {
                                // event.preventDefault();
                                if (item == "Foto") {
                                    datos[item] = event.target.files[0];
                                    blobToBase64(event.target.files[0]).then(
                                        (result) => {
                                            datos["FotoEncoded"] = result;
                                        }
                                    );
                                } else {
                                    datos[item] = event.target.value;
                                }
                                setDatos(datos);
                            }}
                            placeholder={item}
                            key={item}
                            id={item}
                            ref={refs[item]}
                            className=""
                            defaultValue={
                                item == "Foto"
                                    ? ""
                                    : datos[item]
                                    ? datos[item]
                                    : ""
                            }
                        />
                    </div>
                ))}
                {pantalla.includes("1") ? (
                    <Link
                        key="2"
                        href={pantalla == "C1" ? "/signup/C2" : "/signup/N2"}
                    >
                        <Button
                            variant="outline-secondary"
                            className="btn-general"
                            key="btnSig"
                        >
                            Siguiente
                        </Button>
                    </Link>
                ) : (
                    <Button
                        variant="outline-secondary"
                        className="btn-general"
                        key="btnSign"
                        onClick={createUser}
                    >
                        Registrarse
                    </Button>
                )}
                <Link
                    key="1"
                    href={
                        pantalla.includes("1")
                            ? "/signup/"
                            : pantalla == "C2"
                            ? "/signup/C1"
                            : "/signup/N1"
                    }
                >
                    <Button
                        variant="outline-secondary"
                        className="btn-general"
                        key="btnReg"
                        onMouseEnter={() => console.log(datos)}
                    >
                        Regresar
                    </Button>
                </Link>
            </form>
        </div>
    );
}

export default SignUp;

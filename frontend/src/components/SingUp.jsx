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

    N2: ["Tarjeta", "Tipo de Cobro", "Direccion"],
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
    Direccion: React.createRef(),
    "Cuello (mm)": React.createRef(),
    "Cintura (mm)": React.createRef(),
    "Cadera (mm)": React.createRef(),
    "% Músculo": React.createRef(),
    "% Grasa": React.createRef()
}

const blobToBase64 = (blob) => {
    return new Promise( (resolve, reject) =>{
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            console.log(reader.result.split(',')[1]);
            resolve(reader.result.split(',')[1]);
            // "data:image/jpg;base64,    =sdCXDSAsadsadsa"
        };
    });
};

function SignUp(props) {
    const pantalla = props.pantalla;
    const [location, navigate] = useLocation();
    const [datos, setDatos] = useState();

    console.log(refs["Foto"].current ? blobToBase64(refs["Foto"].current.files[0]) : "Null")

    const createClient = (event) => {
        event.preventDefault();
        const obj = event.target;
        console.log(obj);
        // axios
        //     .post(baseURL + `Client/CreateClient`, {
        //         //Body
                
        //         "email": "ramsensei@estudiantec.cr",
        //         "password": "dario1234",
        //         "name": "Ramsés",
        //         "lastname1": "Gutiérrez",
        //         "lastname2": "Rodríguez",
        //         "age": 20,
        //         "birthdate": "2003-08-04T04:55:19.171Z",
        //         "weight": 10,
        //         "imc": 20,
        //         "nutritionistcode": 123456,
        //         "cardnumber": 125426,
        //         "province": "San José",
        //         "canton": "Perez Zeledon",
        //         "district": "San Isidro de El General",
        //         "picture": "g;hg;gojojgohfkgirhrghirh",
        //         "adminid": 2,
        //         "chargetypeid": 1

        //     })
        //     .then(function (response) {
        //         console.log(response.data);
        //         navigate("/login");
        //     })
        //     .catch(function (error) {
        //         alert("Los datos son incorrectos");
        //         if (error.response) {
        //             // POST response with a status code not in range 2xx
        //             console.log(error.response.data);
        //             console.log(error.response.status);
        //             console.log(error.response.headers);
        //         } else if (error.request) {
        //             // no response
        //             console.log(error.request);
        //             // instance of XMLHttpRequest in the browser
        //             // instance ofhttp.ClientRequest in node.js
        //         } else {
        //             // Something wrong in setting up the request
        //             console.log("Error", error.message);
        //         }
        //         console.log(error.config);
        //     });
    };
    return (
        <div className="credentials p-5 d-flex">
            <img src={herbs} className="credentials-bg" />
            <form onSubmit={createClient} className="d-flex credentials-form">
                {screens[pantalla].map((item) => (
                    <div className="credentials-input" key={item+"div"}>
                        <label htmlFor={item} key={item+"label"}> {item} </label>
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
                            ref={refs[item]}
                            className=""
                        />
                    </div>
                ))}
                {pantalla.includes("1") ? (
                    <Link
                    key="2"
                        href={
                            pantalla == "C1"
                                ? "/signup/C2"
                                : "/signup/N2"
                        }
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
                        type="submit"
                        variant="outline-secondary"
                        className="btn-general"
                        key="btnSign"
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
                    <Button variant="outline-secondary" className="btn-general" key="btnReg">
                        Regresar
                    </Button>
                </Link>
            </form>
        </div>
    );
}

export default SignUp;

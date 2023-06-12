import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "./backendConection";
import { Button, Dropdown, Form } from "react-bootstrap";

function NutriClients() {
    const [clients, setClients] = useState(null);
    const [client, setClient] = useState(null);
    const [actualClients, setActualClients] = useState(null);
    const [updClients, setUpdClients] = useState(false);

    useEffect(() => {
        setClient(null);
        axios
            .get(baseURL + `/nutritionist/GetAvailablePatients`)
            .then(function (response) {
                // console.log(response.data);
                setClients(response.data);
            })
            .catch(function (error) {
                if (error.response) {
                    // GET response with a status code not in range 2xx
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

        axios
            .get(
                baseURL +
                    `/nutritionist/GetPatientsByNutriId?nutriId=${localStorage.getItem(
                        "userId"
                    )}`
            )
            .then(function (response) {
                // console.log(response.data);
                setActualClients(response.data);
            })
            .catch(function (error) {
                if (error.response) {
                    // GET response with a status code not in range 2xx
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
    }, [updClients]);

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            &#x25bc;
        </a>
    ));

    const handleAsignar = () => {
        if (client != null) {
            axios
                .put(
                    baseURL +
                        `/patient/AsignPatientToNutri?patientId=${
                            client.id
                        }&nutriId=${localStorage.getItem("userId")}`
                )
                .then(function (response) {
                    console.log(response.data);
                    setUpdClients(!updClients);
                })
                .catch(function (error) {
                    if (error.response) {
                        // GET response with a status code not in range 2xx
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
        }
    };

    const CustomMenu = React.forwardRef(
        ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
            const [value, setValue] = useState("");

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <Form.Control
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Type to filter..."
                        onChange={(e) => setValue(e.target.value.toLowerCase())}
                        value={value}
                    />
                    <ul className="list-unstyled">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value ||
                                child.props.children
                                    .toLowerCase()
                                    .startsWith(value)
                        )}
                    </ul>
                </div>
            );
        }
    );
    return (
        <div
            className="d-flex"
            style={{
                flexDirection: "row",
                width: "95vw",
                justifyContent: "space-evenly",
            }}
        >
            <div
                style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <h2>Clientes Actuales</h2>
                {actualClients && actualClients.map((cln, i) => (
                    <h5 key={i}>{cln.name}</h5>
                ))}
            </div>
            <div
                className="d-flex"
                style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Dropdown>
                    <Dropdown.Toggle
                        as={CustomToggle}
                        id="dropdown-custom-components"
                    >
                        {client ? client.name : "Clientes Disponibles"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        {clients &&
                            clients.map((cln, index) => (
                                <Dropdown.Item
                                    key={index}
                                    onClick={() => setClient(cln)}
                                >
                                    {cln.name}
                                </Dropdown.Item>
                            ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Button style={{alignSelf: "center"}} onClick={handleAsignar}>Asignar</Button>
            </div>
        </div>
    );
}

export default NutriClients;

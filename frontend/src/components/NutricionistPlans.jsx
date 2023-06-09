import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { baseURL, UpdateContext } from "./backendConection";
import { Button, Dropdown, Form } from "react-bootstrap";
import Plans from "./Plans";
import "../styles/Custom.scss";

function NutricionistPlans() {
    const [dayFilter, setDayFilter] = useState(
        new Date(Date.now()).toISOString()
    );
    const [plan, setPlan] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [planes, setPlanes] = useState(null);
    const [clientes, setClientes] = useState(null);
    const [showedPlan, setShowedPlan] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    // console.log(planes);
    useEffect(() => {
        // console.log ("ID", localStorage.getItem("userId"));
        axios
            .get(
                baseURL +
                    `/nutritionist/GetPatientsByNutriId?nutriId=${localStorage.getItem(
                        "userId"
                    )}`
            )
            .then(function (response) {
                console.log(response.data);
                setClientes(response.data);
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
                    `/nutritionist/GetNutritionistPlans?nutriId=${localStorage.getItem(
                        "userId"
                    )}`
            )
            .then(function (response) {
                console.log(response.data);
                setPlanes(response.data);
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
    }, []);

    useEffect(() => {
        if (plan != null) {
            axios
                .get(baseURL + `/plan/GetPlanById/${plan.id}`)
                .then(function (response) {
                    setShowedPlan(response.data);
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
        } else if (cliente != null) {
            const d = new Date(dayFilter);
            const Nday = d.getDay();
            d.setDate(d.getDate() - Nday);
            console.log(
                localStorage.getItem("userId"),
                d.toISOString().substring(0, 10)
            );
            axios
                .get(
                    baseURL +
                        `/plan/GetPlanByPatientId?patientId=${
                            cliente.id
                        }&initialDate=${d.toISOString().substring(0, 10)}`
                )
                .then(function (response) {
                    setShowedPlan(response.data);
                    setPlan({
                        id: null,
                        name: response.data.name
                            ? response.data.name
                            : "No Tiene Plan",
                    });
                    // setPlan(response.data);
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
    }, [cliente, plan]);

    const assingPlanToClient = (client) => {
        axios
            .post(
                baseURL + `/patient/AddPlanToPatient`,
                {
                    //Body
                    title: "Title",
                    description: "Description",
                },
                {
                    headers: {
                        "x-access-token": "token-value",
                    },
                }
            )
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
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

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="btn-general"
            style={{
                marginTop: "20px",
            }}
        >
            {children}
            &#x25bc;
        </a>
    ));

    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
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
                        placeholder="Buscar"
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
        <>
            <div
                className="d-flex"
                style={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="Planes">
                        {plan ? plan.name : "Planes"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        {planes
                            ? planes.map((pln) => (
                                  <Dropdown.Item
                                      key={pln.id}
                                      onClick={() => {
                                          setPlan(pln);
                                          setCliente(null);
                                      }}
                                  >
                                      {pln.name}
                                  </Dropdown.Item>
                              ))
                            : ""}
                    </Dropdown.Menu>
                </Dropdown>
                {plan && plan.id ? (
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} id="Clientes">
                            Asignar a...
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                            {clientes
                                ? clientes.map((cln) => (
                                      <Dropdown.Item
                                          key={cln.id}
                                          onClick={() => {
                                              assingPlanToClient(cln);
                                          }}
                                      >
                                          {cln.name}
                                      </Dropdown.Item>
                                  ))
                                : ""}
                        </Dropdown.Menu>
                    </Dropdown>
                ) : null}
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="Clientes">
                        {cliente ? cliente.name : "Clientes"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        {clientes
                            ? clientes.map((cln) => (
                                  <Dropdown.Item
                                      key={cln.id}
                                      onClick={() => {
                                          setCliente(cln);
                                          setPlan(null);
                                      }}
                                  >
                                      {cln.name}
                                  </Dropdown.Item>
                              ))
                            : ""}
                    </Dropdown.Menu>
                </Dropdown>
                {cliente ? (
                    <Button className="btn-general">Evaluar Comidas</Button>
                ) : null}
            </div>
            <Plans
                plan={showedPlan}
                setDate={setDayFilter}
                setSelected={selectedProduct}
            />
        </>
    );
}

export default NutricionistPlans;

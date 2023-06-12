import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { baseURL, UpdateContext } from "./backendConection";
import { Button, Dropdown, Form, Modal, DropdownButton } from "react-bootstrap";
import Plans from "./Plans";
import "../styles/Custom.scss";

const nombreBusquedaSegunFecha = (fecha) =>
    [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ][new Date(fecha).getDay()];

function NutricionistPlans() {
    const [dayFilter, setDayFilter] = useState(
        new Date(Date.now()).toISOString()
    );
    const [selectedFood, setSelectedFood] = useState("Breakfast");
    const [plan, setPlan] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [planes, setPlanes] = useState(null);
    const [clientes, setClientes] = useState(null);
    const [showedPlan, setShowedPlan] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [show, setShow] = useState(false);
    const [showCalificar, setShowCalificar] = useState(false);
    const [consumtion, setConsumtion] = useState(null);
    const [comment, setComment] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        axios
            .get(
                baseURL +
                    `/patient/GetDailyConsumptionByPatient?patientId=${cliente.id}&dateConsumed=${dayFilter}`
            )
            .then(function (response) {
                // console.log("GET", response.data);

                setConsumtion(response.data);
                setShow(true);
            })
            .catch(function (error) {
                if (error.response) {
                    // GET response with a status code not in range 2xx
                    if (error.response.status == 404) {
                        setConsumtion(null);
                        alert("No hay consumo");
                    }
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
                // console.log(response.data);
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
                // console.log(response.data);
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
        // console.log(dayFilter);
        if (plan != null && plan.id != null) {
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
        }
    }, [plan]);
    useEffect(() => {
        if (cliente != null) {
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
                    // console.log(response.data);
                    setShowedPlan(response.data);
                    setPlan({
                        id: null,
                        name: response.data.planName
                            ? response.data.planName
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
    }, [cliente, dayFilter]);

    const handleDropdownFood = (aliemento) => {
        setSelectedFood(aliemento);
    };

    const assingPlanToClient = (client) => {
        const d = new Date(dayFilter);
        const Nday = d.getDay();
        d.setDate(d.getDate() - Nday);
        const body = {
            planId: plan.id,
            patientId: client.id,
            initialDate: d.toISOString().substring(0, 10),
        };
        console.log(body);
        axios
            .post(baseURL + `/patient/AddPlanToPatient`, body)
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

    const getConsumo = () => {
        let productosDesayuno;
        // console.log(consumtion);
        consumtion.meals.map((time) => {
            // console.log(meal);

            // console.log(time);
            if (time.mealtime == selectedFood) {
                productosDesayuno = [...time.products, ...time.recipes];
                return productosDesayuno;
            }
        });
        return productosDesayuno;
    };

    const handleComentar = () => {
        const body = {
            patientId: cliente.id,
            nutritionistId: localStorage.getItem("userId"),
            date: dayFilter,
            meal: selectedFood,
            commentText: comment,
        };
        axios
            .post(baseURL + `/forum/CreateComment`, body)
            .then(function (response) {
                console.log(response.data);
                alert("Comentado")
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
                <Modal
                    show={showCalificar}
                    onHide={() => setShowCalificar(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Comentar Consumo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="ForumComment"
                            >
                                <Form.Label>Comentario</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowCalificar(false)}
                        >
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleComentar}>
                            Enviar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Consumo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex">
                            <DropdownButton
                                className="d-flex"
                                style={{
                                    justifyContent: "start",
                                    marginBottom: "10px",
                                }}
                                title={selectedFood}
                                onSelect={handleDropdownFood}
                            >
                                <Dropdown.Item eventKey="Breakfast">
                                    {" "}
                                    Desayuno{" "}
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Lunch">
                                    {" "}
                                    Almuerzo{" "}
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Dinner">
                                    {" "}
                                    Cena{" "}
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Snack">
                                    {" "}
                                    Snack{" "}
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                        {consumtion &&
                            getConsumo().map((producto, i) => (
                                <div key={i} id={i}>
                                    <h5>
                                        {producto.name}-{producto.servings}
                                    </h5>
                                </div>
                            ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                setShowCalificar(true);
                            }}
                        >
                            Comentar
                        </Button>
                    </Modal.Footer>
                </Modal>
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
                    <Button className="btn-general" onClick={handleShow}>
                        Evaluar Comidas
                    </Button>
                ) : null}
            </div>
            <Plans
                plan={showedPlan}
                setDate={setDayFilter}
                setSelected={setSelectedProduct}
            />
        </>
    );
}

export default NutricionistPlans;

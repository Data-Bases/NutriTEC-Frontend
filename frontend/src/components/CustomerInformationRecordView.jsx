import React, { useState } from "react";
import {
    Container,
    Form,
    Button,
    Dropdown,
    DropdownButton,
    Modal
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
import { baseURL } from "./backendConection";
import jsPDF from "jspdf";

import RecipeProductList from "./RecipeProductList";

function CustomerInformationRecordView({ productos, recetas, setRecipes }) {
    const [selectedFood, setSelectedFood] = useState("Breakfast");
    const [foodEated, setFoodEated] = useState({
        identificador: null,
        productos: [],
    });
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().substring(0, 10)
    );
    const [initDate, setInitDate] = useState("1990-01-01");
    const [endDate, setEndDate] = useState(
        new Date().toISOString().substring(0, 10)
    );
    const [comments, setComments] = useState(null);

    const [cuello, setCuello] = useState("");
    const [cintura, setCintura] = useState("");
    const [cadera, setCadera] = useState("");
    const [musculo, setMusculo] = useState("");
    const [grasa, setGrasa] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDropdownFood = (aliemento) => {
        setSelectedFood(aliemento);
    };

    const handleButtonRegistrarComida = () => {
        // Hace un post de esto
        foodEated.productos.map((product) => {
            const body = {
                productId: product.identificador,
                patientId: localStorage.getItem("userId"),
                mealtime: selectedFood,
                consumedate: selectedDate,
                servings: product.gramos,
            };
            console.log(body);
            axios
                .post(baseURL + `/patient/AddProductToPatient`, body)
                .then(function (response) {})
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
        });
        alert("Comida Registrada");
        setFoodEated({
            identificador: null,
            productos: [],
        });
    };
    const handleViewComments = () => {
        console.log(`/forum/GetFilteredComments?patientId=${localStorage.getItem(
            "userId"
        )}&dateTime=${selectedDate}&meal=${selectedFood}`);
        axios
            .get(
                baseURL +
                    `/forum/GetFilteredComments?patientId=${localStorage.getItem(
                        "userId"
                    )}&dateTime=${selectedDate}&meal=${selectedFood}`
            )
            .then(function (response) {
                console.log("comments", response.data);
                setComments(response.data);
                handleShow();
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
    };
    const handleButtonRegistrarMedidas = () => {
        setCuello("");
        setCintura("");
        setCadera("");
        setMusculo("");
        setGrasa("");

        // Hace un post de esto
        axios
            .post(
                baseURL +
                    `/patient/RegisterPatientMeasurements?patientId=${localStorage.getItem(
                        "userId"
                    )}`,
                {
                    height: 0,
                    fatpercentage: grasa,
                    musclepercentage: musculo,
                    weight: 0,
                    waist: cintura,
                    neck: cuello,
                    hips: cadera,
                    revisiondate: selectedDate,
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

    const handleDateChange = (date) => {
        setSelectedDate(date.target.value);
        console.log(date);

        // console.log(date.toLocaleDateString());
    };

    const handleButtonGenerarReporte = () => {
        // Hace un get? de esto
        console.log("Reporte");
        axios
            .get(
                baseURL +
                    `/patient/GetPatientMeasurementsByDate?patientId=${localStorage.getItem(
                        "userId"
                    )}&startDate=${initDate}&finishDate=${endDate}`
            )
            .then(function (response) {
                console.log(response.data);
                const report = new jsPDF();
                let yCoords = 10;
                response.data.map((e) => {
                    Object.keys(e).map((k) => {
                        report.text(k + ":" + e[k].toString(), 10, yCoords);
                        yCoords += 10;
                    });
                    report.text(
                        "-----------------------------------------",
                        10,
                        yCoords
                    );
                    yCoords += 10;
                    if (yCoords >= 240) {
                        report.addPage();
                        yCoords = 10;
                    }
                });
                report.save("report.pdf");
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
    };

    return (
        <>
            <Container
                className="d-flex"
                style={{
                    justifyContent: "space-between",
                    backgroundColor: "lightgray",
                    borderRadius: "10px",
                    padding: "20px",
                }}
            >
                <div>
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
                        <Dropdown.Item eventKey="Dinner"> Cena </Dropdown.Item>
                        <Dropdown.Item eventKey="Snack"> Snack </Dropdown.Item>
                    </DropdownButton>

                    <RecipeProductList
                        productos={[...productos, ...recetas]}
                        receta={foodEated}
                        setRecipes={setRecipes}
                    ></RecipeProductList>
                </div>

                <div className="d-flex" style={{ alignItems: "end" }}>
                    <p style={{ fontWeight: "bold" }}> Fecha: </p>

                    <div>
                        <input
                            type="date"
                            className="form-control"
                            defaultValue={selectedDate}
                            onChange={handleDateChange}
                        ></input>
                    </div>

                    <Button
                        style={{ marginLeft: "10px" }}
                        onClick={handleButtonRegistrarComida}
                    >
                        {" "}
                        Registrar Comida{" "}
                    </Button>
                </div>
            </Container>

            <hr />

            <Container
                style={{
                    backgroundColor: "lightgray",
                    borderRadius: "10px",
                    padding: "20px",
                }}
            >
                <div
                    className="d-flex"
                    style={{ justifyContent: "space-around" }}
                >
                    <Form.Control
                        placeholder="Cuello (mm)"
                        value={cuello}
                        onChange={(e) => setCuello(e.target.value)}
                    />
                    <Form.Control
                        style={{ marginLeft: "20px" }}
                        placeholder="Cintura (mm)"
                        value={cintura}
                        onChange={(e) => setCintura(e.target.value)}
                    />
                    <Form.Control
                        style={{ marginLeft: "20px" }}
                        placeholder="Cadera (mm)"
                        value={cadera}
                        onChange={(e) => setCadera(e.target.value)}
                    />
                    <Form.Control
                        style={{ marginLeft: "20px" }}
                        placeholder="% Musculo"
                        value={musculo}
                        onChange={(e) => setMusculo(e.target.value)}
                    />
                    <Form.Control
                        style={{ marginLeft: "20px" }}
                        placeholder="% Grasa"
                        value={grasa}
                        onChange={(e) => setGrasa(e.target.value)}
                    />
                </div>

                <div
                    className="d-flex"
                    style={{
                        justifyContent: "end",
                        marginTop: "20px",
                        alignItems: "center",
                    }}
                >
                    <label htmlFor="idate"> Fecha Inicial: </label>
                    <input
                        type="date"
                        id="idate"
                        defaultValue={initDate}
                        style={{
                            width: "150px",
                        }}
                        onChange={(e) => setInitDate(e.target.value)}
                    />
                    <label htmlFor="edate"> Fecha Final: </label>
                    <input
                        type="date"
                        id="edate"
                        style={{
                            width: "150px",
                        }}
                        defaultValue={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <Button onClick={handleButtonRegistrarMedidas}>
                        {" "}
                        Registrar Medidas{" "}
                    </Button>
                    <Button
                        style={{ marginLeft: "10px" }}
                        onClick={handleButtonGenerarReporte}
                    >
                        {" "}
                        Generar reporte{" "}
                    </Button>
                    <Button
                        style={{ marginLeft: "10px" }}
                        onClick={handleViewComments}
                    >
                        {" "}
                        Ver Comentarios{" "}
                    </Button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Comentarios del Consumo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {comments &&
                            comments.map((producto, i) => (
                                <div key={i} id={i}>
                                    <h5>{producto.commentText}</h5>
                                </div>
                            ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default CustomerInformationRecordView;

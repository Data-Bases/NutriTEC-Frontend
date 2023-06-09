import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";

import FoodAtributes from "./FoodAtributes";
import axios from "axios";
import { baseURL, UpdateContext } from "./backendConection";

function ProductEditableInfo({ product, isInfoEditableFunction, setProducts }) {
    // Se debe importar la info del producto en la base de datos

    const [editedName, setEditedName] = useState(product.nombre);
    const [editedGramos, setEditedGramos] = useState(product.gramos);
    const [editedEnergia, setEditedEnergia] = useState(product.energia);
    const [editedGrasa, setEditedGrasa] = useState(product.grasa);
    const [editedSodio, setEditedSodio] = useState(product.sodio);
    const [editedCarbohidratos, setEditedCarbohidratos] = useState(
        product.carbohidratos
    );
    const [editedProteina, setEditedProteina] = useState(product.proteina);
    const [editedCalcio, setEditedCalcio] = useState(product.calcio);
    const [editedHierro, setEditedHierro] = useState(product.hierro);
    const { upd } = useContext(UpdateContext);

    const handleSaveButton = () => {
        // Remplazar por un cambio en la base de datos (put)
        product.nombre = editedName;
        product.gramos = editedGramos;
        product.energia = editedEnergia;
        product.grasa = editedGrasa;
        product.sodio = editedSodio;
        product.carbohidratos = editedCarbohidratos;
        product.proteina = editedProteina;
        product.calcio = editedCalcio;
        product.hierro = editedHierro;
        //
        const body = {
            name: editedName,
            description: product.descripcion,
            id: product.identificador,
            energy: editedEnergia,
            fat: editedGrasa,
            sodium: editedSodio,
            carbs: editedCarbohidratos,
            protein: editedProteina,
            calcium: editedCalcio,
            iron: editedHierro,
            portionSize: editedGramos,
        };

        // console.log(body);

        axios
            .put(baseURL + `/product/EditProduct`, body)
            .then(function (response) {
                // setIsProductAdded(false);
                isInfoEditableFunction(false);
                upd();
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

        //setProducts() hay que actualizar los productos despues de lo de arriba
    };

    return (
        <div className="d-flex" style={{ flexDirection: "column" }}>
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
                <FoodAtributes></FoodAtributes>

                <div
                    className="d-flex"
                    style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <div className="d-flex" style={{ justifyContent: "end" }}>
                        <Form.Control
                            style={{ width: "100px" }}
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                    </div>
                    <div className="d-flex" style={{ justifyContent: "end" }}>
                        <Form.Control
                            style={{ width: "100px" }}
                            value={editedGramos}
                            onChange={(e) => setEditedGramos(e.target.value)}
                        />
                    </div>
                    <div className="d-flex" style={{ justifyContent: "end" }}>
                        <Form.Control
                            style={{ width: "100px" }}
                            value={editedEnergia}
                            onChange={(e) => setEditedEnergia(e.target.value)}
                        />
                    </div>
                    <div className="d-flex" style={{ justifyContent: "end" }}>
                        <Form.Control
                            style={{ width: "100px" }}
                            value={editedGrasa}
                            onChange={(e) => setEditedGrasa(e.target.value)}
                        />
                    </div>
                    <div className="d-flex" style={{ justifyContent: "end" }}>
                        <Form.Control
                            style={{ width: "100px" }}
                            value={editedSodio}
                            onChange={(e) => setEditedSodio(e.target.value)}
                        />
                    </div>
                    <div className="d-flex" style={{ justifyContent: "end" }}>
                        <Form.Control
                            style={{ width: "100px" }}
                            value={editedCarbohidratos}
                            onChange={(e) =>
                                setEditedCarbohidratos(e.target.value)
                            }
                        />
                    </div>
                    <div className="d-flex" style={{ justifyContent: "end" }}>
                        <Form.Control
                            style={{ width: "100px" }}
                            value={editedProteina}
                            onChange={(e) => setEditedProteina(e.target.value)}
                        />
                    </div>
                    <div className="d-flex" style={{ justifyContent: "end" }}>
                        <Form.Control
                            style={{ width: "100px" }}
                            value={editedCalcio}
                            onChange={(e) => setEditedCalcio(e.target.value)}
                        />
                    </div>
                    <div className="d-flex" style={{ justifyContent: "end" }}>
                        <Form.Control
                            style={{ width: "100px" }}
                            value={editedHierro}
                            onChange={(e) => setEditedHierro(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <Button
                onClick={handleSaveButton}
                style={{ width: "100%", marginTop: "10px" }}
            >
                {" "}
                ✓{" "}
            </Button>
        </div>
    );
}

export default ProductEditableInfo;

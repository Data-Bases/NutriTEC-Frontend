import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";

import ObjectList from "./ObjectList";
import ProductInfo from "./ProductInfo";
import axios from "axios";
import { baseURL, UpdateContext } from "./backendConection";

function ProductList({ products, setProducts, upperProduct }) {
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const [selectedID, setSelectedID] = useState(""); // ID del objeto seleccionado
    const [editedDescripcion, setEditedDescripcion] = useState("");
    const [editedEnergia, setEditedEnergia] = useState("");
    const [editedGrasa, setEditedGrasa] = useState("");
    const [editedSodio, setEditedSodio] = useState("");
    const [editedCarbohidratos, setEditedCarbohidratos] = useState("");
    const [editedProteina, setEditedProteina] = useState("");
    const [editedCalcio, setEditedCalcio] = useState("");
    const [editedHierro, setEditedHierro] = useState("");
    const [editedPorcion, setEditedPorcion] = useState("");
    const [isProductAdded, setIsProductAdded] = useState(false);
    const [addedProductName, setAddedProductName] = useState("");
    const [show, setShow] = useState(false);
    const { upd } = useContext(UpdateContext);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // UseEffect
    useEffect(() => {
        if (products != null) {
            setSelectedProduct(products[0]);
        } else {
            setSelectedProduct(null);
        }
    }, [products]);
    //

    // Funciones
    const handleSelectedProduct = (p) => {
        axios
            .get(baseURL + `/product/GetProductById/${p.identificador}`)
            .then(function (response) {
                // console.log(response.data);
                const e = response.data;
                const product = {
                    identificador: e.id,
                    descripcion: e.description,
                    nombre: e.name,
                    gramos: e.portionSize,
                    energia: e.energy,
                    grasa: e.fat,
                    sodio: e.sodium,
                    carbohidratos: e.carbs,
                    proteina: e.protein,
                    calcio: e.calcium,
                    hierro: e.iron,
                };
                setSelectedProduct(product);
                upperProduct(e.id);
                setIsProductAdded(false);
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

    const handleButtonDelete = () => {
        if (selectedProduct != null) {
            axios
                .delete(baseURL + `/product/DeleteProduct?productId=${selectedProduct.identificador}`)
                .then(function (response) {
                    // console.log(response.data);
                    upd();
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
            setIsProductAdded(false);
        }
    };

    const handleButtonAdd = () => {
        setIsProductAdded(true);
    };

    const handleButtonSaveAdd = () => {
        // Remplazar por un cambio en la base de datos (post)
        // const newProduct = {
        //     identificador: "X",
        //     nombre: addedProductName,
        //     gramos: "0",
        //     energia: "0",
        //     grasa: "0",
        //     sodio: "0",
        //     carbohidratos: "0",
        //     proteina: "0",
        //     calcio: "0",
        //     hierro: "0",
        // };
        // const updatedProducts = [...products, newProduct];
        //

        // setProducts(updatedProducts);
        handleClose();

        const body = {
            name: addedProductName,
            description: editedDescripcion,
            id: selectedID,
            energy: editedEnergia,
            fat: editedGrasa,
            sodium: editedSodio,
            carbs: editedCarbohidratos,
            protein: editedProteina,
            calcium: editedCalcio,
            iron: editedHierro,
            portionSize: editedPorcion,
        };

        // console.log(body);

        axios
            .post(baseURL + `/product/AddNewProduct`, body)
            .then(function (response) {
                setEditedDescripcion("");
                setEditedEnergia("");
                setEditedGrasa("");
                setEditedSodio("");
                setEditedCarbohidratos("");
                setEditedProteina("");
                setEditedCalcio("");
                setEditedHierro("");
                setEditedPorcion("");
                setSelectedID("");
                setAddedProductName("");
                setIsProductAdded(false);
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
    //

    const renderModal = () => (
        <Modal show={show} onHide={handleClose} key={"modal"} centered>
            <Modal.Header closeButton>
                <Modal.Title>Caracteristicas Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Codigo de Barras</Form.Label>
                        <Form.Control
                            placeholder="Codigo de Barras"
                            value={selectedID}
                            onChange={(e) => setSelectedID(e.target.value)}
                        />
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            placeholder="Descripcion"
                            value={editedDescripcion}
                            onChange={(e) =>
                                setEditedDescripcion(e.target.value)
                            }
                        />
                        <Form.Label>Energia</Form.Label>
                        <Form.Control
                            placeholder="Energia"
                            value={editedEnergia}
                            onChange={(e) => setEditedEnergia(e.target.value)}
                        />
                        <Form.Label>Grasa</Form.Label>
                        <Form.Control
                            placeholder="Grasa"
                            value={editedGrasa}
                            onChange={(e) => setEditedGrasa(e.target.value)}
                        />
                        <Form.Label>Sodio</Form.Label>
                        <Form.Control
                            placeholder="Sodio"
                            value={editedSodio}
                            onChange={(e) => setEditedSodio(e.target.value)}
                        />
                        <Form.Label>Carbohidratos</Form.Label>
                        <Form.Control
                            placeholder="Carbohidratos"
                            value={editedCarbohidratos}
                            onChange={(e) =>
                                setEditedCarbohidratos(e.target.value)
                            }
                        />
                        <Form.Label>Proteina</Form.Label>
                        <Form.Control
                            placeholder="Proteina"
                            value={editedProteina}
                            onChange={(e) => setEditedProteina(e.target.value)}
                        />
                        <Form.Label>Calcio</Form.Label>
                        <Form.Control
                            placeholder="Calcio"
                            value={editedCalcio}
                            onChange={(e) => setEditedCalcio(e.target.value)}
                        />
                        <Form.Label>Hierro</Form.Label>
                        <Form.Control
                            placeholder="Hierro"
                            value={editedHierro}
                            onChange={(e) => setEditedHierro(e.target.value)}
                        />
                        <Form.Label>Tamaño Porción</Form.Label>
                        <Form.Control
                            placeholder="Tamaño Porción"
                            value={editedPorcion}
                            onChange={(e) => setEditedPorcion(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleButtonSaveAdd}>
                    Enviar a Revisión
                </Button>
            </Modal.Footer>
        </Modal>
    );

    // Return
    return (
        <div className="d-flex" style={{ justifyContent: "center" }}>
            {renderModal()}
            <div className="d-flex" style={{ flexDirection: "column" }}>
                <ObjectList
                    objects={products}
                    setObjectFunction={handleSelectedProduct}
                />
                {isProductAdded ? (
                    <div className="d-flex" style={{ marginTop: "10px" }}>
                        <Form.Control
                            placeholder="Nombre del producto"
                            style={{ width: "100%", marginRight: "10px" }}
                            value={addedProductName}
                            onChange={(e) =>
                                setAddedProductName(e.target.value)
                            }
                        />
                        <Button onClick={handleShow}> ✓ </Button>
                    </div>
                ) : (
                    <div className="d-flex" style={{ marginTop: "10px" }}>
                        <Button
                            onClick={handleButtonDelete}
                            style={{ width: "100%", marginRight: "10px" }}
                        >
                            {" "}
                            🗑️{" "}
                        </Button>
                        <Button
                            onClick={handleButtonAdd}
                            style={{ width: "100%" }}
                        >
                            {" "}
                            +{" "}
                        </Button>
                    </div>
                )}
            </div>

            <div
                className="d-flex"
                style={{ flexDirection: "column", marginLeft: "50px" }}
            >
                <ProductInfo
                    product={selectedProduct}
                    setProducts={setProducts}
                ></ProductInfo>
            </div>
        </div>
    );
}

export default ProductList;

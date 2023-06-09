import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Dropdown, DropdownButton } from "react-bootstrap";

import ObjectList from "./ObjectList";
import RecipeProductInfo from "./RecipeProductInfo";
import axios from "axios";
import { baseURL, UpdateContext } from "./backendConection";

function RecipeProductList({ productos, recetas, receta, setRecipes }) {
    const [selectedProduct, setSelectedProduct] = useState(productos[0]);
    const [selectedRecipeProduct, setSelectedRecipeProduct] = useState(null);
    const [recipeProducts, setRecipeProducts] = useState(receta.productos);
    const [isRecipeProductAdded, setIsRecipeProductAdded] = useState(false);
    const [gramos, setGramos] = useState("");
    const { upd } = useContext(UpdateContext);
    // console.log(receta);

    useEffect(() => {
        if (
            receta != null &&
            receta.productos != null &&
            receta.productos.length !== 0
        ) {
            setRecipeProducts(receta.productos);
            setSelectedProduct(productos[0]);
            setSelectedRecipeProduct(receta.productos[0]);
        } else {
            setRecipeProducts([]);
        }
    }, [receta]);

    const handleselectedRecipeProduct = (p) => {
        axios
            .get(baseURL + `/product/GetProductById/${p.identificador}`)
            .then(function (response) {
                // console.log(response.data);
                const e = response.data;
                const product = {
                    identificador: e.id,
                    nombre: e.name,
                    gramos: p.gramos,
                    energia: e.energy,
                    grasa: e.fat,
                    sodio: e.sodium,
                    carbohidratos: e.carbs,
                    proteina: e.protein,
                    calcio: e.calcium,
                    hierro: e.iron,
                };
                setSelectedRecipeProduct(product);
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
        setIsRecipeProductAdded(false);
    };

    const handleButtonDelete = () => {
        if (selectedRecipeProduct != null) {
            if (receta.identificador != null) {
                // Remplazar por un cambio en la base de datos (delete) -> Aqui se puede quitar de los parametros receta, ya que solo se utiliza para comprobar que sirva (quitar en CustomerRecipe)
                // const updatedRecipes = recetas.map((r) => {
                //     if (r.identificador === receta.identificador) {
                //         const updatedRecipeProduct = r.productos.filter(
                //             (producto) =>
                //                 producto.identificador !==
                //                 selectedRecipeProduct.identificador
                //         );
                //         return { ...r, productos: updatedRecipeProduct };
                //     }
                //     return r;
                // });

                // setRecipes(updatedRecipes);
                // setRecipeProducts(
                //     updatedRecipes.find(
                //         (r) => r.identificador === receta.identificador
                //     )?.productos || []
                // );
                axios
                    .delete(
                        baseURL +
                            `/recipe/DeleteProductInRecipe?recipeId=${receta.identificador}&productId=${selectedRecipeProduct.identificador}`
                    )
                    .then(function (response) {
                        // console.log(response.data);

                        // setAddedProductName("");
                        upd();
                        // borrarProducto();
                        // setIsRecipeAdded(false);
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
            } else {
                const index = receta.productos.findIndex(
                    (p) =>
                        p.identificador === selectedRecipeProduct.identificador
                );
                receta.productos.splice(index, 1);

                const updatedProducts = recipeProducts.filter(
                    (producto) =>
                        producto.identificador !==
                        selectedRecipeProduct.identificador
                );
                setRecipeProducts(updatedProducts);
            }

            setIsRecipeProductAdded(false);
        }
    };

    const handleButtonAdd = () => {
        setIsRecipeProductAdded(true);
    };

    const handleButtonSaveAdd = () => {
        // Remplazar por un cambio en la base de datos (post)
        const newProduct = { ...selectedProduct };
        // console.log(receta.identificador);
        newProduct.gramos = gramos;
        // console.log(newProduct);
        if (receta.identificador != null) {
            // const updatedRecipes = recetas.map((r) => {
            //     if (r.identificador === receta.identificador) {
            //         const recipeProducts = r.productos;
            //         recipeProducts.push(newProduct);
            //         return {
            //             ...r,
            //             productos: recipeProducts,
            //         };
            //     }
            //     return r;
            // });
            // setRecipes(updatedRecipes);
            // setRecipeProducts(
            //     updatedRecipes.find(
            //         (r) => r.identificador === receta.identificador
            //     )?.productos || []
            // );
            // console.log(receta.identificador);
            // console.log(newProduct);
            axios
                .put(
                    baseURL +
                        `/recipe/InsertProductToRecipe?recipeId=${receta.identificador}&productId=${newProduct.identificador}&servings=${newProduct.gramos}`
                )
                .then(function (response) {
                    console.log(response.data);

                    setGramos("");
                    setIsRecipeProductAdded(false);
                    upd();
                })
                .catch(function (error) {
                    if (error.response) {
                        // PUT response with a status code not in range 2xx
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
        } else {
            receta.productos.push(newProduct);
            setRecipeProducts(receta.productos);
        }
    };

    return (
        <div className="d-flex" style={{ justifyContent: "center" }}>
            <div className="d-flex" style={{ flexDirection: "column" }}>
                <ObjectList
                    objects={recipeProducts}
                    setObjectFunction={handleselectedRecipeProduct}
                />

                {isRecipeProductAdded ? (
                    <div className="d-flex" style={{ marginTop: "10px" }}>
                        <DropdownButton
                            style={{ marginRight: "10px" }}
                            id="product-dropdown"
                            title={selectedProduct.nombre}
                        >
                            {productos.map((producto, index) => (
                                <Dropdown.Item
                                    key={index}
                                    onClick={() => setSelectedProduct(producto)}
                                >
                                    {producto.nombre}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>

                        <Form.Control
                            style={{ marginRight: "10px", width: "75px" }}
                            placeholder="porcion"
                            value={gramos}
                            onChange={(e) => setGramos(e.target.value)}
                        />
                        <Button
                            style={{ width: "100%" }}
                            onClick={handleButtonSaveAdd}
                        >
                            {" "}
                            ✓{" "}
                        </Button>
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
                <RecipeProductInfo
                    producto={selectedRecipeProduct}
                    receta={receta}
                    setRecipes={setRecipes}
                ></RecipeProductInfo>
            </div>
        </div>
    );
}

export default RecipeProductList;

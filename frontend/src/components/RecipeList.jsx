import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";

import ObjectList from "./ObjectList";
import RecipeInfo from "./RecipeInfo";

import axios from "axios";
import { baseURL, UpdateContext } from "./backendConection";

function RecipeList({ recetas, setRecipeFunction, setRecipes }) {
    const [selectedRecipe, setSelectedRecipe] = useState(recetas[0]);

    const [isRecipeAdded, setIsRecipeAdded] = useState(false);
    const [addedProductName, setAddedProductName] = useState("");
    const { updateState , upd } = useContext(UpdateContext);

    useEffect(() => {handleSelectedRecipe(selectedRecipe)},[updateState])

    const handleSelectedRecipe = (receta) => {
        axios
            .get(baseURL + `/recipe/GetRecipesById/${receta.identificador}`)
            .then(function (response) {
                // console.log("response", response.data);
                const obj = response.data;

                let gramos = 0;
                obj.products.map((e) => {
                    gramos += e.portionsize;
                });
                const rr = {
                    identificador: receta.identificador,
                    nombre: obj.recipeName,
                    gramos: gramos,
                    energia: obj.energy,
                    grasa: obj.fat,
                    sodio: obj.sodium,
                    carbohidratos: obj.carbs,
                    proteina: obj.protein,
                    calcio: obj.calcium,
                    hierro: obj.iron,
                    productos: obj.products.map((e) => ({
                        identificador: e.id,
                        nombre: e.name,
                        gramos: e.portionSize,
                        energia: e.energy,
                        grasa: e.fat,
                        sodio: e.sodium,
                        carbohidratos: e.carbs,
                        proteina: e.protein,
                        calcio: e.calcium,
                        hierro: e.iron,
                    })),
                };
                // console.log("rr", rr);
                setSelectedRecipe(rr);
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
        if (setRecipeFunction != null) setRecipeFunction(receta);

        setIsRecipeAdded(false);
    };

    const handleButtonDelete = () => {
        if (selectedRecipe != null) {
            // Remplazar por un cambio en la base de datos (delete)
            axios
                .delete(
                    baseURL +
                        `/recipe/DeleteRecipe?recipeId=${selectedRecipe.identificador}`
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
            //

            // setRecipes(updatedRecipes);
            setIsRecipeAdded(false);
        }
    };

    const handleButtonAdd = () => {
        setIsRecipeAdded(true);
    };

    const handleButtonSaveAdd = () => {
        // Remplazar por un cambio en la base de datos (post)
        // const newRecipe = {
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
        //     productos: [],
        // };

        // const updatedProducts = [...recetas, newRecipe];
        //
        axios
            .post(baseURL + `/recipe/CreateRecipe`, {
                recipeName: addedProductName,
                products: [
                    {
                        id: 11111,
                        servings: 0,
                    },
                ],
            })
            .then(function (response) {
                // console.log(response.data);

                // setAddedProductName("");
                upd();
                borrarProducto();
                setIsRecipeAdded(false);
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

        // setRecipes(updatedProducts);
    };

    const borrarProducto = () => {
        let idReceta = 0;
        console.log(recetas);
        recetas.map((rec) => {
            if (rec.nombre == addedProductName) {
                idReceta = rec.identificador;
            }
        });
        axios
            .delete(
                baseURL +
                    `/recipe/DeleteProductInRecipe?recipeId=${idReceta}&productId=11111`
            )
            .then(function (response) {
                // console.log(response.data);

                setAddedProductName("");
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
    };

    return (
        <div className="d-flex" style={{ justifyContent: "center" }}>
            <div className="d-flex" style={{ flexDirection: "column" }}>
                <ObjectList
                    objects={recetas}
                    setObjectFunction={handleSelectedRecipe}
                />
                {isRecipeAdded ? (
                    <div className="d-flex" style={{ marginTop: "10px" }}>
                        <Form.Control
                            placeholder="Nombre de la receta"
                            style={{ width: "100%", marginRight: "10px" }}
                            value={addedProductName}
                            onChange={(e) =>
                                setAddedProductName(e.target.value)
                            }
                        />
                        <Button onClick={handleButtonSaveAdd}> ✓ </Button>
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
                <RecipeInfo
                    receta={selectedRecipe}
                    setRecipes={setRecipes}
                ></RecipeInfo>
            </div>
        </div>
    );
}

export default RecipeList;

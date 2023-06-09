import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";

import RecipeProductList from "./RecipeProductList";
import RecipeList from "./RecipeList";
import axios from "axios";
import { baseURL } from "./backendConection";
import "../styles/Views.scss";

function CustomerRecipeManagementView({
    productos,
    recetas,
    receta,
    setProducts,
    setRecipes,
}) {
    const [selectedRecipe, setSelectedRecipe] = useState(receta);
    // console.log(receta);
    // console.log(selectedRecipes);
    const handleSelectedRecipe = (r) => {
        axios
            .get(baseURL + `/recipe/GetRecipesById/${r.identificador}`)
            .then(function (response) {
                // console.log(response.data);
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
                        gramos: e.portionsize,
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
    };


    return (
        <Container
            className="d-flex recipe-container"
            style={{
                justifyContent: "space-between",
                backgroundColor: "lightgray",
                borderRadius: "10px",
                padding: "20px",
            }}
        >
            <RecipeList
                recetas={recetas}
                setRecipeFunction={handleSelectedRecipe}
                setRecipes={setRecipes}
            ></RecipeList>

            <h2
                className="d-flex"
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 25px",
                }}
            >
                {" "}
                →{" "}
            </h2>

            <RecipeProductList
                productos={productos}
                recetas={recetas}
                receta={selectedRecipe}
                setRecipes={setRecipes}
            ></RecipeProductList>
        </Container>
    );
}

export default CustomerRecipeManagementView;

import React, { useState, useEffect, useContext } from "react";

import CustomerInformationRecordView from "./CustomerInformationRecordView";
import CustomerProductManagementView from "./CustomerProductManagementView";
import CustomerRecipeManagementView from "./CustomerRecipeManagementView";

import NutricionistProductManagementView from "./NutricionistProductManagementView";

import AdminProductManagementView from "./AdminProductManagementView";

import axios from "axios";
import { baseURL, UpdateContext } from "./backendConection";

function SuperiorComponent({ vista }) {
    // Esto debe tenerlo un componente superior
    const [products, setProducts] = useState([]);
    const [adminProducts, setAdminProducts] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useState({
        identificador: "4",
        nombre: "receta 1",
        gramos: "###",
        energia: "###",
        grasa: "###",
        sodio: "###",
        carbohidratos: "###",
        proteina: "###",
        calcio: "###",
        hierro: "###",
        productos: [
            {
                identificador: "1",
                nombre: "producto 1",
                gramos: "100",
                energia: "###",
                grasa: "###",
                sodio: "###",
                carbohidratos: "###",
                proteina: "###",
                calcio: "###",
                hierro: "###",
            },
            {
                identificador: "2",
                nombre: "producto 2",
                gramos: "1502",
                energia: "###",
                grasa: "###",
                sodio: "###",
                carbohidratos: "###",
                proteina: "###",
                calcio: "###",
                hierro: "###",
            },
        ],
    });
    const { updateState } = useContext(UpdateContext);
    // console.log(recipe);
    useEffect(() => {
        // console.log("Actualizando productos");
        axios
            .get(baseURL + `/product/GetUnapprovedProducts`)
            .then(function (response) {
                const dBProducts = response.data.map((item) => ({
                    identificador: item.id,
                    nombre: item.name,
                }));
                setAdminProducts(dBProducts);
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
            .get(baseURL + `/product/GetAllProducts`)
            .then(function (response) {
                const dBProducts = response.data.map((item) => ({
                    identificador: item.id,
                    nombre: item.name,
                }));
                setProducts(dBProducts);
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
            .get(baseURL + `/recipe/GetRecipes`)
            .then(function (response) {
                const dBRecipes = response.data.map((item) => ({
                    identificador: item.id,
                    nombre: item.name,
                }));
                setRecipes(dBRecipes);
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

        // axios
        //     .get(
        //         baseURL + `/recipe/GetRecipesById/${1}`
        //     )
        //     .then(function (response) {
        //         // console.log(response.data);
        //         const obj = response.data;

        //         let gramos = 0;
        //         obj.products.map((e) => {
        //             gramos += e.portionsize;
        //         });
        //         const rr = {
        //             identificador: receta.identificador,
        //             nombre: obj.recipeName,
        //             gramos: gramos,
        //             energia: obj.energy,
        //             grasa: obj.fat,
        //             sodio: obj.sodium,
        //             carbohidratos: obj.carbs,
        //             proteina: obj.protein,
        //             calcio: obj.calcium,
        //             hierro: obj.iron,
        //             productos: obj.products.map((e) => ({
        //                 identificador: e.id,
        //                 nombre: e.name,
        //                 gramos: e.portionsize,
        //                 energia: e.energy,
        //                 grasa: e.fat,
        //                 sodio: e.sodium,
        //                 carbohidratos: e.carbs,
        //                 proteina: e.protein,
        //                 calcio: e.calcium,
        //                 hierro: e.iron,
        //             })),
        //         };
        //         // console.log(rr);
        //         setSelectedRecipe(rr);
        //     })
        //     .catch(function (error) {
        //         if (error.response) {
        //             // GET response with a status code not in range 2xx
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
    }, [updateState]);

    const handleSetProducts = (p) => {
        setProducts(p);
    };

    const handleSetRecipes = (r) => {
        setRecipes(r);
    };
    //
    // console.log(recipe);
    const selectView = () => {
        switch (vista) {
            case "CI":
                return (
                    <CustomerInformationRecordView
                        productos={products}
                        recetas={recipes}
                        setRecipes={handleSetRecipes}
                    ></CustomerInformationRecordView>
                );

            case "CP":
                return (
                    <CustomerProductManagementView
                        products={products}
                        setProducts={handleSetProducts}
                    ></CustomerProductManagementView>
                );

            case "CR":
                return (
                    <CustomerRecipeManagementView
                        productos={products}
                        recetas={recipes}
                        receta={recipe}
                        setRecipes={handleSetRecipes}
                    ></CustomerRecipeManagementView>
                );

            case "NP":
                return (
                    <NutricionistProductManagementView
                        products={products}
                        setProducts={handleSetProducts}
                    ></NutricionistProductManagementView>
                );

            case "AP":
                return (
                    <AdminProductManagementView
                        products={adminProducts}
                        setProducts={handleSetProducts}
                    ></AdminProductManagementView>
                );
            default:
                break;
        }
    };
    return <>{recipes.length != 0 && products.length != 0 && selectView()}</>;
}
export default SuperiorComponent;

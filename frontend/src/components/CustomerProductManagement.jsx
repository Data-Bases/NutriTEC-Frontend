import React, { useEffect, useState } from 'react';
import { Container, Button, DropdownButton} from 'react-bootstrap';


import ProductList from './ProductList';
import RecipeCreator from './RecipeCreator';
import { baseURL } from './backendConection';
import axios from 'axios';


function CustomerProductManagement() {
    const [productos, setProductos] = useState([]);
    const [updateState, setUpdateState] = useState(true);

    const upd = () => {
        setUpdateState(!updateState);
    }

    useEffect(()=>{
        // console.log(localStorage.getItem("userId"));
        axios.get(baseURL + `/product/GetAllProducts`)
        .then((response) => {
            // console.log(response.data);
            setProductos(response.data);
        }).catch(function (error) {
            if (error.response) { // GET response with a status code not in range 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) { // no response
              console.log(error.request);
              // instance of XMLHttpRequest in the browser
              // instance ofhttp.ClientRequest in node.js
            } else { // Something wrong in setting up the request
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
    }, [updateState]);

    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleSelectedRecipe = (recipe) => {
        setSelectedRecipe(recipe);
    }

    const handleButtonCrearReceta = () => {
        console.log(selectedRecipe);
    }

    return (
        <>
            <ProductList productos={productos} updateProducts={upd}></ProductList>
            <hr />
            <Container
                className="d-flex"
                style={{
                    backgroundColor: 'lightgray',
                    padding: '50px',
                    width: '1000px',
                    borderRadius: '10px',
                    justifyContent: 'center'
                }}
            >

                <div>
                    <div style={{ margin: '20px 0' }} >
                        <RecipeCreator productos={productos} setRecipeFunction={handleSelectedRecipe}></RecipeCreator>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <Button onClick={handleButtonCrearReceta}> Crear receta </Button>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default CustomerProductManagement;

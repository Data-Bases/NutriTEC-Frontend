import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';


import ProductList from './ProductList';
import RecipeCreator from './RecipeCreator';

import 'bootstrap/dist/css/bootstrap.min.css';

function ProductManagement({ productos }) {

    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleSelectedRecipe = (recipe) => {
        setSelectedRecipe(recipe);
    }

    const handleButtonCrearReceta = () => {
        console.log(selectedRecipe);
    }

    return (
        <div>
            <ProductList productos={productos}></ProductList>
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
        </div>
    );
}

export default ProductManagement;

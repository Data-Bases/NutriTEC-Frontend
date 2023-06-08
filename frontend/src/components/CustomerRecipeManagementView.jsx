import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import RecipeProductList from './RecipeProductList';
import RecipeList from './RecipeList';

function CustomerRecipeManagementView({ productos, recetas, setProducts, setRecipes}) {

    const [selectedRecipe, setSelectedRecipe] = useState(recetas[0]);

    const handleSelectedRecipe = (r) => {
        console.log(r);
        setSelectedRecipe(r);
    }

    return (
        <Container className='d-flex' style={{ justifyContent: 'space-between', backgroundColor: 'lightgray', borderRadius: '10px', padding: '20px' }} >

            <RecipeList recetas={recetas} setRecipeFunction={handleSelectedRecipe} setRecipes={setRecipes}></RecipeList>

            <h2 className='d-flex' style={{ justifyContent: 'center', alignItems: 'center', margin:'0 25px'}}> → </h2>

            <RecipeProductList productos={productos} recetas={recetas} recipe={selectedRecipe} setRecipes={setRecipes} ></RecipeProductList>

        </Container>
    );
}

export default CustomerRecipeManagementView;

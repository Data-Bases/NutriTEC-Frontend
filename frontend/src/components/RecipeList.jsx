import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ObjectList from './ObjectList';
import RecipeInfo from './RecipeInfo';

function RecipeList({ recetas, setRecipeFunction, setRecipes }) {
    const [selectedRecipe, setSelectedRecipe] = useState(recetas[0]);

    const [isRecipeAdded, setIsRecipeAdded] = useState(false);
    const [addedProductName, setAddedProductName] = useState('');

    const handleSelectedRecipe = (receta) => {
        setSelectedRecipe(receta)
        if (setRecipeFunction != null) setRecipeFunction(receta)

        setIsRecipeAdded(false);
    };

    const handleButtonDelete = () => {
        if (selectedRecipe != null) {

            // Remplazar por un cambio en la base de datos (delete)
            const updatedRecipes = recetas.filter((r) => r.identificador !== selectedRecipe.identificador);
            //

            setRecipes(updatedRecipes);
            setIsRecipeAdded(false);
        }
    };

    const handleButtonAdd = () => {
        setIsRecipeAdded(true);
    };

    const handleButtonSaveAdd = () => {

        // Remplazar por un cambio en la base de datos (post)
        const newRecipe = {
            identificador: 'X',
            nombre: addedProductName,
            gramos: '0',
            energia: '0',
            grasa: '0',
            sodio: '0',
            carbohidratos: '0',
            proteina: '0',
            calcio: '0',
            hierro: '0',
            productos: []
        };

        const updatedProducts = [...recetas, newRecipe];
        //

        setRecipes(updatedProducts);
        setAddedProductName('');
        setIsRecipeAdded(false);
    };


    return (
        <div className="d-flex" style={{ justifyContent: 'center' }}>

            <div className="d-flex" style={{ flexDirection: 'column' }}>
                <ObjectList objects={recetas} setObjectFunction={handleSelectedRecipe} />
                {isRecipeAdded ?
                    <div className="d-flex" style={{ marginTop: '10px' }}>
                        <Form.Control placeholder='Nombre de la receta' style={{ width: '100%', marginRight: '10px' }} value={addedProductName} onChange={(e) => setAddedProductName(e.target.value)} />
                        <Button onClick={handleButtonSaveAdd}> ✓ </Button>
                    </div>
                    :
                    <div className="d-flex" style={{ marginTop: '10px' }}>
                        <Button onClick={handleButtonDelete} style={{ width: '100%', marginRight: '10px' }}> 🗑️ </Button>
                        <Button onClick={handleButtonAdd} style={{ width: '100%' }}> + </Button>
                    </div>}
            </div>

            <div className="d-flex" style={{ flexDirection: 'column', marginLeft: '50px' }}>
                <RecipeInfo receta={selectedRecipe} setRecipes={setRecipes}></RecipeInfo>
            </div>
        </div >
    );
}

export default RecipeList;
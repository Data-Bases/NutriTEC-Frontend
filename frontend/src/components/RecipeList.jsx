import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ObjectList from './ObjectList';
import RecipeInfo from './RecipeInfo';

function RecipeList({ recetas, setRecipeFunction }) {
    const [selectedRecipe, setSelectedRecipe] = useState(recetas[0]);

    const [isRecipeAdded, setIsRecipeAdded] = useState(false);
    const [addedProductName, setAddedProductName] = useState('');


    const handleSelectedRecipe = (receta) => {
        setSelectedRecipe(receta)
        // console.log(receta);
        if (setRecipeFunction != null) setRecipeFunction(receta)

        setIsRecipeAdded(false);
    };

    const handleButtonDelete = () => {

        // Remplazar por un cambio en la base de datos
        const index = recetas.findIndex((r) => r.identificador === selectedRecipe.identificador);
        recetas.splice(index, 1);
        //

        setSelectedRecipe(recetas[0])
        setIsRecipeAdded(false);
    };

    const handleButtonAdd = () => {
        setIsRecipeAdded(true);
    };

    const handleButtonSaveAdd = () => {

        // Remplazar por un cambio en la base de datos
        recetas.push({
            identificador: 'Y',
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
        });
        //

        setAddedProductName('');

        setIsRecipeAdded(false);
    };


    return (
        <div className="d-flex" style={{ justifyContent: 'center' }}>

            <div className="d-flex" style={{ flexDirection: 'column' }}>
                <ObjectList objetos={recetas} setObjectFunction={handleSelectedRecipe} />
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
                <RecipeInfo receta={selectedRecipe}></RecipeInfo>
            </div>
        </div >
    );
}

export default RecipeList;
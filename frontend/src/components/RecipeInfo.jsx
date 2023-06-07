import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

import FoodInfo from './FoodInfo';
import RecipeEditableInfo from './RecipeEditableInfo';


function RecipeInfo({ receta }) {
    const [isInfoEditable, SetisInfoEditable] = useState(false);

    const handleIsInfoEditable = (value) => {
        SetisInfoEditable(value);
    }

    const handleEditButton = () => {
        SetisInfoEditable(true);
    };

    return (
        <div>
            <h2> Informacion de la receta </h2>

            {(receta != null) ?
                <>
                    {isInfoEditable ?
                        <RecipeEditableInfo receta={receta} isInfoEditableFunction={handleIsInfoEditable}></RecipeEditableInfo>
                        :
                        <>
                            <FoodInfo alimento={receta}></FoodInfo>
                            <Button onClick={handleEditButton} style={{ width: '100%', marginTop: '10px' }}> ✎ </Button>
                        </>}
                </>
                : <p> No hay recetas </p>}
        </div>
    );
}

export default RecipeInfo;
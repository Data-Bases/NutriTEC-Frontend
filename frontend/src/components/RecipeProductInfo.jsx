import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

import FoodInfo from './FoodInfo';
import RecipeProductEditableInfo from './RecipeProductEditableInfo';


function RecipeProductInfo({ producto }) {
    const [isInfoEditable, SetisInfoEditable] = useState(false);

    const handleIsInfoEditable = (value) => {
        SetisInfoEditable(value);
    }

    const handleEditButton = () => {
        SetisInfoEditable(true);
    };

    return (
        <div>
            <h2> Informacion del alimento </h2>

            {(producto != null) ?
                <>
                    {isInfoEditable ?
                        <RecipeProductEditableInfo producto={producto} isInfoEditableFunction={handleIsInfoEditable}></RecipeProductEditableInfo>
                        :
                        <>
                            <FoodInfo alimento={producto}></FoodInfo>
                            <Button onClick={handleEditButton} style={{ width: '100%', marginTop: '10px' }}> ✎ </Button>
                        </>}
                </>
                : <p> Eliga un alimento </p>}
        </div>
    );
}

export default RecipeProductInfo;
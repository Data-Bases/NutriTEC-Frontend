import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

import FoodInfo from './FoodInfo';
import ProductEditableInfo from './ProductEditableInfo';


function ProductInfo({ producto }) {
    const [isInfoEditable, SetisInfoEditable] = useState(false);

    const handleIsInfoEditable = (value) => {
        SetisInfoEditable(value);
    }

    const handleEditButton = () => {
        SetisInfoEditable(true);
    };

    return (
        <div>
            <h2> Informacion del producto </h2>

            {(producto != null) ?
                <>
                    {isInfoEditable ?
                        <ProductEditableInfo producto={producto} isInfoEditableFunction={handleIsInfoEditable}></ProductEditableInfo>
                        :
                        <>
                            <FoodInfo alimento={producto}></FoodInfo>
                            <Button onClick={handleEditButton} style={{ width: '100%', marginTop: '10px' }}> ✎ </Button>
                        </>}
                </>
                : <p> No hay productos </p>}
        </div>

    );
}

export default ProductInfo;
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

import FoodInfo from './FoodInfo';
import ProductEditableInfo from './ProductEditableInfo';


function ProductInfo({ product, setProducts }) {
    const [isInfoEditable, SetisInfoEditable] = useState(false);

    const handleIsInfoEditable = (v) => {
        SetisInfoEditable(v);
    }

    const handleEditButton = () => {
        SetisInfoEditable(true);
    };

    return (
        <div>
            <h2> Informacion del producto </h2>

            {(product != null) ?
                <>
                    {isInfoEditable ?
                        <ProductEditableInfo product={product} isInfoEditableFunction={handleIsInfoEditable} setProducts={setProducts}></ProductEditableInfo>
                        :
                        <>
                            <FoodInfo alimento={product}></FoodInfo>
                            <Button onClick={handleEditButton} style={{ width: '100%', marginTop: '10px' }}> ✎ </Button>
                        </>}
                </>
                : <p> No hay productos </p>}
        </div>

    );
}

export default ProductInfo;
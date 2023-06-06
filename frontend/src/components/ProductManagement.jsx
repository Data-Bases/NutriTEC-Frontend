import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import ProductList from './ProductList';
import RecipeCreator from './RecipeCreator';


function ProductManagement({ objetosBD }) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <>
            <ProductList productos={objetosBD} setProductFunction={setSelectedProduct}></ProductList>
            <RecipeCreator producto={selectedProduct}></RecipeCreator>
        </>
    );
}

export default ProductManagement;

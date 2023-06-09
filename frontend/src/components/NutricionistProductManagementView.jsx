import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

import ProductList from './ProductList';


function NutricionistProductManagementView({ products, setProducts }) {

    return (
        <Container style={{ justifyContent: 'center', backgroundColor: 'lightgray', borderRadius: '10px', padding: '20px' }} >

            <ProductList products={products} setProducts={setProducts}></ProductList>

        </Container>
    );
}

export default NutricionistProductManagementView;

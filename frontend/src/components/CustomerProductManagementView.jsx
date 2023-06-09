import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

import ProductList from './ProductList';


function CustomerProductManagementView({products, setProducts}) {
    
    return (
        <Container className='d-flex' style={{ justifyContent: 'center', backgroundColor: 'lightgray', borderRadius: '10px', padding: '20px' }} >

            <ProductList products={products} setProducts={setProducts}></ProductList>

        </Container>
    );
}

export default CustomerProductManagementView;

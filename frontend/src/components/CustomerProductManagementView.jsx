import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

import ProductList from './ProductList';

import 'bootstrap/dist/css/bootstrap.min.css';

function CustomerProductManagementView({ productos }) {
    return (
        <Container className='d-flex' style={{ justifyContent: 'center', backgroundColor: 'lightgray', borderRadius: '10px', padding: '20px' }} >

            <ProductList productos={productos}></ProductList>
            
        </Container>
    );
}

export default CustomerProductManagementView;

import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

import ProductList from './ProductList';

import 'bootstrap/dist/css/bootstrap.min.css';

function AdminProductManagementView({ products, setProducts }) {

    const handleApproveButton = () => {

    }

    const handleDenyButton = () => {

    }

    return (
        <Container style={{ justifyContent: 'center', backgroundColor: 'lightgray', borderRadius: '10px', padding: '20px' }} >

            <ProductList products={products} setProducts={setProducts}></ProductList>

            <div className='d-flex' style={{ justifyContent: 'end'}}>
                <Button onClick={handleApproveButton} > Aprobar </Button>
                <Button onClick={handleDenyButton} style={{ marginLeft: '10px'}}> Denegar </Button>

            </div>


        </Container>
    );
}

export default AdminProductManagementView;

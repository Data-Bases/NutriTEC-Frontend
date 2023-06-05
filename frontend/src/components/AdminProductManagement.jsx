import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductList from './ProductList';

function AdminProductManagement({ productos }) {

    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleSelectedProduct = (producto) => {
        setSelectedProduct(producto)
    }

    const handleButtonAprobar = () => {
        console.log(selectedProduct);
    }

    const handleButtonRechazar = () => {
        console.log(selectedProduct);
    }

    return (
        <>
            <ProductList productos={productos} setProductFunction={handleSelectedProduct}></ProductList>

            <hr />

            <Container
                className="d-flex"
                style={{
                    backgroundColor: 'lightgray',
                    padding: '50px',
                    width: '1000px',
                    borderRadius: '10px',
                    justifyContent: 'center'
                }}
            >
                <div>
                    <Button onClick={handleButtonAprobar}> Aprobar </Button>
                    <Button style={{ marginLeft: '20px' }} onClick={handleButtonRechazar}> Rechazar </Button>
                </div>

            </Container>
        </>
    );
}

export default AdminProductManagement;

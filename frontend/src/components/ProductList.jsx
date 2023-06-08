import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ObjectList from './ObjectList';
import ProductInfo from './ProductInfo';

function ProductList({ products, setProducts }) {
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const [isProductAdded, setIsProductAdded] = useState(false);
    const [addedProductName, setAddedProductName] = useState('');

    // UseEffect
    useEffect(() => {
        if (products != null) {
            setSelectedProduct(products[0]);
        }
        else {
            setSelectedProduct(null);
        }
    }, [products]);
    //

    // Funciones
    const handleSelectedProduct = (p) => {
        setSelectedProduct(p)
        setIsProductAdded(false);
    };

    const handleButtonDelete = () => {
        if (selectedProduct != null) {

            // Remplazar por un cambio en la base de datos
            const updatedProducts = products.filter((p) => p.identificador !== selectedProduct.identificador);
            //

            setProducts(updatedProducts);
            setIsProductAdded(false);
        }
    };

    const handleButtonAdd = () => {
        setIsProductAdded(true);
    };

    const handleButtonSaveAdd = () => {

        // Remplazar por un cambio en la base de datos
        const newProduct = {
            identificador: 'X',
            nombre: addedProductName,
            gramos: '0',
            energia: '0',
            grasa: '0',
            sodio: '0',
            carbohidratos: '0',
            proteina: '0',
            calcio: '0',
            hierro: '0'
        };
        const updatedProducts = [...products, newProduct];
        //

        setProducts(updatedProducts);
        setAddedProductName('');
        setIsProductAdded(false);
    };
    //

    // Return
    return (
        <div className="d-flex" style={{ justifyContent: 'center' }}>
            <div className="d-flex" style={{ flexDirection: 'column' }}>
                <ObjectList objects={products} setObjectFunction={handleSelectedProduct} />
                {isProductAdded ?
                    <div className="d-flex" style={{ marginTop: '10px' }}>
                        <Form.Control placeholder='Nombre del producto' style={{ width: '100%', marginRight: '10px' }} value={addedProductName} onChange={(e) => setAddedProductName(e.target.value)} />
                        <Button onClick={handleButtonSaveAdd}> ✓ </Button>
                    </div>
                    :
                    <div className="d-flex" style={{ marginTop: '10px' }}>
                        <Button onClick={handleButtonDelete} style={{ width: '100%', marginRight: '10px' }}> 🗑️ </Button>
                        <Button onClick={handleButtonAdd} style={{ width: '100%' }}> + </Button>
                    </div>}
            </div>

            <div className="d-flex" style={{ flexDirection: 'column', marginLeft: '50px' }}>
                <ProductInfo product={selectedProduct}></ProductInfo>
            </div>
        </div >
    );
}

export default ProductList;
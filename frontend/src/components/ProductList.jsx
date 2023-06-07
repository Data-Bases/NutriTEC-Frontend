import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ObjectList from './ObjectList';
import ProductInfo from './ProductInfo';

function ProductList({ productos, setProductFunction }) {
    const [selectedProduct, setSelectedProduct] = useState(productos[0]);
    const [isProductAdded, setIsProductAdded] = useState(false);
    const [addedProductName, setAddedProductName] = useState('');

    const [products, setProducts] = useState(productos);

    const handleSelectedProduct = (producto) => {
        setSelectedProduct(producto)
        if (setProductFunction != null) setProductFunction(producto)

        setIsProductAdded(false);
    };

    const handleButtonDelete = () => {

        // Remplazar por un cambio en la base de datos
        const index = productos.findIndex((r) => r.identificador === selectedProduct.identificador);
        productos.splice(index, 1);
        const updatedProductos = [...productos];
        //

        setProducts(updatedProductos);
        setIsProductAdded(false);
    };

    const handleButtonAdd = () => {
        setIsProductAdded(true);
    };

    const handleButtonSaveAdd = () => {

        // Remplazar por un cambio en la base de datos
        productos.push({
            identificador: 'X',
            nombre: addedProductName,
            gramos: '0',
            energia: '0',
            grasa: '0',
            sodio: '0',
            carbohidratos: '0',
            proteina: '0',
            vitaminas: '0',
            calcio: '0',
            hierro: '0'
        });
        const updatedProductos = [...productos];
        //

        setProducts(updatedProductos);
        setAddedProductName('');
        setIsProductAdded(false);
    };

    return (
        <div className="d-flex" style={{ justifyContent:'center' }}>
            <div className="d-flex" style={{ flexDirection: 'column'}}>
                <ObjectList objetos={products} setObjectFunction={handleSelectedProduct} />
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

            <div className="d-flex" style={{ flexDirection: 'column', marginLeft:'50px'}}>
                <ProductInfo producto={selectedProduct}></ProductInfo>
            </div>
        </div >
    );
}

export default ProductList;
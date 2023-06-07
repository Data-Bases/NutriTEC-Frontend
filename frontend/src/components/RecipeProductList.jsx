import React, { useState } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ObjectList from './ObjectList';
import RecipeProductInfo from './RecipeProductInfo';

function RecipeProductList({ productos, productosReceta}) {
    const [selectedProduct, setSelectedProduct] = useState(productos[0]);
    const [selectedRecipeProduct, setSelectedRecipeProduct] = useState(null);
    const [isRecipeProductAdded, SetIsRecipeProductAdded] = useState(false);
    const [gramos, setGramos] = useState('');

    const handleSelectedRecipeProduct = (producto) => {
        setSelectedRecipeProduct(producto);
        SetIsRecipeProductAdded(false);
    };

    const handleButtonDelete = () => {

         // Remplazar por un cambio en la base de datos
         const index = productosReceta.findIndex((p) => p.identificador === selectedRecipeProduct.identificador);
         productosReceta.splice(index, 1);
         //
 
         setSelectedRecipeProduct(productosReceta[0])
         SetIsRecipeProductAdded(false);

        // // Crear una nueva copia del arreglo de productos de receta sin el producto seleccionado
        // const updatedRecipeProducts = recipeProducts.filter(
        //     (r) => r.identificador !== selectedRecipeProduct.identificador
        // );

        // setRecipeProducts(updatedRecipeProducts);
        // setSelectedRecipeProduct(null);
        
    };

    const handleButtonAdd = () => {
        SetIsRecipeProductAdded(true);
    };

    const handleButtonSaveAdd = () => {
        
        // Remplazar por un cambio en la base de datos
        const newProduct = {...selectedProduct}
        newProduct.identificador = 'Z';
        newProduct.gramos = gramos;
        productosReceta.push(newProduct);
        //

        setGramos('');
        SetIsRecipeProductAdded(false);  
    };

    return (

        <div className="d-flex" style={{ justifyContent: 'center' }}>
            <div className="d-flex" style={{ flexDirection: 'column' }}>
                <ObjectList objetos={productosReceta} setObjectFunction={handleSelectedRecipeProduct} />

                {isRecipeProductAdded ?
                    <div className="d-flex" style={{ marginTop: '10px' }}>

                        <DropdownButton style={{ marginRight: '10px' }} id="product-dropdown" title={selectedProduct.nombre}>
                            {productos.map((producto, index) => (
                                <Dropdown.Item key={index} onClick={() => setSelectedProduct(producto)}>
                                    {producto.nombre}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>

                        <Form.Control
                            style={{ marginRight: '10px', width: '75px' }}
                            placeholder="g"
                            value={gramos}
                            onChange={(e) => setGramos(e.target.value)}
                        />
                        <Button style={{ width: '100%' }} onClick={handleButtonSaveAdd}> ✓ </Button>
                    </div>
                    :
                    <div className="d-flex" style={{ marginTop: '10px' }}>
                        <Button onClick={handleButtonDelete} style={{ width: '100%', marginRight: '10px' }}> 🗑️ </Button>
                        <Button onClick={handleButtonAdd} style={{ width: '100%' }}> + </Button>
                    </div>}
            </div>

            <div className="d-flex" style={{ flexDirection: 'column', marginLeft: '50px' }}>
                <RecipeProductInfo producto={selectedRecipeProduct}></RecipeProductInfo>
            </div>
        </div>
    );
}

export default RecipeProductList;

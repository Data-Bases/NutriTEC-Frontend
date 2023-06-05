import React, { useState } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecipeCreator({ productos, setRecipeFunction }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [porcion, setPorcion] = useState('');
    const [gramos, setGramos] = useState('');
    const [recipeProducts, setRecipeProducts] = useState([]);


    const handleDropdownProduct = (product) => {
        setSelectedProduct(product);
    }

    const handleButtonAddProduct = () => {
        const newProduct = {
            product: selectedProduct,
            porcion: porcion,
            gramos: gramos
        };

        setRecipeProducts([...recipeProducts, newProduct]);
        setPorcion('');
        setGramos('');

        if (setRecipeFunction != null) {
            setRecipeFunction(recipeProducts);
        }
    };

    return (
        <div>
            <div className="d-flex" style={{ justifyContent: 'start', alignItems: 'center' }}>
                <DropdownButton style={{ marginRight: '10px' }} id="product-dropdown" title={selectedProduct ? selectedProduct.nombre : 'Producto'}>
                    {productos.map((producto, index) => (
                        <Dropdown.Item key={index} onClick={() => handleDropdownProduct(producto)}>
                            {producto.nombre}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
                <Form.Control
                    style={{ marginRight: '10px' }}
                    placeholder="Porción"
                    value={porcion}
                    onChange={(e) => setPorcion(e.target.value)}
                />
                <Form.Control
                    style={{ marginRight: '10px' }}
                    placeholder="gramos"
                    value={gramos}
                    onChange={(e) => setGramos(e.target.value)}
                />
                <Button onClick={handleButtonAddProduct}> + </Button>
            </div>

            <div className="d-flex" style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                <Dropdown >
                    <Dropdown.Toggle  style={{ width:'600px'}} variant="primary" id="dropdown-basic"> Receta </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {recipeProducts.map((recipeProduct, index) => (
                            <Dropdown.Item key={index}>{recipeProduct.product.nombre + ", porciones: " + recipeProduct.porcion + ", gramos: " + recipeProduct.gramos}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>



    );
}

export default RecipeCreator;

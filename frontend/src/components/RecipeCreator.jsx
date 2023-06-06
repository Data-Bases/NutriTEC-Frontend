import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';

function RecipeCreator({ producto }) {
    const [porcion, setPorcion] = useState('');
    const [gramos, setGramos] = useState('');
    const [recipeProducts, setRecipeProducts] = useState([]);

    const handleAddProductClick = () => {
        const newProduct = {
            product: producto,
            porcion: porcion,
            gramos: gramos
        };

        setRecipeProducts([...recipeProducts, newProduct]);
        setPorcion('');
        setGramos('');

        console.log(recipeProducts)
    };

    return (
        <>
            <hr />

            <div className="d-flex" style={{ justifyContent: 'start', alignItems: 'center' }}>
                <div className="d-flex" style={{ marginRight: '10px', justifyContent: 'center', width: '500px', padding: '10px', borderRadius: '5px', boxShadow: '5px 5px 10px' }}>
                    {producto ? <div>{producto.nombre}</div> : <div>Producto</div>}
                </div>
                <Form.Control
                    style={{ marginRight: '10px' }}
                    placeholder="Porción"
                    value={porcion}
                    onChange={(e) => setPorcion(e.target.value)}
                />
                <Form.Control
                    style={{ marginRight: '10px' }}
                    placeholder="g"
                    value={gramos}
                    onChange={(e) => setGramos(e.target.value)}
                />
                <Button onClick={handleAddProductClick} style={{ background: '#1382C9' }}> + </Button>

                <Dropdown style={{marginLeft:'10px'}}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic"> Receta </Dropdown.Toggle>
                    <Dropdown.Menu >
                        {recipeProducts.map((recipeProduct, index) => (
                            <Dropdown.Item key={index}>{recipeProduct.product.nombre + ", porciones: " + recipeProduct.porcion + ", gramos: " + recipeProduct.gramos}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>


        </>
    );
}

export default RecipeCreator;

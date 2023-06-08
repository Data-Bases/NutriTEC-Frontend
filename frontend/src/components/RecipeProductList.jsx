import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ObjectList from './ObjectList';
import RecipeProductInfo from './RecipeProductInfo';

function RecipeProductList({ productos, recetas, recipe, setRecipeFunction, setRecipes }) {

    const [selectedProduct, setSelectedProduct] = useState(productos[0]);
    const [selectedRecipeProduct, setSelectedRecipeProduct] = useState(null);
    const [recipeProducts, setRecipeProducts] = useState(recipe.productos);
    const [isRecipeProductAdded, setIsRecipeProductAdded] = useState(false);
    const [gramos, setGramos] = useState('');

    useEffect(() => {
        if (recipe != null && recipe.productos != null && recipe.productos.length !== 0) {
            setRecipeProducts(recipe.productos);
            setSelectedProduct(productos[0]);
            setSelectedRecipeProduct(recipe.productos[0]);
        } else {
            setRecipeProducts([]);
        }
    }, [recipe]);

    const handleSelectedRecipeProduct = (p) => {
        setSelectedRecipeProduct(p);
        setIsRecipeProductAdded(false);
    };

    const handleButtonDelete = () => {
        if (selectedRecipeProduct != null) {
            if (recetas != null) {
                // Reemplazar por un cambio en la base de datos
                const updatedRecipes = recetas.map((receta) => {
                    if (receta.identificador === recipe.identificador) {
                        const updatedRecipeProduct = receta.productos.filter(
                            (producto) => producto.identificador !== selectedRecipeProduct.identificador
                        );
                        return { ...receta, productos: updatedRecipeProduct };
                    }
                    return receta;
                });
                setRecipes(updatedRecipes);
                setRecipeProducts(
                    updatedRecipes.find((receta) => receta.identificador === recipe.identificador)?.productos || []
                );
            } else {
                const updatedProducts = recipeProducts.filter(
                    (producto) => producto.identificador !== selectedRecipeProduct.identificador
                );
                setRecipeProducts(updatedProducts);
                if (setRecipeFunction != null) setRecipeFunction(recipe);
            }
            setIsRecipeProductAdded(false);
        }
    };

    const handleButtonAdd = () => {
        setIsRecipeProductAdded(true);
    };

    const handleButtonSaveAdd = () => {
        // Reemplazar por un cambio en la base de datos
        const newProduct = { ...selectedProduct };
        newProduct.identificador = 'Z';
        newProduct.gramos = gramos;

        if (recetas != null) {
            const updatedRecipes = recetas.map((receta) => {
                if (receta.identificador === recipe.identificador) {
                    const recipeProducts = [...receta.productos, newProduct];
                    return { ...receta, productos: recipeProducts };
                }
                return receta;
            });
            setRecipes(updatedRecipes);
            setRecipeProducts(updatedRecipes.find((receta) => receta.identificador === recipe.identificador)?.productos || []);
        } else {
            const updatedProducts = [...recipeProducts, newProduct];
            // console.log(updatedProducts);
            setRecipeProducts(updatedProducts);
            if (setRecipeFunction != null) setRecipeFunction(recipe);
        }

        setGramos('');
        setIsRecipeProductAdded(false);
    };

    return (
        <div className="d-flex" style={{ justifyContent: 'center' }}>
            <div className="d-flex" style={{ flexDirection: 'column' }}>
                <ObjectList objects={recipeProducts} setObjectFunction={handleSelectedRecipeProduct} />

                {isRecipeProductAdded ? (
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
                        <Button style={{ width: '100%' }} onClick={handleButtonSaveAdd}>
                            {' '}
                            ✓{' '}
                        </Button>
                    </div>
                ) : (
                    <div className="d-flex" style={{ marginTop: '10px' }}>
                        <Button onClick={handleButtonDelete} style={{ width: '100%', marginRight: '10px' }}>
                            {' '}
                            🗑️{' '}
                        </Button>
                        <Button onClick={handleButtonAdd} style={{ width: '100%' }}>
                            {' '}
                            +{' '}
                        </Button>
                    </div>
                )}
            </div>

            <div className="d-flex" style={{ flexDirection: 'column', marginLeft: '50px' }}>
                <RecipeProductInfo producto={selectedRecipeProduct}></RecipeProductInfo>
            </div>
        </div>
    );
}

export default RecipeProductList;

import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ObjectList from './ObjectList';
import RecipeProductInfo from './RecipeProductInfo';

function RecipeProductList({ productos, recetas, receta, setRecipes }) {

    const [selectedProduct, setSelectedProduct] = useState(productos[0]);
    const [selectedRecipeProduct, setSelectedRecipeProduct] = useState(null);
    const [recipeProducts, setRecipeProducts] = useState(receta.productos);
    const [isRecipeProductAdded, setIsRecipeProductAdded] = useState(false);
    const [gramos, setGramos] = useState('');

    useEffect(() => {
        if (receta != null && receta.productos != null && receta.productos.length !== 0) {
            setRecipeProducts(receta.productos);
            setSelectedProduct(productos[0]);
            setSelectedRecipeProduct(receta.productos[0]);
        } else {
            setRecipeProducts([]);
        }
    }, [receta]);

    const handleselectedRecipeProduct = (p) => {
        setSelectedRecipeProduct(p);
        setIsRecipeProductAdded(false);
    };

    const handleButtonDelete = () => {
        if (selectedRecipeProduct != null) {

            if (receta.identificador != null) {
                // Remplazar por un cambio en la base de datos (delete) -> Aqui se puede quitar de los parametros receta, ya que solo se utiliza para comprobar que sirva (quitar en CustomerRecipe)
                const updatedRecipes = recetas.map((r) => {
                    if (r.identificador === receta.identificador) {
                        const updatedRecipeProduct = r.productos.filter(
                            (producto) => producto.identificador !== selectedRecipeProduct.identificador
                        );
                        return { ...r, productos: updatedRecipeProduct };
                    }
                    return r;
                });
                //
                setRecipes(updatedRecipes);
                setRecipeProducts(updatedRecipes.find((r) => r.identificador === receta.identificador)?.productos || []);
            }
            else {
                const index = receta.productos.findIndex((p) => p.identificador === selectedRecipeProduct.identificador);
                receta.productos.splice(index, 1);

                const updatedProducts = recipeProducts.filter((producto) => producto.identificador !== selectedRecipeProduct.identificador);
                setRecipeProducts(updatedProducts);

            }

            setIsRecipeProductAdded(false);
        }
    };

    const handleButtonAdd = () => {
        setIsRecipeProductAdded(true);
    };

    const handleButtonSaveAdd = () => {

        // Remplazar por un cambio en la base de datos (post)
        const newProduct = { ...selectedProduct };
        newProduct.gramos = gramos;

        if (receta.identificador != null) {
            const updatedRecipes = recetas.map((r) => {
                if (r.identificador === receta.identificador) {
                    const recipeProducts = r.productos;
                    recipeProducts.push(newProduct);
                    return {
                        ...r,
                        productos: recipeProducts
                    };
                }
                return r;
            });
            setRecipes(updatedRecipes);
            setRecipeProducts(updatedRecipes.find((r) => r.identificador === receta.identificador)?.productos || []);
        }
        //

        else{
            receta.productos.push(newProduct);
            setRecipeProducts(receta.productos);

        }

        setGramos('');
        setIsRecipeProductAdded(false);
    };

    return (
        <div className="d-flex" style={{ justifyContent: 'center' }}>
            <div className="d-flex" style={{ flexDirection: 'column' }}>
                <ObjectList objects={recipeProducts} setObjectFunction={handleselectedRecipeProduct} />

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
                        <Button style={{ width: '100%' }} onClick={handleButtonSaveAdd}> ✓ </Button>
                    </div>
                ) : (
                    <div className="d-flex" style={{ marginTop: '10px' }}>
                        <Button onClick={handleButtonDelete} style={{ width: '100%', marginRight: '10px' }}> 🗑️ </Button>
                        <Button onClick={handleButtonAdd} style={{ width: '100%' }}> + </Button>
                    </div>
                )}
            </div>

            <div className="d-flex" style={{ flexDirection: 'column', marginLeft: '50px' }}>
                <RecipeProductInfo producto={selectedRecipeProduct} receta={receta} setRecipes={setRecipes}></RecipeProductInfo>
            </div>
        </div>
    );
}

export default RecipeProductList;
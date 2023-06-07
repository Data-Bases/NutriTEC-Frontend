import React, { useState } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';

function RecipeCreator({ productos, setRecipeFunction }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [porcion, setPorcion] = useState('');
    const [gramos, setGramos] = useState('');
    const [recipeProducts, setRecipeProducts] = useState([]);

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </a>
    ));
    
    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');
    
        return (
        <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
        >
            <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value.toLowerCase())}
            value={value}
            />
            <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
                (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
            </ul>
        </div>
        );
    },
    );

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
                <Dropdown style={{ marginRight: '10px' }} id="product-dropdown" >
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        {selectedProduct ? selectedProduct.name : 'Producto'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu as={CustomMenu}>
                    {productos.map((producto, index) => (
                        <Dropdown.Item key={index} onClick={() => handleDropdownProduct(producto)}>
                            {producto.name}
                        </Dropdown.Item>
                    ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    style={{ marginRight: '10px' }}
                    placeholder="Porción"
                    value={porcion}
                    onChange={(e) => setPorcion(e.target.value)}
                />
                {/* <Form.Control
                    style={{ marginRight: '10px' }}
                    placeholder="gramos"
                    value={gramos}
                    onChange={(e) => setGramos(e.target.value)}
                /> */}
                <Button onClick={handleButtonAddProduct}> + </Button>
            </div>

            <div className="d-flex" style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                <Dropdown >
                    <Dropdown.Toggle  style={{ width:'600px'}} variant="primary" id="dropdown-basic"> Receta </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {recipeProducts.map((recipeProduct, index) => (
                            <Dropdown.Item key={index}>{recipeProduct.product.name + ", porciones: " + recipeProduct.porcion + ", gramos: " + recipeProduct.gramos}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default RecipeCreator;

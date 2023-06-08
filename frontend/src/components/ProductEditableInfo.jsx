import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

import FoodAtributes from './FoodAtributes';

function ProductEditableInfo({ product, isInfoEditableFunction, setProducts }) {

    const [editedName, setEditedName] = useState(product.nombre);
    const [editedGramos, setEditedGramos] = useState(product.gramos);
    const [editedEnergia, setEditedEnergia] = useState(product.energia);
    const [editedGrasa, setEditedGrasa] = useState(product.grasa);
    const [editedSodio, setEditedSodio] = useState(product.sodio);
    const [editedCarbohidratos, setEditedCarbohidratos] = useState(product.carbohidratos);
    const [editedProteina, setEditedProteina] = useState(product.proteina);
    const [editedCalcio, setEditedCalcio] = useState(product.calcio);
    const [editedHierro, setEditedHierro] = useState(product.hierro);

    const handleSaveButton = () => {
        // Remplazar por un cambio en la base de datos
        product.nombre = editedName;
        product.gramos = editedGramos;
        product.energia = editedEnergia;
        product.grasa = editedGrasa;
        product.sodio = editedSodio;
        product.carbohidratos = editedCarbohidratos;
        product.proteina = editedProteina;
        product.calcio = editedCalcio;
        product.hierro = editedHierro;
        //

        // setProducts(?);
        isInfoEditableFunction(false);

    };

    return (
        <div className="d-flex" style={{ flexDirection: 'column' }}>

            <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                <FoodAtributes></FoodAtributes>

                <div className="d-flex" style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <Form.Control style={{ width: '100px' }} value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                    </div>
                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <Form.Control style={{ width: '100px' }} value={editedGramos} onChange={(e) => setEditedGramos(e.target.value)} />
                    </div>
                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <Form.Control style={{ width: '100px' }} value={editedEnergia} onChange={(e) => setEditedEnergia(e.target.value)} />
                    </div>
                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <Form.Control style={{ width: '100px' }} value={editedGrasa} onChange={(e) => setEditedGrasa(e.target.value)} />
                    </div>
                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <Form.Control style={{ width: '100px' }} value={editedSodio} onChange={(e) => setEditedSodio(e.target.value)} />
                    </div>
                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <Form.Control style={{ width: '100px' }} value={editedCarbohidratos} onChange={(e) => setEditedCarbohidratos(e.target.value)} />
                    </div>
                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <Form.Control style={{ width: '100px' }} value={editedProteina} onChange={(e) => setEditedProteina(e.target.value)} />
                    </div>
                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <Form.Control style={{ width: '100px' }} value={editedCalcio} onChange={(e) => setEditedCalcio(e.target.value)} />
                    </div>
                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <Form.Control style={{ width: '100px' }} value={editedHierro} onChange={(e) => setEditedHierro(e.target.value)} />
                    </div>
                </div>
            </div>

            <Button onClick={handleSaveButton} style={{ width: '100%', marginTop: '10px' }}> ✓ </Button>
        </div>

    );
}

export default ProductEditableInfo;
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

import FoodAtributes from './FoodAtributes';

function ProductEditableInfo({ producto, isInfoEditableFunction }) {

    const [editedName, setEditedName] = useState(producto.nombre);
    const [editedGramos, setEditedGramos] = useState(producto.gramos);
    const [editedEnergia, setEditedEnergia] = useState(producto.energia);
    const [editedGrasa, setEditedGrasa] = useState(producto.grasa);
    const [editedSodio, setEditedSodio] = useState(producto.sodio);
    const [editedCarbohidratos, setEditedCarbohidratos] = useState(producto.carbohidratos);
    const [editedProteina, setEditedProteina] = useState(producto.proteina);
    const [editedCalcio, setEditedCalcio] = useState(producto.calcio);
    const [editedHierro, setEditedHierro] = useState(producto.hierro);

    const handleSaveButton = () => {

        // Remplazar por un cambio en la base de datos
        producto.nombre = editedName;
        producto.gramos = editedGramos;
        producto.energia = editedEnergia;
        producto.grasa = editedGrasa;
        producto.sodio = editedSodio;
        producto.carbohidratos = editedCarbohidratos;
        producto.proteina = editedProteina;
        producto.calcio = editedCalcio;
        producto.hierro = editedHierro;
        //

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
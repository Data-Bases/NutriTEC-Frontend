import React, { useState } from 'react';
import ObjectList from './ObjectList';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function ProductList({ productos, setProductFunction }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [editedID, setEditedID] = useState('');
    const [editedEnergia, setEditedEnergia] = useState('');
    const [editedGrasa, setEditedGrasa] = useState('');
    const [editedSodio, setEditedSodio] = useState('');
    const [editedCarbohidratos, setEditedCarbohidratos] = useState('');
    const [editedProteina, setEditedProteina] = useState('');
    const [editedVitaminas, setEditedVitaminas] = useState('');
    const [editedCalcio, setEditedCalcio] = useState('');
    const [editedHierro, setEditedHierro] = useState('');

    const handleSelectedProduct = (producto) => {
        setSelectedProduct(producto)

        if (setProductFunction != null) {
            setProductFunction(producto)
        }

        setEditedID(producto.identificador)
        setEditedEnergia(producto.energia)
        setEditedGrasa(producto.grasa)
        setEditedSodio(producto.sodio)
        setEditedCarbohidratos(producto.carbohidratos)
        setEditedProteina(producto.proteina)
        setEditedVitaminas(producto.vitaminas)
        setEditedCalcio(producto.calcio)
        setEditedHierro(producto.hierro)

        setEditMode(false);
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {

        // ---------- SET ---------- (informacion)
        selectedProduct.identificador = editedID // En vez de esto se puede hacer un GET (mas seguro, menos rapido)
        selectedProduct.energia = editedEnergia
        selectedProduct.grasa = editedGrasa
        selectedProduct.sodio = editedSodio
        selectedProduct.carbohidratos = editedCarbohidratos
        selectedProduct.proteina = editedProteina
        selectedProduct.vitaminas = editedVitaminas
        selectedProduct.calcio = editedCalcio
        selectedProduct.hierro = editedHierro

        setEditMode(false);
    };

    return (
        <>
            <Container
                className="d-flex"
                style={{
                    backgroundColor: 'lightgray',
                    padding: '50px',
                    width: '1000px',
                    borderRadius: '10px',
                    justifyContent: 'center'
                }}
            >
                <div style={{ padding: '0 50px 0 0' }}><ObjectList objetos={productos} setObjectFunction={handleSelectedProduct} /></div>
                <div className="d-flex" style={{ padding: '0 0 0 50px', flexDirection: 'column', width: '400px' }}>
                    <h2>Información del producto:</h2>
                    {selectedProduct && (
                        <>
                            {editMode ?
                                <div className="d-flex" style={{ justifyContent: 'start', flexDirection: 'column' }}>
                                    <Form.Control placeholder='ID' value={editedID} onChange={(e) => setEditedID(e.target.value)} />
                                    <Form.Control placeholder='Energia' value={editedEnergia} onChange={(e) => setEditedEnergia(e.target.value)} />
                                    <Form.Control placeholder='Grasa' value={editedGrasa} onChange={(e) => setEditedGrasa(e.target.value)} />
                                    <Form.Control placeholder='Sodio' value={editedSodio} onChange={(e) => setEditedSodio(e.target.value)} />
                                    <Form.Control placeholder='Carbohidratos' value={editedCarbohidratos} onChange={(e) => setEditedCarbohidratos(e.target.value)} />
                                    <Form.Control placeholder='Proteina' value={editedProteina} onChange={(e) => setEditedProteina(e.target.value)} />
                                    <Form.Control placeholder='Vitaminas' value={editedVitaminas} onChange={(e) => setEditedVitaminas(e.target.value)} />
                                    <Form.Control placeholder='Calcio' value={editedCalcio} onChange={(e) => setEditedCalcio(e.target.value)} />
                                    <Form.Control placeholder='Hierro' value={editedHierro} onChange={(e) => setEditedHierro(e.target.value)} />
                                    <Button onClick={handleSaveClick} style={{ width: '100%', background: '#1382C9' }}> ✓ </Button>
                                </div>
                                :
                                <div className="d-flex" style={{ justifyContent: 'start', flexDirection: 'column' }}>
                                    <p style={{ whiteSpace: "pre-wrap", overflowWrap: 'break-word' }}>ID: {selectedProduct.identificador}</p>
                                    <p style={{ whiteSpace: "pre-wrap", overflowWrap: 'break-word' }}>Energia: {selectedProduct.energia}</p>
                                    <p style={{ whiteSpace: "pre-wrap", overflowWrap: 'break-word' }}>Grasa: {selectedProduct.grasa}</p>
                                    <p style={{ whiteSpace: "pre-wrap", overflowWrap: 'break-word' }}>Sodio: {selectedProduct.sodio}</p>
                                    <p style={{ whiteSpace: "pre-wrap", overflowWrap: 'break-word' }}>Carbohidratos: {selectedProduct.carbohidratos}</p>
                                    <p style={{ whiteSpace: "pre-wrap", overflowWrap: 'break-word' }}>Proteina: {selectedProduct.proteina}</p>
                                    <p style={{ whiteSpace: "pre-wrap", overflowWrap: 'break-word' }}>Vitaminas: {selectedProduct.vitaminas}</p>
                                    <p style={{ whiteSpace: "pre-wrap", overflowWrap: 'break-word' }}>Calcio: {selectedProduct.calcio}</p>
                                    <p style={{ whiteSpace: "pre-wrap", overflowWrap: 'break-word' }}>Hierro: {selectedProduct.hierro}</p>
                                    <Button onClick={handleEditClick} style={{ width: '100%', background: '#1382C9' }}> ✎ </Button>
                                </div>}
                        </>
                    )}
                </div>
            </Container>
        </>

    );
}

export default ProductList;
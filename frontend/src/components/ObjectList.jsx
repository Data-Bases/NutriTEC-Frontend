import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { baseURL } from './backendConection';


function ObjectList({ objects, setObjectFunction }) {

    // Estados
    const [selectedObject, setSelectedObject] = useState(objects[0]);

    useEffect(() => {
        if(selectedObject == null){
            setSelectedObject(objects[0]);
        }
    }, [objects]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Funciones
    const handleClick = (objeto) => {
        setSelectedObject(objeto);
        if (setObjectFunction != null) setObjectFunction(objeto);
    };

    const renderModal = () => (
        <Modal show={show} onHide={handleClose} key={"modal"} centered>
        <Modal.Header closeButton>
          <Modal.Title>Caracteristicas Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control placeholder='Descripcion' value={editedDescripcion} onChange={(e) => setEditedDescripcion(e.target.value)} />
                <Form.Label>Energia</Form.Label>
                <Form.Control placeholder='Energia' value={editedEnergia} onChange={(e) => setEditedEnergia(e.target.value)} />
                <Form.Label>Grasa</Form.Label>
                <Form.Control placeholder='Grasa' value={editedGrasa} onChange={(e) => setEditedGrasa(e.target.value)} />
                <Form.Label>Sodio</Form.Label>
                <Form.Control placeholder='Sodio' value={editedSodio} onChange={(e) => setEditedSodio(e.target.value)} />
                <Form.Label>Carbohidratos</Form.Label>
                <Form.Control placeholder='Carbohidratos' value={editedCarbohidratos} onChange={(e) => setEditedCarbohidratos(e.target.value)} />
                <Form.Label>Proteina</Form.Label>
                <Form.Control placeholder='Proteina' value={editedProteina} onChange={(e) => setEditedProteina(e.target.value)} />
                <Form.Label>Calcio</Form.Label>
                <Form.Control placeholder='Calcio' value={editedCalcio} onChange={(e) => setEditedCalcio(e.target.value)} />
                <Form.Label>Hierro</Form.Label>
                <Form.Control placeholder='Hierro' value={editedHierro} onChange={(e) => setEditedHierro(e.target.value)} />
                <Form.Label>Tamaño Porción</Form.Label>
                <Form.Control placeholder='Tamaño Porción' value={editedPorcion} onChange={(e) => setEditedPorcion(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleNewProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        )
    

    // Return
    return (
        <div
            className="d-flex flex-column p-3"
            style={{
                backgroundColor: '#f8f9fa',
                width: '300px',
                height: '500px',
                border: '1px solid black',
            }}
        >
            {(selectedObject != null) &&
                <div style={{ overflowY: 'auto', maxHeight: '450px' }}>

                    {objects.map((object) => (
                        <Button
                            className="mb-2"
                            key={object.identificador}
                            style={{ width: '100%' }}
                            variant={selectedObject.identificador === object.identificador ? 'primary' : 'light'}
                            onClick={() => handleClick(object)}
                        >
                            {object.nombre}
                        </Button>
                    ))}
                </div>
            }
        </div>
    );
}

export default ObjectList;
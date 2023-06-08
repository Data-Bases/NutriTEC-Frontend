import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { baseURL } from './backendConection';


function ObjectList({ objetos, setObjectFunction }) {

    // Estados
    const [selectedID, setSelectedID] = useState(''); // ID del objeto seleccionado
    const [editedDescripcion, setEditedDescripcion] = useState('');
    const [editedEnergia, setEditedEnergia] = useState('');
    const [editedGrasa, setEditedGrasa] = useState('');
    const [editedSodio, setEditedSodio] = useState('');
    const [editedCarbohidratos, setEditedCarbohidratos] = useState('');
    const [editedProteina, setEditedProteina] = useState('');
    const [editedCalcio, setEditedCalcio] = useState('');
    const [editedHierro, setEditedHierro] = useState('');
    const [editedPorcion, setEditedPorcion] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Valor booleano para saber si se esta editando un objeto 
    const [editedName, setEditedName] = useState(''); // Nombre del objeto editado
    const [newName, setNewName] = useState(''); // Nombre del nuevo objeto
    const [newID, setNewID] = useState(''); // ID del nuevo objeto
    const [isAddDisabled, setIsAddDisabled] = useState(true); // Valor booleano para saber si el boton '+' debe estar descativado

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Funciones
    const handleClick = (objeto) => { // Controlador al hacer click en un objeto de la lista
        setSelectedID(objeto.id);
        axios.get(baseURL + `/product/GetProductById/${objeto.id}`)
            .then(function (response) {

            console.log(response.data);
            let obj = response.data
            setObjectFunction({
                nombre: obj.name,
                identificador: obj.id,
                descripcion: obj.description,
                energia: obj.energy,
                grasa: obj.fat,
                sodio: obj.sodium,
                carbohidratos: obj.carbs,
                proteina: obj.protein,
                calcio: obj.calcium,
                hierro: obj.iron,
                porcion: obj.portionSize
            })
            
            })
            .catch(function (error) {
            if (error.response) { // GET response with a status code not in range 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) { // no response
                console.log(error.request);
                // instance of XMLHttpRequest in the browser
                // instance ofhttp.ClientRequest in node.js
            } else { // Something wrong in setting up the request
                console.log('Error', error.message);
            }
            console.log(error.config);
            });

    };

    const handleDoubleClick = (objeto) => { // Controlador al hacer doble click en un objeto de la lista
        setEditedName(objeto.name);
        setIsEditing(true);
    };

    const handleEditInputChange = (event) => { // Controlador para guardar el nuevo nombre del objeto en un estado
        setEditedName(event.target.value);
    };

    const handleEditSubmit = (objeto) => { // Controlador para guardar el nuevo nombre del objeto

        // ---------- SET ----------

        objeto.name = editedName; // En vez de esto se puede hacer un GET (mas seguro, menos rapido)
        setIsEditing(false);
    };

    const handleDelete = (objeto) => { // Controlador para eliminar un objeto
        const index = objetos.findIndex((o) => o.id === objeto.id);

        // ---------- SET ----------

        objetos.splice(index, 1); // En vez de esto se puede hacer un GET (mas seguro, menos rapido)
        setIsEditing(false);
    };

    const handleNewName = (event) => { // Controlador para guardar el nombre del nuevo objeto en un estado
        setNewName(event.target.value);
        if (event.target.value === '' || newID === '') {
            setIsAddDisabled(true)
        }
        else {
            setIsAddDisabled(false)
        }
    };

    const handleNewID = (event) => { // Controlador para guardar el nombre del nuevo objeto en un estado
        setNewID(event.target.value);
        if (event.target.value === '' || newName === '') {
            setIsAddDisabled(true)
        }
        else {
            setIsAddDisabled(false)
        }
    };

    const handleNewSubmit = (event) => { // Controlador para guardar el nuevo objeto
        event.preventDefault();
        handleShow();
        setIsAddDisabled(true)
    };

    const handleNewProduct = () => {
        handleClose();

        const body = {
            name: newName,
            description: editedDescripcion,
            id: newID,
            energy: editedEnergia,
            fat: editedGrasa,
            sodium: editedSodio,
            carbs: editedCarbohidratos,
            protein: editedProteina,
            calcium: editedCalcio,
            iron: editedHierro,
            portionSize: editedPorcion 
        }

        console.log(body);

        axios.post(
            baseURL + `/product/AddNewProduct`, body
          ).then(function (response) {
          
            setEditedDescripcion('');
            setEditedEnergia('');
            setEditedGrasa('');
            setEditedSodio('');
            setEditedCarbohidratos('');
            setEditedProteina('');
            setEditedCalcio('');
            setEditedHierro('');
            setEditedPorcion('');
            setIsEditing('');
            setEditedName('');
            setNewName('');
            setNewID('');
          
          }).catch(function (error) {
            if (error.response) { // POST response with a status code not in range 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) { // no response
              console.log(error.request);
              // instance of XMLHttpRequest in the browser
              // instance ofhttp.ClientRequest in node.js
            } else { // Something wrong in setting up the request
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
    };

    const renderObjetos = () => {
        return objetos.map((objeto, i) => {
            if (isEditing && (selectedID === objeto.id)) { // Renderizar el objeto al que se le hace doble click si se esta editando y hay un objeto seleccionado
                return (
                    <form onSubmit={() => handleEditSubmit(objeto)} key={i}>
                        <input
                            type="text"
                            value={editedName}
                            onChange={handleEditInputChange}
                            className="mb-2 form-control"
                        />
                        <Button type="submit" variant="success" className="mb-2"> ✓ </Button>
                        <Button variant="danger" className="mb-2 ml-2" onClick={() => handleDelete(objeto)}> ⌫ </Button>
                    </form>
                );
            }
            else { // Renderizar el objeto al que se le hace click
                return (
                    <Button
                        key={objeto.id}
                        variant={selectedID === objeto.id ? 'primary' : 'light'}
                        className="mb-2"
                        style={{ width: '100%' }}
                        onClick={() => handleClick(objeto)}
                        onDoubleClick={() => handleDoubleClick(objeto)}
                    >
                        {objeto.name}
                    </Button>
                );
            }
        });
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
                width: '400px',
                height: '500px',
                border: '1px solid black',
            }}
        >
            {renderModal()}
            <div style={{ overflowY: 'auto', maxHeight: '450px' }}>
                {renderObjetos()}
            </div>
            <form onSubmit={handleNewSubmit} className="form-inline mt-3">
                <div className="d-flex">
                    <input
                        type="text"
                        value={newName}
                        onChange={handleNewName}
                        className="form-control mr-2 flex-grow-1 mx-2"
                        placeholder="Nombre"
                        display='flex'
                    />
                    <input
                        type="text"
                        value={newID}
                        onChange={handleNewID}
                        className="form-control mr-2 flex-grow-1 mx-2"
                        placeholder="ID"
                        display='flex'
                    />
                    <Button type="submit" className="ml-auto" disabled={isAddDisabled} style={{ background: '#1382C9' }}> + </Button>
                </div>
            </form>
        </div>
    );
}

export default ObjectList;
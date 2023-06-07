import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ObjectList({ objetos, setObjectFunction }) {

    // Estados
    const [selectedObject, setSelectedObject] = useState(null);
    const [selectedObjectID, setSelectedObjectID] = useState('');


    // Funciones
    const handleClick = (objeto) => {
        setSelectedObject(objeto);
        setSelectedObjectID(objeto.identificador);
        if (setObjectFunction != null) setObjectFunction(objeto);

    };

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
            {(objetos != null) &&
                <div style={{ overflowY: 'auto', maxHeight: '450px' }}>

                    {objetos.map((objeto) => (
                        <Button
                            className="mb-2"
                            key={objeto.identificador}
                            style={{ width: '100%' }}
                            variant={selectedObjectID === objeto.identificador ? 'primary' : 'light'}
                            onClick={() => handleClick(objeto)}
                        >
                            {objeto.nombre}
                        </Button>
                    ))}
                </div>
            }
        </div>
    );
}

export default ObjectList;
import React, { useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ObjectList({ objects, setObjectFunction }) {

    // Estados
    const [selectedObject, setSelectedObject] = useState(objects[0]);

    useEffect(() => {
        if(selectedObject == null){
            setSelectedObject(objects[0]);
        }
    }, [objects]);

    // Funciones
    const handleClick = (objeto) => {
        setSelectedObject(objeto);
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
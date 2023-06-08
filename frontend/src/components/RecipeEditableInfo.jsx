import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

import FoodAtributes from './FoodAtributes';

function RecipeEditableInfo({ receta, isInfoEditableFunction }) {

    const [editedName, setEditedName] = useState(receta.nombre);

    // // UseEffect
    // useEffect(() => {
    //     if (receta != null) {
    //         setEditedName(receta.nombre);
    //     }
    // }, [receta]);
    // //

    const handleSaveButton = () => {

        // Remplazar por un cambio en la base de datos
        receta.nombre = editedName;
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
                        <p style={{ overflowWrap: 'break-word' }}> {receta.gramos}</p>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {receta.energia}</p>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {receta.grasa}</p>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {receta.sodio}</p>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {receta.carbohidratos}</p>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {receta.proteina}</p>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {receta.calcio}</p>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {receta.hierro}</p>
                    </div>
                </div>
            </div>

            <Button onClick={handleSaveButton} style={{ width: '100%', marginTop: '10px' }}> ✓ </Button>
        </div>

    );
}

export default RecipeEditableInfo;
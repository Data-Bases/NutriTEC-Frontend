import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import FoodAtributes from './FoodAtributes';

function RecipeProductEditableInfo({ producto, receta, isInfoEditableFunction, setRecipes }) {

    const [editedGramos, setEditedGramos] = useState(producto.gramos);

    const handleSaveButton = () => {

        // Remplazar por un cambio en la base de datos (put)
        if(receta.identificador != null){
            producto.gramos = editedGramos;
        }
        //
        //setRecipes() hay que actualizar las recetas despues de lo de arriba

        else{
            const index = receta.productos.findIndex((r) => r.identificador === producto.identificador);
            receta.productos[index].gramos = editedGramos
        }
    

        isInfoEditableFunction(false);

    };

    return (
        <div className="d-flex" style={{ flexDirection: 'column' }}>

            <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                <FoodAtributes></FoodAtributes>

                <div className="d-flex" style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {producto.nombre} </p>
                    </div>
                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <Form.Control style={{ width: '100px' }} value={editedGramos} onChange={(e) => setEditedGramos(e.target.value)} />
                    </div>
                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {producto.energia}</p>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {producto.grasa}</p>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {producto.sodio}</p>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {producto.carbohidratos}</p>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {producto.proteina}</p>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {producto.calcio}</p>
                    </div>

                    <div className="d-flex" style={{ justifyContent: 'end' }}>
                        <p style={{ overflowWrap: 'break-word' }}> {producto.hierro}</p>
                    </div>
                </div>
            </div>

            <Button onClick={handleSaveButton} style={{ width: '100%', marginTop: '10px' }}> ✓ </Button>
        </div>

    );
}

export default RecipeProductEditableInfo;
import React from 'react';

import FoodAtributes from './FoodAtributes';


function FoodInfo({ alimento }) {

    // Se debe pedir a la base la info del alimento, puede ser producto o receta

    return (
        <div className="d-flex" style={{ justifyContent: 'space-between' }}>
            <FoodAtributes></FoodAtributes>

            <div className="d-flex" style={{ flexDirection: 'column' }}>
                <div className="d-flex" style={{ justifyContent: 'end' }}>
                    <p style={{ overflowWrap: 'break-word' }}> {alimento.nombre} </p>
                </div>

                <div className="d-flex" style={{ justifyContent: 'end' }}>
                    <p style={{ overflowWrap: 'break-word' }}> {alimento.gramos}</p>
                </div>

                <div className="d-flex" style={{ justifyContent: 'end' }}>
                    <p style={{ overflowWrap: 'break-word' }}> {alimento.energia}</p>
                </div>

                <div className="d-flex" style={{ justifyContent: 'end' }}>
                    <p style={{ overflowWrap: 'break-word' }}> {alimento.grasa}</p>
                </div>

                <div className="d-flex" style={{ justifyContent: 'end' }}>
                    <p style={{ overflowWrap: 'break-word' }}> {alimento.sodio}</p>
                </div>

                <div className="d-flex" style={{ justifyContent: 'end' }}>
                    <p style={{ overflowWrap: 'break-word' }}> {alimento.carbohidratos}</p>
                </div>

                <div className="d-flex" style={{ justifyContent: 'end' }}>
                    <p style={{ overflowWrap: 'break-word' }}> {alimento.proteina}</p>
                </div>

                <div className="d-flex" style={{ justifyContent: 'end' }}>
                    <p style={{ overflowWrap: 'break-word' }}> {alimento.calcio}</p>
                </div>

                <div className="d-flex" style={{ justifyContent: 'end' }}>
                    <p style={{ overflowWrap: 'break-word' }}> {alimento.hierro}</p>
                </div>
            </div>
        </div>

    );
}

export default FoodInfo;
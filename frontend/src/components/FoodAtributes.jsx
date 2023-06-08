import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FoodAtributes() {

    return (
        <div className="d-flex" style={{flexDirection:'column'}}>
            <p style={{ fontWeight: 'bold' }}> {'Nombre:  '} </p>
            <p style={{ fontWeight: 'bold' }}> {'Gramos(g): '} </p>
            <p style={{ fontWeight: 'bold' }}> {'Energia(Kcal): '} </p>
            <p style={{ fontWeight: 'bold' }}> {'Grasa(mg): '} </p>
            <p style={{ fontWeight: 'bold' }}> {'Sodio(mg): '} </p>
            <p style={{ fontWeight: 'bold' }}> {'Carbohidratos(g): '} </p>
            <p style={{ fontWeight: 'bold' }}> {'Proteina(g): '} </p>
            <p style={{ fontWeight: 'bold' }}> {'Calcio(mg): '} </p>
            <p style={{ fontWeight: 'bold' }}> {'Hierro(mg): '} </p>
        </div>
    );
}

export default FoodAtributes;
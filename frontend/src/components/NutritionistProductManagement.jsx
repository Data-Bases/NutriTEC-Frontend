import React from 'react';
import ProductList from './ProductList';


function NutritionistProductManagement({ productos }) {

    return (
        <>
            <ProductList productos={productos}></ProductList>
        </>
    );
}

export default NutritionistProductManagement;

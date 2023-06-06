import React from 'react';
import ProductList from './ProductList';

import 'bootstrap/dist/css/bootstrap.min.css';

function NutritionistProductManagement({ productos }) {

    return (
        <>
            <ProductList productos={productos}></ProductList>
        </>
    );
}

export default NutritionistProductManagement;

import React from 'react';
import ProductList from './ProductList';

import 'bootstrap/dist/css/bootstrap.min.css';

function NutricionalProducts({ productos }) {

    return (
        <div>
            <ProductList productos={productos}></ProductList>
        </div>
    );
}

export default NutricionalProducts;

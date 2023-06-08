import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomerInformationRecordView from './CustomerInformationRecordView';
import CustomerProductManagementView from './CustomerProductManagementView';
import CustomerRecipeManagementView from './CustomerRecipeManagementView';

import NutricionistProductManagementView from './NutricionistProductManagementView';

import AdminProductManagementView from './AdminProductManagementView';

function SuperiorComponent() {
    // Esto debe tenerlo un componente superior
    const [products, setProducts] = useState([]);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {

        const dBProducts = [
            {
                identificador: '1',
                nombre: 'producto 1'
            },
            {
                identificador: '2',
                nombre: 'producto 2'
            },
            {
                identificador: '3',
                nombre: 'producto 3'
            }
        ];

        const dBRecipes = [
            {
                identificador: '4',
                nombre: 'receta 1',
                gramos: '###',
                energia: '###',
                grasa: '###',
                sodio: '###',
                carbohidratos: '###',
                proteina: '###',
                calcio: '###',
                hierro: '###',
                productos: [{
                    identificador: '1',
                    nombre: 'producto 1',
                    gramos: '100',
                    energia: '###',
                    grasa: '###',
                    sodio: '###',
                    carbohidratos: '###',
                    proteina: '###',
                    calcio: '###',
                    hierro: '###'
                },
                {
                    identificador: '2',
                    nombre: 'producto 2',
                    gramos: '1502',
                    energia: '###',
                    grasa: '###',
                    sodio: '###',
                    carbohidratos: '###',
                    proteina: '###',
                    calcio: '###',
                    hierro: '###'
                }]
            },
            {
                identificador: '5',
                nombre: 'receta 2',
                gramos: '###',
                energia: '###',
                grasa: '###',
                sodio: '###',
                carbohidratos: '###',
                proteina: '###',
                calcio: '###',
                hierro: '###',
                productos: [{
                    identificador: '2',
                    nombre: 'producto 2',
                    gramos: '120',
                    energia: '###',
                    grasa: '###',
                    sodio: '###',
                    carbohidratos: '###',
                    proteina: '###',
                    calcio: '###',
                    hierro: '###'
                },
                {
                    identificador: '3',
                    nombre: 'producto 3',
                    gramos: '340',
                    energia: '###',
                    grasa: '###',
                    sodio: '###',
                    carbohidratos: '###',
                    proteina: '###',
                    calcio: '###',
                    hierro: '###'
                }]
            },
            {
                identificador: '6',
                nombre: 'receta 3',
                gramos: '###',
                energia: '###',
                grasa: '###',
                sodio: '###',
                carbohidratos: '###',
                proteina: '###',
                calcio: '###',
                hierro: '###',
                productos: [{
                    identificador: '1',
                    nombre: 'producto 1',
                    gramos: '340',
                    energia: '###',
                    grasa: '###',
                    sodio: '###',
                    carbohidratos: '###',
                    proteina: '###',
                    calcio: '###',
                    hierro: '###'
                },
                {
                    identificador: '3',
                    nombre: 'producto 3',
                    gramos: '170',
                    energia: '###',
                    grasa: '###',
                    sodio: '###',
                    carbohidratos: '###',
                    proteina: '###',
                    calcio: '###',
                    hierro: '###'
                }]
            }
        ];

        setProducts(dBProducts);
        setRecipes(dBRecipes);

    }, []);

    const handleSetProducts = (p) => {
        setProducts(p);
    };

    const handleSetRecipes = (r) => {
        setRecipes(r);
    };
    //

    return (
        <>
            {(recipes.length != 0 && products.length != 0 ) && <>
                <CustomerInformationRecordView productos={products} recetas={recipes} setRecipes={handleSetRecipes}></CustomerInformationRecordView>
                {/* <CustomerProductManagementView products={products} setProducts={handleSetProducts}></CustomerProductManagementView> */}
                {/* <CustomerRecipeManagementView productos={products} recetas={recipes} setRecipes={handleSetRecipes}></CustomerRecipeManagementView> */}

                {/* <NutricionistProductManagementView products={products} setProducts={handleSetProducts}></NutricionistProductManagementView> */}

                {/* <AdminProductManagementView products={products} setProducts={handleSetProducts}></AdminProductManagementView> */}
            
            </>}

        </>
    );
}
export default SuperiorComponent;

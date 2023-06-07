import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.scss";
import Login from "./components/LogIn";
import SignUp from "./components/SingUp";
import Welcome from "./components/Welcome";
import SignUpChoose from "./components/SingUpChoose";

import CustomerInformationRecordView from './components/CustomerInformationRecordView';
import CustomerProductManagementView from './components/CustomerProductManagementView';
import CustomerRecipeManagementView from './components/CustomerRecipeManagementView';

import { pathToRegexp } from "path-to-regexp";
import { Router, Switch, Route, Link, useRoute } from "wouter";
import makeCachedMatcher from "wouter/matcher";
/*
 * This function specifies how strings like /app/:users/:items* are
 * transformed into regular expressions.
 *
 * Note that it is just a wrapper around `pathToRegexp`, which uses a
 * slighly different convetion of returning the array of keys.
 *
 * @param {string} path — a path like "/:foo/:bar"
 * @return {{ keys: [], regexp: RegExp }}
 */

const convertPathToRegexp = (path) => {
    let keys = [];

    // we use original pathToRegexp package here with keys
    const regexp = pathToRegexp(path, keys);
    return { keys, regexp };
};

// signature of the matcher fn: (pattern, path) => [success, params]
const customMatcher = makeCachedMatcher(convertPathToRegexp);

const productos = [
    {
        identificador: '1001',
        nombre: 'producto 1',
        gramos: '###',
        energia: '###',
        grasa: '###',
        sodio: '###',
        carbohidratos: '###',
        proteina: '###',
        calcio: '###X',
        hierro: '###X'
    },
    {
        identificador: '1002',
        nombre: 'producto 2',
        gramos: '###',
        energia: '###',
        grasa: '###',
        sodio: '###',
        carbohidratos: '###',
        proteina: '###',
        calcio: '###X',
        hierro: '###X'
    },
    {
        identificador: '1003',
        nombre: 'producto 3',
        gramos: '###',
        energia: '###',
        grasa: '###',
        sodio: '###',
        carbohidratos: '###',
        proteina: '###',
        calcio: '###X',
        hierro: '###X'
    }
];

const recetas = [
    {
        identificador: '2001',
        nombre: 'receta 1',
        gramos: '###',
        energia: '###',
        grasa: '###',
        sodio: '###',
        carbohidratos: '###',
        proteina: '###',
        calcio: '###X',
        hierro: '###X',
        productos: [{
            identificador: '1001',
            nombre: 'producto 1',
            gramos: '100',
            energia: '###',
            grasa: '###',
            sodio: '###',
            carbohidratos: '###',
            proteina: '###',
            calcio: '###X',
            hierro: '###X'
        },
        {
            identificador: '1002',
            nombre: 'producto 2',
            gramos: '1502',
            energia: '###',
            grasa: '###',
            sodio: '###',
            carbohidratos: '###',
            proteina: '###',
            calcio: '###X',
            hierro: '###X'
        }]
    },
    {
        identificador: '2002',
        nombre: 'receta 2',
        gramos: '###',
        energia: '###',
        grasa: '###',
        sodio: '###',
        carbohidratos: '###',
        proteina: '###',
        calcio: '###X',
        hierro: '###X',
        productos: [{
            identificador: '1001',
            nombre: 'producto 2',
            gramos: '120',
            energia: '###',
            grasa: '###',
            sodio: '###',
            carbohidratos: '###',
            proteina: '###',
            calcio: '###X',
            hierro: '###X'
        },
        {
            identificador: '1002',
            nombre: 'producto 3',
            gramos: '340',
            energia: '###',
            grasa: '###',
            sodio: '###',
            carbohidratos: '###',
            proteina: '###',
            calcio: '###X',
            hierro: '###X'
        }]
    },
    {
        identificador: '2003',
        nombre: 'receta 3',
        gramos: '###',
        energia: '###',
        grasa: '###',
        sodio: '###',
        carbohidratos: '###',
        proteina: '###',
        calcio: '###X',
        hierro: '###X',
        productos: [{
            identificador: '1001',
            nombre: 'producto 1',
            gramos: '340',
            energia: '###',
            grasa: '###',
            sodio: '###',
            carbohidratos: '###',
            proteina: '###',
            calcio: '###X',
            hierro: '###X'
        },
        {
            identificador: '1002',
            nombre: 'producto 3',
            gramos: '170',
            energia: '###',
            grasa: '###',
            sodio: '###',
            carbohidratos: '###',
            proteina: '###',
            calcio: '###X',
            hierro: '###X'
        }]
    }
];


function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            {/* <CustomerInformationRecordView alimentos={[...productos, ...recetas]} ></CustomerInformationRecordView> */}
            {/* <CustomerProductManagementView productos={productos}></CustomerProductManagementView> */}
            <CustomerRecipeManagementView productos={productos} recetas={recetas}></CustomerRecipeManagementView>
        </>
    );
}

export default App;

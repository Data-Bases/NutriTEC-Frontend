import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.scss";
import Login from "./components/LogIn";
import SignUp from "./components/SingUp";
import Welcome from "./components/welcome";
import SignUpChoose from "./components/SingUpChoose";

import ProductList from './components/ProductList';

import ProductManagement from './components/ProductManagement';

import TabBar from './components/NavigationBar';

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
        nombre: 'producto 1',
        identificador: '1001',
        energia: 'XXXXXXXXXX',
        grasa: 'XXXXXXXXXX',
        sodio: 'XXXXXXXXXX',
        carbohidratos: 'XXXXXXXXXX',
        proteina: 'XXXXXXXXXX',
        vitaminas: 'XXXXXXXXXXX',
        calcio: 'XXXXXXXXXXX',
        hierro: 'XXXXXXXXXXX'
    },
    {
        nombre: 'producto 2',
        identificador: '1002',
        energia: 'XXXXXXXXXX',
        grasa: 'XXXXXXXXXX',
        sodio: 'XXXXXXXXXX',
        carbohidratos: 'XXXXXXXXXX',
        proteina: 'XXXXXXXXXX',
        vitaminas: 'XXXXXXXXXXX',
        calcio: 'XXXXXXXXXXX',
        hierro: 'XXXXXXXXXXX'
    },
    {
        nombre: 'producto 3',
        identificador: '1003',
        energia: 'XXXXXXXXXX',
        grasa: 'XXXXXXXXXX',
        sodio: 'XXXXXXXXXX',
        carbohidratos: 'XXXXXXXXXX',
        proteina: 'XXXXXXXXXX',
        vitaminas: 'XXXXXXXXXXX',
        calcio: 'XXXXXXXXXXX',
        hierro: 'XXXXXXXXXXX'
    },
    {
        nombre: 'producto 4',
        identificador: '1004',
        energia: 'XXXXXXXXXX',
        grasa: 'XXXXXXXXXX',
        sodio: 'XXXXXXXXXX',
        carbohidratos: 'XXXXXXXXXX',
        proteina: 'XXXXXXXXXX',
        vitaminas: 'XXXXXXXXXXX',
        calcio: 'XXXXXXXXXXX',
        hierro: 'XXXXXXXXXXX'
    },
    {
        nombre: 'producto 5',
        identificador: '1005',
        energia: 'XXXXXXXXXX',
        grasa: 'XXXXXXXXXX',
        sodio: 'XXXXXXXXXX',
        carbohidratos: 'XXXXXXXXXX',
        proteina: 'XXXXXXXXXX',
        vitaminas: 'XXXXXXXXXXX',
        calcio: 'XXXXXXXXXXX',
        hierro: 'XXXXXXXXXXX'
    },
    {
        nombre: 'producto 6',
        identificador: '1006',
        energia: 'XXXXXXXXXX',
        grasa: 'XXXXXXXXXX',
        sodio: 'XXXXXXXXXX',
        carbohidratos: 'XXXXXXXXXX',
        proteina: 'XXXXXXXXXX',
        vitaminas: 'XXXXXXXXXXX',
        calcio: 'XXXXXXXXXXX',
        hierro: 'XXXXXXXXXXX'
    },
    {
        nombre: 'producto 7',
        identificador: '1007',
        energia: 'XXXXXXXXXX',
        grasa: 'XXXXXXXXXX',
        sodio: 'XXXXXXXXXX',
        carbohidratos: 'XXXXXXXXXX',
        proteina: 'XXXXXXXXXX',
        vitaminas: 'XXXXXXXXXXX',
        calcio: 'XXXXXXXXXXX',
        hierro: 'XXXXXXXXXXX'
    },
    {
        nombre: 'producto 8',
        identificador: '1008',
        energia: 'XXXXXXXXXX',
        grasa: 'XXXXXXXXXX',
        sodio: 'XXXXXXXXXX',
        carbohidratos: 'XXXXXXXXXX',
        proteina: 'XXXXXXXXXX',
        vitaminas: 'XXXXXXXXXXX',
        calcio: 'XXXXXXXXXXX',
        hierro: 'XXXXXXXXXXX'
    },
    {
        nombre: 'producto 9',
        identificador: '1009',
        energia: 'XXXXXXXXXX',
        grasa: 'XXXXXXXXXX',
        sodio: 'XXXXXXXXXX',
        carbohidratos: 'XXXXXXXXXX',
        proteina: 'XXXXXXXXXX',
        vitaminas: 'XXXXXXXXXXX',
        calcio: 'XXXXXXXXXXX',
        hierro: 'XXXXXXXXXXX'
    },
    {
        nombre: 'producto 10',
        identificador: '10010',
        energia: 'XXXXXXXXXX',
        grasa: 'XXXXXXXXXX',
        sodio: 'XXXXXXXXXX',
        carbohidratos: 'XXXXXXXXXX',
        proteina: 'XXXXXXXXXX',
        vitaminas: 'XXXXXXXXXXX',
        calcio: 'XXXXXXXXXXX',
        hierro: 'XXXXXXXXXXX'
    },
    {
        nombre: 'producto 11',
        identificador: '10011',
        energia: 'XXXXXXXXXX',
        grasa: 'XXXXXXXXXX',
        sodio: 'XXXXXXXXXX',
        carbohidratos: 'XXXXXXXXXX',
        proteina: 'XXXXXXXXXX',
        vitaminas: 'XXXXXXXXXXX',
        calcio: 'XXXXXXXXXXX',
        hierro: 'XXXXXXXXXXX'
    },
    {
        nombre: 'producto 12',
        identificador: '10012',
        energia: 'XXXXXXXXXX',
        grasa: 'XXXXXXXXXX',
        sodio: 'XXXXXXXXXX',
        carbohidratos: 'XXXXXXXXXX',
        proteina: 'XXXXXXXXXX',
        vitaminas: 'XXXXXXXXXXX',
        calcio: 'XXXXXXXXXXX',
        hierro: 'XXXXXXXXXXX'
    }
];


function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <ProductManagement objetosBD={productos}></ProductManagement>
            <TabBar></TabBar>
        </>
        // <Router matcher={customMatcher}>
        //     <div>
        //         <Switch>
        //             <Route path="/" component={Welcome} />
        //             <Route path="/login"><Login/></Route>
        //             <Route path="/signup"><SignUpChoose/></Route>
        //             <Route path="/signup/nutricionista-1"><SignUp pantalla="N1"/></Route>
        //             <Route path="/signup/nutricionista-2"><SignUp pantalla="N2"/></Route>
        //             <Route path="/signup/cliente-1"><SignUp pantalla="C1"/></Route>
        //             <Route path="/signup/cliente-2"><SignUp pantalla="C2"/></Route>
        //             <Route path="/:anything">404 Página no encontrada</Route>
        //         </Switch>
        //     </div>
        // </Router>
    );
}

export default App;

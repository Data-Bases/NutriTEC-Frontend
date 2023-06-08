import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./components/LogIn";
import SignUp from "./components/SingUp";
import Welcome from "./components/Welcome";
import SignUpChoose from "./components/SingUpChoose";

import ProductList from './components/ProductList';

import AdminProductManagement from './components/AdminProductManagement';
import NutritionistProductManagement from './components/NutritionistProductManagement.jsx';
import CustomerProductManagement from './components/CustomerProductManagement';
import CustomerInformationRecord from './components/CustomerInformationRecord.jsx'
import TabBar from './components/NavigationBar';
import Plans from "./components/Plans";

import { pathToRegexp } from "path-to-regexp";
import { Router, Switch, Route, Link, useRoute } from "wouter";
import makeCachedMatcher from "wouter/matcher";
import "./styles/App.scss";
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

function App() {
    const [count, setCount] = useState(0);

    return (
        // <>
        //     <ProductManagement objetosBD={productos}></ProductManagement>
        //     <TabBar></TabBar>
        // </>
        <Router matcher={customMatcher}>
            <div>
                <TabBar/>
                <Switch>
                    <Route path="/" component={Welcome} />
                    <Route path="/login"><Login/></Route>
                    <Route path="/signup"><SignUpChoose/></Route>
                    <Route path="/signup/:screen">{(props)=><SignUp pantalla={props.screen}/>}</Route>
                    <Route path="/client"><Plans/></Route>
                    <Route path="/client/info"><CustomerInformationRecord/></Route>
                    <Route path="/client/products"><CustomerProductManagement/></Route>
                    <Route path="/nutricionist">Profile</Route>
                    <Route path="/nutricionist/plans"><Plans/></Route>
                    <Route path="/nutricionist/products"><NutritionistProductManagement/></Route>
                    <Route path="/admin"><AdminProductManagement/></Route>
                    <Route path="/:anything">404 Página no encontrada</Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

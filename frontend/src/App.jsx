import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./components/LogIn";
import SignUp from "./components/SingUp";
import Welcome from "./components/Welcome";
import SignUpChoose from "./components/SingUpChoose";

import ProductList from './components/ProductList';

import AdminProductManagementView from './components/AdminProductManagementView';
import NutricionistProductManagementView from "./components/NutricionistProductManagementView";
import CustomerInformationRecordView from "./components/CustomerInformationRecordView";
import CustomerProductManagementView from "./components/CustomerProductManagementView";
import CustomerRecipeManagementView from "./components/CustomerRecipeManagementView";
import TabBar from './components/NavigationBar';
import Plans from "./components/Plans";

import { pathToRegexp } from "path-to-regexp";
import { Router, Switch, Route, Link, useRoute } from "wouter";
import makeCachedMatcher from "wouter/matcher";
import "./styles/App.scss";
import SuperiorComponent from "./components/SuperiorComponent";

import { UpdateProvider } from "./components/backendConection";
import ClientPlan from "./components/clientPlan";
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
        <UpdateProvider>
        <Router matcher={customMatcher}>
            <div>
                <TabBar/>
                <Switch>
                    <Route path="/" component={Welcome} />
                    <Route path="/login"><Login/></Route>
                    <Route path="/signup"><SignUpChoose/></Route>
                    <Route path="/signup/:screen">{(props)=><SignUp pantalla={props.screen}/>}</Route>
                    <Route path="/client"><ClientPlan/></Route>
                    <Route path="/client/info"><SuperiorComponent vista={"CI"}/></Route>
                    <Route path="/client/products"><SuperiorComponent vista={"CP"}/></Route>
                    <Route path="/client/recipes"><SuperiorComponent vista={"CR"}/></Route>
                    <Route path="/nutricionist">Profile</Route>
                    <Route path="/nutricionist/plans"><Plans/></Route>
                    <Route path="/nutricionist/products"><SuperiorComponent vista={"NP"}/></Route>
                    <Route path="/admin"><SuperiorComponent vista={"AP"}/></Route>
                    <Route path="/:anything">404 Página no encontrada</Route>
                </Switch>
            </div>
        </Router>
        </UpdateProvider>
    );
}

export default App;

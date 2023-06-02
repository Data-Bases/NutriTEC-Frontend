import React from "react";
import axios from "axios";
import { baseURL } from "./backendConection";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "wouter";
import "../styles/Custom.scss";
import "../styles/Credentials.scss";
import fruits from "../assets/nutricion1.png";

function Welcome() {
    return (
        <div className="credentials d-flex p-5">
            <img src={fruits} className="welcome-img" />
        </div>
    );
}

export default Welcome;

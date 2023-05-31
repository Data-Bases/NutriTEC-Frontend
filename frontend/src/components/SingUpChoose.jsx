import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "./backendConection";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "wouter";
import "../styles/Custom.scss";
import "../styles/Credentials.scss";
import herbs from "../assets/herbs.jpg";
import nutri from "../assets/nutri.jpg";
import cliente from "../assets/cliente.jpg";

function SignUpChoose() {
    return (
        <div className="credentials p-5 d-flex">
            <img src={herbs} className="credentials-bg" />
            <div className="credentials-card">
                <div className="credentials-container">
                    <Link to="/signup/nutricionista-1">
                        <img src={nutri} />
                        <div class="overlay-left">
                            <div class="overlay-text">Nutricionista</div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="credentials-card">
                <div className="credentials-container">
                    <Link to="/signup/cliente-1">
                        <img src={cliente} />
                        <div class="overlay-rigth">
                            <div class="overlay-text">Cliente</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpChoose;

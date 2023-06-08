import React, { useState } from "react";
import "../styles/Plans.scss";

const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
];

function Plans() {
    const [dayFilter, setDayFilter] = useState("");
    // console.log(Date(Date.now()).toISOString());
    const nombreDelDiaSegunFecha = (fecha) =>
        [
            "Domingo",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
            "Domingo",
        ][new Date(fecha).getDay()];

    return (
        <div className="d-flex plans">
            <div className="d-flex plans-header">
                <h3>{nombreDelDiaSegunFecha(dayFilter)}</h3>
                <input
                    type="date"
                    name="filter"
                    id="filter"
                    defaultValue={"1 1 2022"}
                    onChange={(e) => {
                        setDayFilter(e.target.value);
                    }}
                />
            </div>
            <div className="d-flex plans-body">
                <div className="d-flex plans-desayuno">
                    <h5>Desayuno</h5>
                </div>
                <div className="d-flex plans-almuerzo">
                    <h5>Almuerzo</h5>
                </div>
                <div className="d-flex plans-cena">
                    <h5>Cena</h5>
                </div>
            </div>
            <hr className="divider" />
            <div className="d-flex plans-snack">
                <h5>Snack</h5>
            </div>
        </div>
    );
}

export default Plans;

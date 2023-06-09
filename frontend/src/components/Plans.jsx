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

function Plans({ plan, setDate, setSelected }) {
    const [dayFilter, setDayFilter] = useState(
        new Date().toISOString()
    );
    const nombreDelDiaSegunFecha = (fecha) =>
        [
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
            "Domingo",
        ][new Date(fecha).getDay()];

    const nombreBusquedaSegunFecha = (fecha) =>
        [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ][new Date(fecha).getDay()];
    // console.log(plan);
    const desayunoDelDía = () => {
        let productosDesayuno;
        // console.log(plan);
        plan.meals.map((meal) => {
            console.log(meal);
            if (meal.dayOfTheWeek == nombreBusquedaSegunFecha(dayFilter)) {
                meal.mealtimes.map((time) => {
                    console.log(time);
                    if (time.mealtime == "Breakfast") {
                        productosDesayuno = [...time.products, ...time.recipes];
                        return productosDesayuno;
                    }
                });
            }
        });
        return productosDesayuno;
    };

    const almuerzoDelDía = () => {
        let productosDesayuno;
        plan.meals.map((meal) => {
            if (meal.dayOfTheWeek == nombreBusquedaSegunFecha(dayFilter)) {
                meal.mealtimes.map((time) => {
                    if (time.mealtime == "Lunch") {
                        productosDesayuno = [...time.products, ...time.recipes];
                        return productosDesayuno;
                    }
                });
            }
        });
        return productosDesayuno;
    };

    const cenaDelDía = () => {
        let productosDesayuno;
        plan.meals.map((meal) => {
            if (meal.dayOfTheWeek == nombreBusquedaSegunFecha(dayFilter)) {
                meal.mealtimes.map((time) => {
                    if (time.mealtime == "Dinner") {
                        productosDesayuno = [...time.products, ...time.recipes];
                        return productosDesayuno;
                    }
                });
            }
        });
        return productosDesayuno;
    };

    const snackDelDía = () => {
        let productosDesayuno;
        plan.meals.map((meal) => {
            if (meal.dayOfTheWeek == nombreBusquedaSegunFecha(dayFilter)) {
                meal.mealtimes.map((time) => {
                    if (time.mealtime == "Snack") {
                        productosDesayuno = [...time.products, ...time.recipes];
                        return productosDesayuno;
                    }
                });
            }
        });
        return productosDesayuno;
    };

    return (
        <div className="d-flex plans">
            <div className="d-flex plans-header">
                <h3>{nombreDelDiaSegunFecha(dayFilter)}</h3>
                <input
                    type="date"
                    name="filter"
                    id="filter"
                    defaultValue={new Date()
                        .toISOString()
                        .substring(0, 10)}
                    onChange={(e) => {
                        setDayFilter(e.target.value);
                        setDate(e.target.value);
                    }}
                />
            </div>
            <div className="d-flex plans-body">
                <div className="d-flex plans-desayuno">
                    <h5>Desayuno</h5>
                    {plan &&
                        plan.planName &&
                        desayunoDelDía().map((producto) => (
                            <div key={producto.id} id={producto.id}>
                                <h5>
                                    {producto.name}-{producto.servings}
                                </h5>
                            </div>
                        ))}
                </div>
                <div className="d-flex plans-almuerzo">
                    <h5>Almuerzo</h5>
                    {plan &&
                        plan.planName &&
                        almuerzoDelDía().map((producto) => (
                            <div key={producto.id} id={producto.id}>
                                <h5>
                                    {producto.name}-{producto.servings}
                                </h5>
                            </div>
                        ))}
                </div>
                <div className="d-flex plans-cena">
                    <h5>Cena</h5>
                    {plan &&
                        plan.planName &&
                        cenaDelDía().map((producto) => (
                            <div key={producto.id} id={producto.id}>
                                <h5>
                                    {producto.name}-{producto.servings}
                                </h5>
                            </div>
                        ))}
                </div>
            </div>
            <hr className="divider" />
            <div className="d-flex plans-snack">
                <h5>Snack</h5>
                {plan &&
                    plan.planName &&
                    snackDelDía().map((producto) => (
                        <div key={producto.id} id={producto.id}>
                            <h5>
                                {producto.name}-{producto.servings}
                            </h5>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Plans;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "./backendConection";
import Plans from "./Plans";

function ClientPlan() {
    const [dayFilter, setDayFilter] = useState(
        new Date(Date.now()).toISOString()
    );
    const [plan, setPlan] = useState(null);

    useEffect(() => {
        const d = new Date(dayFilter);
        const Nday = d.getDay();
        d.setDate(d.getDate() - Nday);
        console.log(localStorage.getItem("userId"), d.toISOString().substring(0,10))
        axios
            .get(baseURL + `/plan/GetPlanByPatientId?patientId=${localStorage.getItem("userId")}&initialDate=${d.toISOString().substring(0,10)}`)
            .then(function (response) {
                setPlan(response.data);
            })
            .catch(function (error) {
                if (error.response) {
                    // GET response with a status code not in range 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // no response
                    console.log(error.request);
                    // instance of XMLHttpRequest in the browser
                    // instance ofhttp.ClientRequest in node.js
                } else {
                    // Something wrong in setting up the request
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    }, [dayFilter]);

    return <Plans plan={plan} setDate={setDayFilter} />;
}

export default ClientPlan;

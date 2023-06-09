import React, { useState, useEffect, useContext } from "react";
import { Container, Button } from "react-bootstrap";

import ProductList from "./ProductList";
import axios from "axios";
import { baseURL, UpdateContext } from "./backendConection";
import { jsPDF } from "jspdf";

function AdminProductManagementView({ products, setProducts }) {
    const [selectedProduct, setSelectedProduct] = useState(0);
    const { upd } = useContext(UpdateContext);

    const handleApproveButton = () => {
        axios
            .put(baseURL + `/admin/ApproveProduct/${selectedProduct}`)
            .then(function (response) {
                // console.log(response.data);
                upd();
            })
            .catch(function (error) {
                if (error.response) {
                    // PUT response with a status code not in range 2xx
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
    };

    const handleDenyButton = () => {
        axios
            .delete(
                baseURL + `/product/DeleteProduct?productId=${selectedProduct}`
            )
            .then(function (response) {
                // console.log(response.data);
                upd();
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
    };

    const generateReport = () => {
        axios
            .get(baseURL + `/admin/GetPayrollReport?adminId=${localStorage.getItem('userId')}`)
            .then(function (response) {
                console.log(response.data);
                const report = new jsPDF();
                let yCoords = 10;
                response.data.map((e)=>{
                    Object.keys(e).map((k)=>{
                        report.text(k + ":" + e[k].toString(), 10, yCoords);
                        yCoords += 10;
                    })
                    report.text("-----------------------------------------", 10, yCoords);
                    yCoords += 10
                    if (yCoords >= 240) {
                        report.addPage();
                        yCoords = 10;
                    }
                })
                report.save("report.pdf");
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
    };

    return (
        <Container
            style={{
                justifyContent: "center",
                backgroundColor: "lightgray",
                borderRadius: "10px",
                padding: "20px",
            }}
        >
            <ProductList
                products={products}
                setProducts={setProducts}
                upperProduct={setSelectedProduct}
            ></ProductList>

            <div className="d-flex" style={{ justifyContent: "end" }}>
                <Button onClick={handleApproveButton}> Aprobar </Button>
                <Button
                    onClick={handleDenyButton}
                    style={{ marginLeft: "10px" }}
                >
                    {" "}
                    Denegar{" "}
                </Button>
                <Button onClick={generateReport} style={{ marginLeft: "10px" }}>
                    {" "}
                    Generar Reporte{" "}
                </Button>
            </div>
        </Container>
    );
}

export default AdminProductManagementView;

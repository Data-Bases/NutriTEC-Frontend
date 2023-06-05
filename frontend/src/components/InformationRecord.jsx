import React, { useState } from 'react';
import { Container, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import RecipeCreator from './RecipeCreator';

function InformationRecord({ productos }) {
    const [selectedFood, setSelectedFood] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const [cuello, setCuello] = useState('');
    const [cintura, setCintura] = useState('');
    const [cadera, setCadera] = useState('');
    const [musculo, setMusculo] = useState('');
    const [grasa, setGrasa] = useState('');

    const handleSelectedRecipe = (recipe) => {
        console.log(recipe)
        setSelectedRecipe(recipe);
    }

    const handleDropdownFood = (comida) => {
        setSelectedFood(comida);
    }

    const handleButtonRegistrarComida = () => {
        console.log(selectedFood);
        console.log(selectedRecipe);

    }

    const handleButtonRegistrarMedidas = () => {
        console.log(cuello);
        console.log(cintura);
        console.log(cadera);
        console.log(musculo);
        console.log(grasa);

    }

    const handleButtonGenerarReporte = () => {
        console.log("se genera reporte");

    }

    return (
        <>

            <Container
                className="d-flex"
                style={{
                    backgroundColor: 'lightgray',
                    padding: '50px',
                    width: '1000px',
                    borderRadius: '10px',
                    justifyContent: 'center'
                }}
            >
                <div>
                    <div className="d-flex" style={{ justifyContent: 'start' }}>
                        <DropdownButton title={selectedFood ? selectedFood : 'Comida'} onSelect={handleDropdownFood} >
                            <Dropdown.Item eventKey="Desayuno"> Desayuno </Dropdown.Item>
                            <Dropdown.Item eventKey="Almuerzo"> Almuerzo </Dropdown.Item>
                            <Dropdown.Item eventKey="Cena"> Cena </Dropdown.Item>
                        </DropdownButton>
                    </div>

                    <div style={{ margin: '20px 0' }} >
                        <RecipeCreator productos={productos} setRecipeFunction={handleSelectedRecipe}></RecipeCreator>
                    </div>

                    <div className="d-flex" style={{justifyContent:'end'}}>
                        <Button onClick={handleButtonRegistrarComida}> Registrar Comida </Button>
                    </div>

                </div>
            </Container>

            <hr />

            <Container
                className="d-flex"
                style={{
                    flexDirection: 'column',
                    backgroundColor: 'lightgray',
                    padding: '50px',
                    marginTop: '20px',
                    width: '1000px',
                    borderRadius: '10px',
                    justifyContent: 'center'
                }}
            >

                <div className="d-flex" style={{ justifyContent: 'center'}}>
                    <Form.Control
                        placeholder="Cuello (mm)"
                        value={cuello}
                        onChange={(e) => setCuello(e.target.value)}
                    />

                    <Form.Control
                        style={{ marginLeft: '20px' }}
                        placeholder="Cintura (mm)"
                        value={cintura}
                        onChange={(e) => setCintura(e.target.value)}
                    />

                    <Form.Control
                        style={{ marginLeft: '20px' }}
                        placeholder="Cadera (mm)"
                        value={cadera}
                        onChange={(e) => setCadera(e.target.value)}
                    />
                    <Form.Control
                        style={{ marginLeft: '20px'}}
                        placeholder="% Musculo"
                        value={musculo}
                        onChange={(e) => setMusculo(e.target.value)}
                    />

                    <Form.Control
                        style={{ marginLeft: '20px' }}
                        placeholder="% Grasa"
                        value={grasa}
                        onChange={(e) => setGrasa(e.target.value)}
                    />
                </div>


                <div className="d-flex" style={{ justifyContent:'end', marginTop: '20px' }}>
                    <Button onClick={handleButtonRegistrarMedidas}> Registrar Medidas </Button>
                    <Button style={{marginLeft:'20px'}} onClick={handleButtonGenerarReporte}> Generar reporte </Button>
                </div>

               


            </Container>
        </>
    );
}

export default InformationRecord;

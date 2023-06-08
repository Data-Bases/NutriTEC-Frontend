import React, { useState } from 'react';
import { Container, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';



import RecipeProductList from './RecipeProductList';

function CustomerInformationRecordView({ productos, recetas, setRecipes }) {
    const [selectedFood, setSelectedFood] = useState('Desayuno');
    const [foodEated, setFoodEated] = useState({identificador: null, productos: []});
    const [selectedDate, setSelectedDate] = useState(new Date());
    

    const [cuello, setCuello] = useState('');
    const [cintura, setCintura] = useState('');
    const [cadera, setCadera] = useState('');
    const [musculo, setMusculo] = useState('');
    const [grasa, setGrasa] = useState('');

    const handleDropdownFood = (aliemento) => {
        setSelectedFood(aliemento);
    }

    const handleButtonRegistrarComida = () => {
        // Hace un post de esto
        console.log(selectedFood);
        console.log(foodEated);

    }

    const handleButtonRegistrarMedidas = () => {
        setCuello('');
        setCintura('');
        setCadera('');
        setMusculo('');
        setGrasa('');

        // Hace un post de esto
        console.log(cuello);
        console.log(cintura);
        console.log(cadera);
        console.log(musculo);
        console.log(grasa);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(date);

        console.log(date.toLocaleDateString());
    };

    const handleButtonGenerarReporte = () => {
        // Hace un get? de esto
        console.log("se genera reporte");

    }

    return (
        <>
            <Container className='d-flex' style={{ justifyContent: 'space-between', backgroundColor: 'lightgray', borderRadius: '10px', padding: '20px' }} >
                <div>
                    <DropdownButton className='d-flex' style={{ justifyContent: 'start', marginBottom: '10px' }} title={selectedFood} onSelect={handleDropdownFood} >
                        <Dropdown.Item eventKey="Desayuno"> Desayuno </Dropdown.Item>
                        <Dropdown.Item eventKey="Almuerzo"> Almuerzo </Dropdown.Item>
                        <Dropdown.Item eventKey="Cena"> Cena </Dropdown.Item>
                        <Dropdown.Item eventKey="Cena"> Merienda </Dropdown.Item>
                    </DropdownButton>

                    <RecipeProductList productos={[...productos, ...recetas]} receta={foodEated} setRecipes={setRecipes}></RecipeProductList>

                </div>

                <div className='d-flex' style={{ alignItems: 'end' }}>
                    <p style={{ fontWeight: 'bold' }} > Fecha: </p>

                    <div>
                        <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={selectedDate} onChange={handleDateChange}></DatePicker>
                    </div>

                    <Button style={{ marginLeft: '10px' }} onClick={handleButtonRegistrarComida}> Registrar Comida </Button>

                </div>

            </Container>

            <hr />

            <Container style={{ backgroundColor: 'lightgray', borderRadius: '10px', padding: '20px' }} >
                <div className='d-flex' style={{ justifyContent: 'space-around' }}>
                    <Form.Control placeholder="Cuello (mm)" value={cuello} onChange={(e) => setCuello(e.target.value)} />
                    <Form.Control style={{ marginLeft: '20px' }} placeholder="Cintura (mm)" value={cintura} onChange={(e) => setCintura(e.target.value)} />
                    <Form.Control style={{ marginLeft: '20px' }} placeholder="Cadera (mm)" value={cadera} onChange={(e) => setCadera(e.target.value)} />
                    <Form.Control style={{ marginLeft: '20px' }} placeholder="% Musculo" value={musculo} onChange={(e) => setMusculo(e.target.value)} />
                    <Form.Control style={{ marginLeft: '20px' }} placeholder="% Grasa" value={grasa} onChange={(e) => setGrasa(e.target.value)} />
                </div>

                <div className='d-flex' style={{ justifyContent: 'end', marginTop: '20px' }}>
                    <Button onClick={handleButtonRegistrarMedidas}> Registrar Medidas </Button>
                    <Button style={{ marginLeft: '10px' }} onClick={handleButtonGenerarReporte}> Generar reporte </Button>
                </div>
            </Container>
        </>
    );
}

export default CustomerInformationRecordView;

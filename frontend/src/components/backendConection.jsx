import React, { createContext, useState } from "react";

export const baseURL = "https://nutritecapi.azurewebsites.net/nutritec"

export const listaTramites = [
    "Información",
    "Tratamiento Spa",
    "Puestos",
    "Empleado",
    "Servicios",
    "Tipo Equipo",
    "Inventario",
    "Productos",
    "Clonar Sucursal",
];

export const listaConfigs = [
    "Clases",
    "Tratamientos Spa",
    "Productos",
    "Equipos"
]

const updateProducts = true;

export const UpdateContext = createContext();

export const UpdateProvider = (props) => {
    const [updateState, setUpdateState] = useState(updateProducts);
    
    const upd = () => {
        setUpdateState(!updateState);
    }
  
    return (
      <UpdateContext.Provider
        value={{
          updateState,
          setUpdateState,
          upd
          }}
      >
        {props.children}
      </UpdateContext.Provider>
    );
  };
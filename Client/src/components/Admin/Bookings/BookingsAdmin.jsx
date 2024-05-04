import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./BookingsAdmin.css";

function BookingsAdmin() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetch("https://adoptaapp.pythonanywhere.com/candidatos")
      .then(response => response.json())
      .then(dataC => {
        fetch("https://adoptaapp.pythonanywhere.com/mascotas")
          .then(response => response.json())
          .then(dataM => {
            const combinedData = dataC.map(candidato => {
              const mascota = dataM.find(mascota => mascota.id === candidato.id_mascota);
              return { ...candidato, mascota: mascota };
            });
            setData(combinedData);
          })
          .catch(error => console.error("Error fetching mascotas:", error));
      })
      .catch(error => console.error("Error fetching candidatos:", error));
  }, []); // Solo se ejecuta una vez al montar el componente

  // Función para filtrar candidatos según el criterio de búsqueda
  const filtrarCandidatos = (data, busqueda) => {
    return data.filter(candidato =>
      candidato.nombreApellido.toLowerCase().includes(busqueda.toLowerCase())
    );
  };


  const handleEliminarCandidato = (id) => {
    fetch(`https://adoptaapp.pythonanywhere.com/candidatos/delete/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setData(prevData => prevData.filter(item => item.id !== id));
        document.querySelector('p.alert.success').style.display = 'flex';
      } else {
        console.error("Error al eliminar el candidato");
      }
    })
    .catch(error => console.error("Error al eliminar el candidato:", error));
  };

  return (
    <div id="BodyContainerAdmin">
      <div className="BodyContainerSection">
        <h1>Solicitantes</h1>
        <div id="TableFunctions">
          <input 
            type="text" 
            placeholder="Buscar" 
            id="buscador" 
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <div></div>
        </div>

        <table id="TableAdmin">
          <thead id="header">
            <tr>
              <th>Mascota</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Info</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtrarCandidatos(data, busqueda).map(candidato => (
              <tr key={candidato.id}>
                <td>{candidato.mascota ? candidato.mascota.nombre : "Sin mascota"}</td>
                <td>{candidato.nombreApellido}</td>
                <td>{candidato.email}</td>
                <td><Link to={`/Admin/Bookings/${candidato.id}`} className="MoreInfo">Ver más</Link></td>
                <td><a onClick={() => handleEliminarCandidato(candidato.id)} className="DeleteX">X</a></td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default BookingsAdmin;

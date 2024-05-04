import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function PostsAdmin() {
  const [mascotas, setMascotas] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetch("https://adoptaapp.pythonanywhere.com/mascotas")
      .then(response => response.json())
      .then(data => {
        // Aplicar filtro si hay algo en el input de búsqueda
        if (busqueda.trim() !== '') {
          const mascotasFiltradas = filtrarMascotas(data, busqueda);
          setMascotas(mascotasFiltradas);
        } else {
          setMascotas(data);
        }
      })
      .catch(error => console.error("Error fetching mascotas:", error));
  }, [busqueda]); // Dependencia añadida para que se ejecute cada vez que cambie la búsqueda

  const handleEliminarMascota = (id) => {
    fetch(`https://adoptaapp.pythonanywhere.com/mascotas/delete/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setMascotas(prevMascotas => prevMascotas.filter(mascota => mascota.id !== id));
        document.querySelector('p.alert.success').style.display = 'flex';
      } else {
        console.error("Error al eliminar la mascota");
      }
    })
    .catch(error => console.error("Error al eliminar la mascota:", error));
  };

  // Función para filtrar mascotas según el criterio de búsqueda
  const filtrarMascotas = (mascotas, busqueda) => {
    return mascotas.filter(mascota =>
      mascota.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  };

  return (
    <div id="BodyContainerAdmin">
      <div className="BodyContainerSection">
        <h1>Mascotas</h1>
        <div id="TableFunctions">
          <input 
            type="text" 
            placeholder="Buscar" 
            id="buscador" 
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <button id="ButtonAdmin"><Link to="/Admin/Posts/NewPost">Nuevo</Link></button>
        </div>

        <table id="TableAdmin">
          <thead id="header">
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Tamaño</th>
              <th>Temperamento</th>
              <th>Género</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {mascotas.map(mascota => (
              <tr key={mascota.id}>
                <td>{mascota.id}</td>
                <td className="Name">
                  {mascota.nombre}
                  <span className="Functions">
                    <a onClick={() => handleEliminarMascota(mascota.id)} className="Delete">Eliminar</a>
                    <span className="FunctionsLine"></span>
                    <a href={`/Admin/Posts/EditPost/${mascota.id}`} className="Edit">Editar</a>
                  </span>
                </td>
                <td>{mascota.edad}</td>
                <td>{mascota.tamaño}</td>
                <td>{mascota.temperamento}</td>
                <td>{mascota.sexo}</td>
                <td>{mascota.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PostsAdmin;

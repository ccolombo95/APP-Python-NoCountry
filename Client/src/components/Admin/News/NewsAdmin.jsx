import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// import LandingPageSection1 from "../LandingPageSection1/LandingPageSection1";


function NewsAdmin() {

  const [noticias, setNoticias] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  
  useEffect(() => {
    fetch("https://adoptaapp.pythonanywhere.com/noticias")
      .then(response => response.json())
      .then(data => {
        // Aplicar filtro si hay algo en el input de búsqueda
        if (busqueda.trim() !== '') {
          const noticiasFiltradas = filtrarNoticias(data, busqueda);
          setNoticias(noticiasFiltradas);
        } else {
          setNoticias(data);
        }
      })
      .catch(error => console.error("Error fetching noticias:", error));
  }, [busqueda]); // Dependencia añadida para que se ejecute cada vez que cambie la búsqueda

  const handleEliminarMascota = (id) => {
    fetch(`https://adoptaapp.pythonanywhere.com/noticias/delete/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setNoticias(prevNoticias => prevNoticias.filter(noticia => noticia.id !== id));
      } else {
        console.error("Error al eliminar la noticia");
      }
    })
    .catch(error => console.error("Error al eliminar la noticia:", error));
  };

  // Función para filtrar mascotas según el criterio de búsqueda
  const filtrarNoticias = (noticias, busqueda) => {
    return noticias.filter(noticia =>
      noticia.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );
  };

  return (
    <div id="BodyContainerAdmin">
      <div className="BodyContainerSection">
        <h1>Noticias</h1>
        <div id="TableFunctions">
            <input type="text" 
            placeholder="Buscar" 
            id="buscador" 
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)} />
            <button id="ButtonAdmin"><a href="/Admin/News/NewNew">Nuevo</a></button>
        </div>

        <table id="TableAdmin">
          <thead id="header">
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Subtítulo</th>
              <th>Estado</th>

            </tr>

          </thead>
          <tbody>
            {noticias.map(noticia => (
              <tr key={noticia.id}>
                <td>{noticia.id}</td>
                <td className="Name">
                  {noticia.titulo}
                  <span className="Functions">
                    <a onClick={() => handleEliminarMascota(noticia.id)} className="Delete">Eliminar</a>
                    <span className="FunctionsLine"></span>
                    <a href={`/Admin/News/EditNew/${noticia.id}`} className="Edit">Editar</a>
                  </span>

                </td>
                <td>{noticia.subtitulo}</td>
                <td>{noticia.estado}</td>
       
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewsAdmin;

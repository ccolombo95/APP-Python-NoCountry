import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Noticia.css";
import { Link } from 'react-router-dom'; 

function Noticia() {
  const { id } = useParams(); 
  const idNum = parseInt(id, 10);
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    fetch(`https://adoptaapp.pythonanywhere.com/noticias`)
      .then(response => response.json())
      .then(data => {
        // Filtrar la noticia que coincida con el idNum
        const filteredNoticia = data.find(noticia => noticia.id === idNum);
        setNoticia(filteredNoticia);
      })
      .catch(error => console.error("Error fetching noticia:", error));
  }, [idNum]);
  console.log(noticia)

  return (
    <section id="NoticiaContainer">
      <div id="NoticiaCuerpo">
        {noticia && (
          <div className="noticia" key={noticia.id}>
            <div className="container-imagen" style={{ backgroundImage: `url(${noticia.imagen_url})` }}></div>
            <div className="noticia-container-text">
              <div className="noticia-container-text-title">
                <h2>{noticia.titulo}</h2>
              </div>
              <div className="noticia-container-parrafo">
                <p>{noticia.cuerpo}</p>
              </div>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}

export default Noticia;

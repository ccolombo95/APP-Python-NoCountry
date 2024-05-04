import React, { useState, useEffect } from 'react';
import "./LandingPageSectionNoticias.css";
import { Link } from 'react-router-dom'; 

function LandingPageSectionNoticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch("https://adoptaapp.pythonanywhere.com/noticias")
      .then(response => response.json())
      .then(data => {
        setNoticias(data);
      })
      .catch(error => console.error("Error fetching noticias:", error));
  }, []);

  return (
    <section className="container-noticias">
      <div className="container-section-noticias-title">
        <h2>Noticias / Comunicados</h2>
      </div>

      <div className="noticias">
        {/* Left */}
        <div className="container-left">
          {noticias.slice(0, 2).map(noticia => (
            <div className="noticia" key={noticia.id}>
              <Link to={`/noticia/${noticia.id}`}>
                <div className="container-imagen" style={{ backgroundImage: `url(${noticia.imagen_url})` }}></div>
              </Link>
              <div className="noticia-container-text">
                <div className="noticia-container-text-title">
                  <h2>{noticia.titulo}</h2>
                </div>
                <div className="noticia-container-parrafo">
                  <p>{noticia.subtitulo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right */}
        {noticias.length >= 4 && (
          <div className="container-right">
            <div className="noticia1" key={noticias[3].id}>
              <Link to={`/noticia/${noticias[3].id}`}>
                <div className="container-imagen" style={{ backgroundImage: `url(${noticias[3].imagen_url})` }}></div>
              </Link>
              <div className="noticia-container-text">
                <div className="noticia-container-text-title">
                  <h2>{noticias[3].titulo}</h2>
                </div>
                <div className="noticia-container-parrafo">
                  <p>{noticias[3].subtitulo}</p>
                </div>
              </div>
            </div>
            <div className="noticia2" key={noticias[2].id}>
              <Link to={`/noticia/${noticias[2].id}`}>
                <div className="container-imagen" style={{ backgroundImage: `url(${noticias[2].imagen_url})` }}></div>
              </Link>
              <div className="noticia-container-text">
                <div className="noticia-container-text-title">
                  <h2>{noticias[2].titulo}</h2>
                </div>
                <div className="noticia-container-parrafo">
                  <p>{noticias[2].subtitulo}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default LandingPageSectionNoticias;

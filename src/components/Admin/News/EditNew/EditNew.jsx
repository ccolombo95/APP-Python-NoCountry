import React, { useState, useEffect } from "react";
import axios from "axios";
import "../NewNew/NewNew.css";
import { useParams } from "react-router-dom";

function EditNew() {
  const { id } = useParams();
  const idNum = parseInt(id, 10);

  const [formData, setFormData] = useState({
    imagen_url: "",
    titulo: "",
    subtitulo: "",
    cuerpo: "",
  });

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(
          `https://adoptaapp.pythonanywhere.com/noticias/${idNum}`
        );
        const newsData = response.data;
        setFormData({
          imagen_url: newsData.imagen_url,
          titulo: newsData.titulo,
          subtitulo: newsData.subtitulo,
          cuerpo: newsData.cuerpo,
        });
      } catch (error) {
        console.error("Error al obtener los datos de la noticia:", error);
      }
    };

    fetchNewsData();
  }, [idNum]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://adoptaapp.pythonanywhere.com/noticias/edit/${idNum}`,
        formData
      );
      console.log("Respuesta de la API:", response.data);
      document.querySelector('p.alert.success').style.display = 'flex';
      
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div id="BodyContainerAdmin">
      <div className="BodyContainerSection">
        <h1>Editar noticia</h1>
        <form id="FormAdmin" className="NewsForm" onSubmit={handleSubmit}>
          <div id="FormImageNew"
            style={{
              backgroundImage: `url('${formData.imagen_url}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            
            }}>
              {!formData.imagen_url && <p>Cargar imagen</p>}
              <input
                type="file"
                accept="image/*"
                id="imagen_url"
                name="imagen_url"
                onChange={handleInputChange}
              />
          </div>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Título"
            required
            value={formData.titulo}
            onChange={handleInputChange}
          /><br />
          <input
            type="text"
            id="subtitulo"
            name="subtitulo"
            placeholder="Subtítulo"
            required
            value={formData.subtitulo}
            onChange={handleInputChange}
          /><br />

          <textarea
            name="cuerpo"
            id="cuerpo"
            cols="30"
            rows="160"
            placeholder="Cuerpo"
            value={formData.cuerpo}
            onChange={handleInputChange}
          ></textarea><br />
          <p className="alert success">Actualizado!</p>

          <button id="ButtonAdmin" type="submit">
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditNew;

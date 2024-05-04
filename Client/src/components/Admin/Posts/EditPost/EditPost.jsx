import React, { useState, useEffect } from "react";
import axios from "axios";
import "../NewPost/NewPost.css";
import { useParams } from 'react-router-dom'; 

function EditPost() {
  const { id } = useParams(); 
  const idNum = parseInt(id, 10);
 
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    edad: "",
    tamaño: "",
    temperamento: "",
    sexo: "",
    especie: "",
    imagen_url:"",
  });

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `https://adoptaapp.pythonanywhere.com/mascotas/${idNum}`
        );
        const postData = response.data;
        setFormData({
          nombre: postData.nombre,
          descripcion: postData.descripcion,
          edad: postData.edad,
          tamaño: postData.tamaño,
          temperamento: postData.temperamento,
          sexo: postData.sexo,
          especie: postData.especie,
          imagen_url: postData.imagen_url,
        });
      } catch (error) {
        console.error("Error al obtener los datos del post:", error);
      }
    };

    fetchPostData();
  }, [idNum]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://adoptaapp.pythonanywhere.com/mascotas/edit/${idNum}`,
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
        <h1>Editar publicación</h1>
        <form id="FormAdmin" onSubmit={handleSubmit}>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            required
            value={formData.nombre}
            onChange={handleInputChange}
          />
          <div id="DescriptionGroup">
            <textarea
              name="descripcion"
              id="descripcion"
              cols="30"
              rows="10"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={handleInputChange}
            ></textarea>
            <div
              id="FormImage"
              style={{
                backgroundImage: `url('${formData.imagen_url}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              
              }}
            >
              {!formData.imagen_url && <p>Cargar imagen</p>}
              <input
                type="file"
                accept="image/*"
                id="imagen_url"
                name="imagen_url"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="SelectGroup">
          <select
            id="edad"
            name="edad"
            required
            value={formData.edad}
            onChange={handleInputChange}
          >
            <option value="">Edad</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Adulto">Adulto</option>
            <option value="Viejo">Viejo</option>
          </select>

          <select
            id="tamaño"
            name="tamaño"
            required
            value={formData.tamaño}
            onChange={handleInputChange}
          >
            <option value="">Tamaño</option>
            <option value="Pequeño">Pequeño</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </select>

          <select
            id="temperamento"
            name="temperamento"
            required
            value={formData.temperamento}
            onChange={handleInputChange}
          >
            <option value="">Temperamento</option>
            <option value="Tranquilo">Tranquilo</option>
            <option value="Activo">Activo</option>
            <option value="Juguetón">Juguetón</option>
            <option value="Tímido">Tímido</option>
            <option value="Agresivo">Agresivo</option>
          </select>

          <select
            id="sexo"
            name="sexo"
            required
            value={formData.sexo}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>

          <select
            id="especie"
            name="especie"
            required
            value={formData.especie}
            onChange={handleInputChange}
          >
            <option value="">Especie</option>
            <option value="Gato">Gato</option>
            <option value="Perro">Perro</option>
          </select>


          </div>
          <p className="alert success">Actualizado!</p>

          <button id="ButtonAdmin" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;

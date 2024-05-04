import React, { useState } from "react";
import axios from "axios";
import "./NewPost.css";
import imgDefault from "/public/Assets/imgfilled.jpg";

function NewPost() {

  const [Url_Imagen, setUrl_Imagen] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    edad: "",
    tamaño: "",
    temperamento: "",
    sexo: "",
    especie: "",
  });

  const changeUploadImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Preset_AdoptApp");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/djddo5xfy/image/upload",
      data
    );
    setUrl_Imagen(response.data.secure_url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Establecer imagen_url antes de enviar la solicitud POST
      const formDataWithImageUrl = {
        ...formData,
        imagen_url: Url_Imagen
      };

      const response = await axios.post(
        "https://adoptaapp.pythonanywhere.com/mascota",
        formDataWithImageUrl
      );
      console.log("Respuesta de la API:", response.data);
      document.querySelector('p.alert.success').style.display = 'flex';

      // Aquí puedes manejar la respuesta de la API como desees, por ejemplo, mostrar un mensaje de éxito.
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario.
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div id="BodyContainerAdmin">
      <div className="BodyContainerSection">
        <h1>Crear publicación</h1>
        <form id="FormAdmin" onSubmit={handleSubmit}>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            required
            onChange={handleInputChange}
          />
          <div id="DescriptionGroup">
            <textarea
              name="descripcion"
              id="descripcion"
              cols="30"
              rows="10"
              placeholder="Descripción"
              onChange={handleInputChange}
            ></textarea>
            <div
              id="FormImage"
              style={{
                backgroundImage: `url('${Url_Imagen || imgDefault}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            >
              {!Url_Imagen}
              <input
                type="file"
                accept="image/*"
                id="imagen_url"
                name="imagen_url"
                onChange={changeUploadImage}
              />
            </div>
          </div>

          <div className="SelectGroup">
            <select
              id="edad"
              name="edad"
              required
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
              onChange={handleInputChange}
            >
              <option value="">Especie</option>
              <option value="Gato">Gato</option>
              <option value="Perro">Perro</option>
            </select>
          </div>
          <p className="alert success">Agregado!</p>

          <button id="ButtonAdmin" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;

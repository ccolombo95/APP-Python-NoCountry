import React, { useState } from "react";
import axios from "axios";
import "./NewNew.css";
import imgDefault from "/public/Assets/imgfilled.jpg";

function NewNew() {
  const [Url_Imagen, setUrl_Imagen] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    body: "",

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Agregar la URL de la imagen al formData antes de enviar la solicitud POST
      const formDataWithImageUrl = {
        ...formData,
        imagen_url: Url_Imagen
      };

      const response = await axios.post(
        "https://adoptaapp.pythonanywhere.com/noticia",
        formDataWithImageUrl
      );
      console.log("Respuesta de la API:", response.data);
      document.querySelector('p.alert.success').style.display = 'flex';
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario.
    }
  };

  return (
    <div id="BodyContainerAdmin">
      <div className="BodyContainerSection">
        <h1>Crear publicación</h1>
        <form id="FormAdmin" className="NewsForm" onSubmit={handleSubmit}>
          <div id="FormImageNew" style={{
              backgroundImage: `url('${Url_Imagen || imgDefault}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}>
            <input
              type="file"
              accept="image/*"
              id="imagen_url"
              name="imagen_url"
              onChange={changeUploadImage}
            />
          </div>
          <input
            type="text"
            id="titulo "
            name="titulo"
            placeholder="Título"
            required
            onChange={handleInputChange}
          /><br />
          <input
            type="text"
            id="subtitulo"
            name="subtitulo"
            placeholder="Subtítulo"
            required
            onChange={handleInputChange}
          /><br />
          <textarea
            name="cuerpo"
            id="cuerpo"
            cols="30"
            rows="10"
            placeholder="Cuerpo"
            required
            onChange={handleInputChange}
          ></textarea><br />
          <p className="alert success">Noticia publicada!</p>
          <button id="ButtonAdmin" type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default NewNew;

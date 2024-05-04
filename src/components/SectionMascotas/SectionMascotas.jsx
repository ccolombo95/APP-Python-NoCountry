import React, { useState, useEffect } from "react";
import "./SectionMascotas.css";
import CardMascota from "./CardMascota/CardMascota";
import RequisitosParaAdoptar from "../LandingPageSection5/LandingPageSection5";
import Loader from "../Loader/Loader";
import axios from "axios";

function SectionMascotas() {
  const [opcionSeleccionadaGenero, setOpcionSeleccionadaGenero] = useState("");
  const [opcionSeleccionadaRaza, setOpcionSeleccionadaRaza] = useState("");
  const [opcionSeleccionadaEdad, setOpcionSeleccionadaEdad] = useState("");
  const [opcionSeleccionadaTamaño, setOpcionSeleccionadaTamaño] = useState("");
  const [opcionSeleccionadaTemperamento, setOpcionSeleccionadaTemperamento] =
    useState("");
  const [opcionSeleccionadaEspecie, setOpcionSeleccionadaEspecie] =
    useState("Perro");
  const [inputBusqueda, setInputBusqueda] = useState("");
  const [mascotasFiltradas, setMascotasFiltradas] = useState([]);

  useEffect(() => {}, []);

  //no me odien...
  function handleSeleccionEspeciePerro() {
    setOpcionSeleccionadaEspecie("Perro");
  }
  function handleSeleccionEspecieGato() {
    setOpcionSeleccionadaEspecie("Gato");
  }

  const handleSeleccion = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "genero":
        setOpcionSeleccionadaGenero(value);
        break;
      case "raza":
        setOpcionSeleccionadaRaza(value);
        break;
      case "edad":
        setOpcionSeleccionadaEdad(value);
        break;
      case "tamaño":
        setOpcionSeleccionadaTamaño(value);
        break;
      case "temperamento":
        setOpcionSeleccionadaTemperamento(value);
        break;
      default:
        break;
    }
  };

  const filtrarMascotas = (mascota) => {
    if (
      (inputBusqueda === "" ||
        mascota.nombre.toLowerCase().includes(inputBusqueda.toLowerCase())) &&
      (opcionSeleccionadaGenero === "" ||
        mascota.genero === opcionSeleccionadaGenero) &&
      (opcionSeleccionadaRaza === "" ||
        mascota.raza === opcionSeleccionadaRaza) &&
      (opcionSeleccionadaEdad === "" ||
        mascota.edad === opcionSeleccionadaEdad) &&
      (opcionSeleccionadaTamaño === "" ||
        mascota.tamaño === opcionSeleccionadaTamaño) &&
      (opcionSeleccionadaTemperamento === "" ||
        mascota.temperamento === opcionSeleccionadaTemperamento) &&
      mascota.especie === opcionSeleccionadaEspecie
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    axios
      .get("https://adoptaapp.pythonanywhere.com/mascotas")
      .then((response) => {
        // array de mascotas traido desde el back listo para suplantar al array :D

        const mascotasFiltradas = response.data.filter(filtrarMascotas);

        let mascotasDivididas = [];
        let arrayBloque = [];

        for (let i = 0; i < mascotasFiltradas.length; i++) {
          arrayBloque.push(mascotasFiltradas[i]);
          if (arrayBloque.length === 5 || i === mascotasFiltradas.length - 1) {
            mascotasDivididas.push(arrayBloque);
            arrayBloque = [];
          }
        }

        setMascotasFiltradas(mascotasDivididas);
      });
  }, [
    opcionSeleccionadaGenero,
    opcionSeleccionadaRaza,
    opcionSeleccionadaEdad,
    opcionSeleccionadaTamaño,
    opcionSeleccionadaTemperamento,
    inputBusqueda,
    opcionSeleccionadaEspecie,
  ]);
  const handleInputChange = (event) => {
    setInputBusqueda(event.target.value);
  };

  // let arrayMascotas = [
  //   {
  //     id: 1,
  //     nombre: "Gaston",
  //     temperamento: "Jugueton",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Perro",
  //   },
  //   {
  //     id: 2,
  //     nombre: "Lala",
  //     temperamento: "Fiel",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Macho",
  //     edad: "Adulto",
  //     especie: "Perro",
  //   },
  //   {
  //     id: 3,
  //     nombre: "Roco",
  //     temperamento: "Docil",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Perro",
  //   },
  //   {
  //     id: 4,
  //     nombre: "Gaston",
  //     temperamento: "Jugueton",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Perro",
  //   },
  //   {
  //     id: 5,
  //     nombre: "Lala",
  //     temperamento: "Fiel",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Perro",
  //   },
  //   {
  //     id: 6,
  //     nombre: "Roco",
  //     temperamento: "Docil",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Gato",
  //   },
  //   {
  //     id: 7,
  //     nombre: "Gaston",
  //     temperamento: "Jugueton",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Gato",
  //   },
  //   {
  //     id: 8,
  //     nombre: "Lala",
  //     temperamento: "Fiel",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Gato",
  //   },
  //   {
  //     id: 9,
  //     nombre: "Roco",
  //     temperamento: "Docil",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Gato",
  //   },
  //   {
  //     id: 10,
  //     nombre: "Gaston",
  //     temperamento: "Jugueton",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Gato",
  //   },
  //   {
  //     id: 11,
  //     nombre: "Lala",
  //     temperamento: "Protector",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Gato",
  //   },
  //   {
  //     id: 12,
  //     nombre: "Roco",
  //     temperamento: "Docil",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Gato",
  //   },
  //   {
  //     id: 13,
  //     nombre: "Gaston",
  //     temperamento: "Jugueton",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Gato",
  //   },
  //   {
  //     id: 14,
  //     nombre: "Lala",
  //     temperamento: "Protector",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Gato",
  //   },
  //   {
  //     id: 15,
  //     nombre: "Roco",
  //     temperamento: "Docil",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //     especie: "Gato",
  //   },
  // ];

  return (
    <div>
      <div id="SectionMascotasContainer">
        <div id="SectionMascotasInputContainer">
          <img id="SectionMascotasInputImage" src="./Assets/lupa.png" alt="" />
          <input
            id="SectionMascotasInput"
            placeholder="Buscar"
            type="text"
            value={inputBusqueda}
            onChange={handleInputChange}
          />
        </div>
        <div id="MascotasContainer">
          <div id="SectionMascotasFiltrosContainer">
            <div id="SectionMascotasFiltercontainer">
              <div id="SectionMascotasFiltercontainerUp">
                <h1
                  id={
                    opcionSeleccionadaEspecie === "Perro"
                      ? "SectionMascotasFiltercontainerUpPerroSelec"
                      : "SectionMascotasFiltercontainerUpPerroNoSelec"
                  }
                  onClick={handleSeleccionEspeciePerro}
                  className={
                    opcionSeleccionadaEspecie === "Perro"
                      ? "DogNoSelect"
                      : "DogSelect"
                  }
                >
                  Perros
                </h1>
                <h1
                  id={
                    opcionSeleccionadaEspecie === "Gato"
                      ? "SectionMascotasFiltercontainerUpGatoSelec"
                      : "SectionMascotasFiltercontainerUpGatoNoSelec"
                  }
                  onClick={handleSeleccionEspecieGato}
                  className={
                    opcionSeleccionadaEspecie === "Gato"
                      ? "CatNoSelect"
                      : "CatSelect"
                  }
                >
                  Gatos
                </h1>
              </div>
              <div id="SectionMascotasFiltercontainerDown">
                <div className="SectionMascotasFilter">
                  <select
                    name="genero"
                    className="SectionMascotasFilterSelect"
                    value={opcionSeleccionadaGenero}
                    onChange={handleSeleccion}
                  >
                    <option value="">Genero</option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
                </div>
                <div className="SectionMascotasFilter">
                  <select
                    name="edad"
                    className="SectionMascotasFilterSelect"
                    value={opcionSeleccionadaEdad}
                    onChange={handleSeleccion}
                  >
                    <option value="">Edad</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Joven">Joven</option>
                    <option value="Adulto">Adulto</option>
                    <option value="Anciano">Anciano</option>
                  </select>
                </div>
                <div className="SectionMascotasFilter">
                  <select
                    name="tamaño"
                    className="SectionMascotasFilterSelect"
                    value={opcionSeleccionadaTamaño}
                    onChange={handleSeleccion}
                  >
                    <option value="" disabled hidden>
                      Tamaño
                    </option>
                    <option className="SectionMascotasFilterOption" value="">
                      Tamaño
                    </option>
                    <option
                      className="SectionMascotasFilterOption"
                      value="Pequeño"
                    >
                      Pequeño
                    </option>
                    <option value="Mediano">Mediano</option>
                    <option value="Grande">Grande</option>
                    <option value="Muy grande">Muy grande</option>
                  </select>
                </div>
                <div className="SectionMascotasFilter">
                  <select
                    name="temperamento"
                    className="SectionMascotasFilterSelect"
                    value={opcionSeleccionadaTemperamento}
                    onChange={handleSeleccion}
                  >
                    <option value="">Temperamento</option>
                    <option value="Docil">Docil</option>
                    <option value="Protector">Protector</option>
                    <option value="Fiel">Fiel</option>
                    <option value="Jugueton">Jugueton</option>
                    <option value="Activo">Activo</option>
                    <option value="Tímido">Tímido</option>
                    <option value="Tranquilo">Tranquilo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div id="SectionMascotasCardsContainer">
            {!mascotasFiltradas[0] && <Loader/> }
            {mascotasFiltradas.map((subArray, index) => (
              <React.Fragment key={index}>
                {subArray.map((mascota, subIndex) => (
                  <CardMascota
                    key={`${index}-${subIndex}`}
                    id={mascota.id}
                    nombre={mascota.nombre}
                    temperamento={mascota.temperamento}
                    img={mascota.imagen_url}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <RequisitosParaAdoptar />
    </div>
  );
}

export default SectionMascotas;

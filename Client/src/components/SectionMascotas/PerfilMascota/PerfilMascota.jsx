import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import Loader from '../../Loader/Loader';
import "./PerfilMascota.css";
import axios from "axios";

function PerfilMascota() {
  const { id } = useParams(); 
  const idNum = parseInt(id, 10);
  const [mascotaSelect, setMascotaSelect] = useState(false)
  
  // let arrayMascotas = [
    useEffect(() => {
      axios
        .get("https://adoptaapp.pythonanywhere.com/mascotas")
        .then((res) => {
          let arrayPerfil = res.data.filter(mascota => mascota.id === idNum);

          setMascotaSelect(arrayPerfil[0]);
        });
    }, []);
  //   { id:1,
  //     nombre: "Gaston",
  //     temperamento: "Jugueton",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },
  //   { id:2,
  //     nombre: "Lala",
  //     temperamento: "Fiel",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Macho",
  //     edad: "Adulto",
  //   },
  //   {
  //     id:3,
  //     nombre: "Roco",
  //     temperamento: "Docil",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },
  //   {
  //     id:4,
  //     nombre: "Gaston",
  //     temperamento: "Jugueton",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },
  //   {
  //     id:5,
  //     nombre: "Lala",
  //     temperamento: "Fiel",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },
  //   {
  //     id:6,
  //     nombre: "Roco",
  //     temperamento: "Docil",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },
  //   {
  //     id:7,
  //     nombre: "Gaston",
  //     temperamento: "Jugueton",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },
  //   {
  //     id:8,
  //     nombre: "Lala",
  //     temperamento: "Fiel",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },
  //   {
  //     id:9,
  //     nombre: "Roco",
  //     temperamento: "Docil",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },
  //   {
  //     id:10,
  //     nombre: "Gaston",
  //     temperamento: "Jugueton",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },
  //   {
  //     id:11,
  //     nombre: "Lala",
  //     temperamento: "Protector",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },
  //   {
  //     id:12,
  //     nombre: "Roco",
  //     temperamento: "Docil",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },
  //   {
  //     id:13,
  //     nombre: "Gaston",
  //     temperamento: "Jugueton",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },
  //   {
  //     id:14,
  //     nombre: "Lala",
  //     temperamento: "Protector",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },
  //   {id: 15,
  //     nombre: "Roco",
  //     temperamento: "Docil",
  //     raza: "Mestizo",
  //     tamaño: "Pequeño",
  //     genero: "Hembra",
  //     edad: "Adulto",
  //   },

    
  // ];


 

  return (
    <section id='PerfilMascotaContainer'>
      {mascotaSelect?       <div id="PerfilMascota">
        <img id='MascotaImage' src={mascotaSelect.imagen_url} alt="" />
        <div id="MascotaInfo">
          <h1 id="MascotaName">{mascotaSelect.nombre} <span>8 años</span></h1>
          <ul id="MascotaInfoList">
            <li><p>Temperamento</p><p>{mascotaSelect.temperamento}</p></li>
            <li><p>Tamaño</p><p>{mascotaSelect.tamaño}</p></li>
            <li><p>Género</p><p>{mascotaSelect.sexo}</p></li>
            <li><p>Edad</p><p>{mascotaSelect.edad}</p></li>
          </ul>
          <p id="MascotaDescripcion">La más serena, la que mejor se porta, la que te da cero problemas pero te llena de amor y paz, esa soy yo, Tengo 8 años, me porto divino, te espero pacientemente para escuchar tu día y aliviarte de todos los problemas, me llevo bien con todos, ¿me adoptás? Estoy castrada, vacunada y desparasitada</p>
          <Link to={`/perfil/${mascotaSelect.id}/contrato`}>
            <span id="BotonAdoptar">Quiero Adoptar <span className="corazon">	&#x2764;	</span> </span>
          </Link>
        </div>


      </div> : <div style={{ marginTop: "500px" }}><Loader/></div>}


    </section>
  );
}

export default PerfilMascota;

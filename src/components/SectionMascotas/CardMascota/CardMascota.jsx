import React from 'react';
import { Link } from 'react-router-dom';
import "./CardMascota.css";

function CardMascota(props) {
  return (
    <div id='CardMascotaContainer'>
        <img id='CardMascotaImage' src={props.img} alt="" />
        <div id='CardMascotaDatos'>
        <Link to={`/perfil/${props.id}`}>
          <h1 id='CardMascotaNombre'>{props.nombre}</h1>
        </Link>
        <h2 id='CardMascotaTemperamento'>{props.temperamento}</h2>

        </div>

    </div>
  );
}

export default CardMascota;

import React from 'react';
import "./LandingPageSection5.css";
import checkIcon from "../../assets/check.svg";


function LandingPageSection5() {
  return (
    <div id='LandingPageSection5Container'>
      <h1 id='LandingPageSection5ContainerTittle'>REQUISITOS PARA ADOPTAR </h1>
      <div id='LandingPageSection5ContainerInfo'>
        <ul id='LandingPageSection5ContainerInfoList'>
          <li className='LandingPageSection5ContainerInfoListItem'>
              <img src={checkIcon} alt="" />
              <p>Ser mayor de edad</p>
          </li>
          <li className='LandingPageSection5ContainerInfoListItem'>
              <img src={checkIcon} alt="" />
              <p>Firma una carta compromiso</p>
          </li>
          <li className='LandingPageSection5ContainerInfoListItem'>
              <img src={checkIcon} alt="" />
              <p>Contar con solvencia económica</p>
          </li>
          <li className='LandingPageSection5ContainerInfoListItem'>
              <img src={checkIcon} alt="" />
              <p>Brindar seguimiento</p>
          </li>
          <li className='LandingPageSection5ContainerInfoListItem'>
              <img src={checkIcon} alt="" />
              <p>Copia de INE y comprobante de domicilio</p>
          </li>
          <li className='LandingPageSection5ContainerInfoListItem'>
              <img src={checkIcon} alt="" />
              <p>Firmar compromiso de llevar al animal a sus vacunas y esterilizar en caso de que sea cachorro</p>
          </li>
        </ul>
        <img src="/Assets/gatoHojas.png" id="gatoimg" alt="" />
      </div>
    </div>
  );
}

export default LandingPageSection5;

import React from 'react'
import "./LandingPageSection1.css"
import { Link } from 'react-router-dom';

function LandingPageSection1() {
  return (
    <div id='LandingPageSection1Container'>
        <div id='LandingPageSection1ContainerLeft'>
            <h1 id='LandingPageSection1ContainerLeftTittle'>CÓNOCE MÁS <br/> SOBRE NUESTRA <br/>ASOCIACIÓN</h1>
            <p id='LandingPageSection1ContainerLeftText'>AdoptApp Crea conciencia sobre el bienestar animal de la mano de los refugios de la comunidad local. No solo somos un albergue. Te ayudamos a encontrar a tu compañero de vida y te asesoramos sobre como darle un cuidado óptimo a tus mascotas.</p>
            <Link to="/SobreNosotros">
            <button id='LandingPageSection1ContainerLeftButton'>Leer más</button></Link>
            
        </div>
        <div id='LandingPageSection1ContainerRight'>
            <img id='LandingPageSection1ContainerRightimg' src="./Assets/PerroGolden.png" alt="" />
        </div>
    </div>
  )
}

export default LandingPageSection1
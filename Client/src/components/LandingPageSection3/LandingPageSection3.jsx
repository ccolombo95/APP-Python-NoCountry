import "./LandingPageSection3.css";
import React from "react";

function LandingPageSection3() {
  return (
    <section className="container-seccion3">
      <div className="container-section3-title">
        <h2>servicios / Actividades </h2>
      </div>
      <div className="container-section3-servicios">

        <div className="container-servicio">
            <div className="image-servicio">
                <img src="/Assets/servicio_1.png" alt="Servicios"/>
            </div>
            <div className="servicio-text">
                <p>Contamos con un programa en línea de adopción de mascotas.</p>
            </div>
        </div>

        <div className="container-servicio">
            <div className="image-servicio">
                <img src="/Assets/servicio_2.png" alt="Servicios"/>
            </div>
            <div className="servicio-text">
                <p>Rescatamos y rehabilitamos animales de las calles, del abandono, enfermedad y situaciones de maltrato animal. </p>
            </div>
        </div>

        <div className="container-servicio">
            <div className="image-servicio">
                <img src="/Assets/servicio_3.png" alt="Servicios"/>
            </div>
            <div className="servicio-text">
                <p>Se brindan servicios gratuitos como campañas de vacunas y  esterilización para combatir la sobrepoblación de animales callejeros.</p>
            </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPageSection3;

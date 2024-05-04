import React from "react";
import "./LandingPageSection2.css";

function LandingPageSection2() {
  return (
    <section className="container-section2">
      <section className="container-section2-title">
        <h2 className="title-section-2">Logros de nuestra asociación</h2>
      </section>
      <section className="container-cards">
        
        <section className="card">
          <div className="card-container-img">
            <img src="/Assets/img_card_1.png" alt="Image Card"/>
          </div>
          <div className="text-card">
            <p>Hemos vacunado más de 5000 mascotas  en las campañas de vacunación gratuitas.</p>
          </div>
        </section>

        <section className="card">
          <div className="card-container-img">
            <img src="/Assets/img_card_2.png" alt="Image Card"/>
          </div>
          <div className="text-card">
            <p>Se brindan campañas de esterilización además de las vacunas, en sectores vulnerables de la ciudad desde 2012.</p>
          </div>
        </section>

        <section className="card">
          <div className="card-container-img">
            <img src="/Assets/img_card_3.png" alt="Image Card"/>
          </div>
          <div className="text-card">
            <p>Constantemente luchamos por los animales, al hacer valer sus derechos como seres vivos y defender la vida.</p>
          </div>
        </section>

      </section>
    </section>
  );
}

export default LandingPageSection2;

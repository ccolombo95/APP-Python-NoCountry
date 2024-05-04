import React from "react";
import "./SobreNosotrosSection.css";

function SobreNosotrosSection() {
  return (
    <div id="SobreNosotrosContainer">
      <div id="SobreNosotrosContainerLeft">
        <h1 id="LandingPageSection1ContainerLeftTittle">
          CÓNOCE MÁS <br /> SOBRE NUESTRA <br />
          ASOCIACIÓN
        </h1>
        <p id="SobreNosotrosLeftText">
          AdoptApp Crea conciencia sobre el bienestar animal de la mano de los
          refugios de la comunidad local. No solo somos un albergue. <b>Te ayudamos
          a encontrar a tu compañero de vida y te asesoramos sobre como darle un
          cuidado óptimo a tus mascotas.</b><br></br> <br></br>En AdoptApp, entendemos que adoptar una
          mascota es una decisión importante y duradera. Es por eso que
          ofrecemos <b>asesoramiento y orientación a cada persona que busca agregar
          un nuevo miembro peludo a su familia.</b> Desde la selección de la mascota
          adecuada hasta brindar información sobre nutrición, ejercicio,
          entrenamiento y atención médica.<br></br><br></br>  Creemos firmemente que <b>cada animal
          merece un hogar amoroso y comprometido</b>, y estamos comprometidos a
          hacer todo lo posible para asegurar que esto suceda.<br></br><br></br> Únete a la
          familia AdoptApp y sé parte de un movimiento que está cambiando vidas,
          una mascota a la vez. Juntos, podemos crear un mundo donde todos los
          animales sean tratados con el amor y el respeto que se merecen.
        </p>
      </div>
      <div id="LandingPageSection1ContainerRight">
        <img
          id="LandingPageSection1ContainerRightimg"
          src="./Assets/PerroGolden.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default SobreNosotrosSection;

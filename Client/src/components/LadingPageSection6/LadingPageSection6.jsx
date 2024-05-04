import React from "react";
import "./LadingPageSection6.css";

function LadingPageSection6() {
  return (
    <div id="LadingPageSection6Container">
      <div id="LadingPageSection6ContainerLeft">
        <img id="LadingPageSection6ContainerLeftImage" src="/Assets/imagenFooter.png" alt="" />

        <img id="LadingPageSection6ContainerLeftLogo" src="./Assets/AdoptAppLogo.png" alt="" />
      </div>
      <div id="LadingPageSection6ContainerRight">
        <h1 id="LadingPageSection6ContainerTittle">Contactanos</h1>
        <div id="LadingPageMap">
          <iframe title="map" width="100%" height="425" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=es&amp;q=Adoptapp+(Adoptapp)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
          <h1 id="LadingPageSection6ContainerRightText">Cra. 1 #18a 12, La Candelaria, Bogotá, Cundinamarca, Colombia  <br /> Horario: 11:00 a.m. a 7:00 p.m. de Lunes a Viernes</h1>
         
        </div>

        <div id="LadingPageSection6ContainerRightSocialContainer">
          <img src="/Assets/PhoneLogo.png" alt="" />
          <img src="/Assets/FacebookLogo.png" alt="" />
          <img src="/Assets/WhatsappLogo.png" alt="" />
          <img src="/Assets/MailLogo.png" alt="" />
        </div>
      </div>
      <div id="copyright">
        <p>Copyright 2024</p>
        <span>|</span>
        <a href="/logIn">Iniciar sesión</a>
      </div>
    </div>

  );
}

export default LadingPageSection6;

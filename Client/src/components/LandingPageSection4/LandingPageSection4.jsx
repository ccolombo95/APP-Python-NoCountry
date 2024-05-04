import Slider from "../Slider/Slider";
import "./LandingPageSection4.css";
import React from "react";

function LandingPageSection4() {
  return (
    <section className="container-section4">
      <div className="container-section4 h2">
        <h2 className="container-section4-title">
          conoce a tu nuevo mejor amigo
        </h2>
      </div>
      <div className="container-section4-slider">
        <Slider/>
      </div>
    </section>
  );
}

export default LandingPageSection4;

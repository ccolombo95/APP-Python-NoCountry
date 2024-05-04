import React from "react";
import "./BodyContainerLandingPage.css";

import LandingPageSection1 from "../LandingPageSection1/LandingPageSection1";
import LandingPageSection2 from "../LandingPageSection2/LandingPageSection2";
import LandingPageSection3 from "../LandingPageSection3/LandingPageSection3";
import LandingPageSection5 from "../LandingPageSection5/LandingPageSection5";
import LadingPageSection6 from "../LadingPageSection6/LadingPageSection6";
import LandingPageSection4 from "../LandingPageSection4/LandingPageSection4";
import LandingPageSectionNoticias from "../LandingPageSectionNoticias/LandingPageSectionNoticias";

function BodyContainerLandingPage() {
  return (
    <div id="BodyContainerLandingPage">
      <div className="BodyContainerSection">
        <LandingPageSection1 />
      </div>
      <div className="BodyContainerSection">
        <LandingPageSectionNoticias/>
      </div>
      <div className="BodyContainerSection">
        <LandingPageSection2 />
      </div>
      <div className="BodyContainerSection">
        <LandingPageSection3 />
      </div>
      
      <div className="BodyContainerSection">
        <LandingPageSection4/>
      </div>

      <div className="BodyContainerSection">
        <LandingPageSection5 />
      </div>
      <div className="BodyContainerSection">
        <LadingPageSection6 />
      </div>
    </div>
  );
}

export default BodyContainerLandingPage;

import React, { useEffect, useRef, useState } from "react";
import "../Slider/Slider.css";

function Slider() {
  const listRef = useRef();
  const [mascotas, setMascotas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://adoptaapp.pythonanywhere.com/mascotas'); // Hacer la solicitud HTTP a tu API
        const data = await response.json();
        setMascotas(data);
      } catch (error) {
        console.error('Error fetching mascotas:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const listNode = listRef.current;
    const listItem = listNode.querySelectorAll("li")[currentIndex];

    if (listItem) {
      listItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  const scrollToImage = (direction) => {
    setCurrentIndex((prevIndex) => {
      if (direction === "prev") {
        return prevIndex === 0 ? mascotas.length - 1 : prevIndex - 1;
      } else {
        return (prevIndex + 1) % mascotas.length;
      }
    });
  };

  return (
    <div className="main-container">
      <div className="slider-container">
        <div className="leftArrow" onClick={() => scrollToImage("prev")}>
          &#10092;
        </div>

        <div className="container-images">
          <ul ref={listRef}>
            {mascotas.map((item, index) => (
              <li className="slider-card" key={item.id}>
                <div
                  className="slider-card-img"
                  style={{
                    backgroundImage: `url(${item.imagen_url})`,
                  }}
                ></div>
                <p className="slider-card-text">{item.nombre}</p>
            
              </li>
            ))}
          </ul>
        </div>
        <div className="rightArrow" onClick={() => scrollToImage("next")}>
          &#10093;
        </div>
      </div>
    </div>
  );
}

export default Slider;

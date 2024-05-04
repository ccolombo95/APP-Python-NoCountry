import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./BookingInfo.css"

function BookingInfo() {
  const { id } = useParams();
  const idNum = parseInt(id, 10);
  const [arrayCandidato, setArrayCandidato] = useState(null);

  useEffect(() => {
    fetch("https://adoptaapp.pythonanywhere.com/candidatos")
      .then(response => response.json())
      .then(dataC => {
        fetch("https://adoptaapp.pythonanywhere.com/mascotas")
          .then(response => response.json())
          .then(dataM => {
            const combinedData = dataC.map(candidato => {
              const mascota = dataM.find(mascota => mascota.id === candidato.id_mascota);
              return { ...candidato, mascota: mascota };
            });
            const filteredCandidato = combinedData.find(candidato => candidato.id === idNum);
            setArrayCandidato(filteredCandidato);
          })
          .catch(error => console.error("Error fetching mascotas:", error));
      })
      .catch(error => console.error("Error fetching candidatos:", error));
  }, [idNum]); // Se ejecuta cada vez que idNum cambia

  if (!arrayCandidato) {
    return <div>Cargando...</div>;
  }

  return (
    <div id="BodyContainerAdmin">
      <div className="BodyContainerSection">
        <div id="BookingTables">
        <table id="InfoCandidato" className="BookingInfo">

          <tbody>
            <tr>
              <td className="label">Nombre y Apellido:</td>
              <td>{arrayCandidato.nombreApellido}</td>
            </tr>
            <tr>
              <td className="label">Ciudad:</td>
              <td>{arrayCandidato.ciudad}</td>
            </tr>
            <tr>
              <td className="label">Trabajo:</td>
              <td>{arrayCandidato.trabajoCargo}</td>
            </tr>
            <tr>
              <td className="label">Solvencia económica:</td>
              <td>{arrayCandidato.solvenciaEconomica}</td>
            </tr>
            <tr>
              <td className="label">Tipo de vivienda:</td>
              <td>{arrayCandidato.tipoVivienda}</td>
            </tr>
            <tr>
              <td className="label">Tiene mascotas:</td>
              <td>{arrayCandidato.tieneMascotas}</td>
            </tr>
            <tr>
              <td className="label">Antecedentes:</td>
              <td>{arrayCandidato.antecedentes}</td>
            </tr>
            <tr>
              <td className="label">Acuerdo Adopción:</td>
              <td>{arrayCandidato.acuerdoAdopción}</td>
            </tr>
            <tr>
              <td className="label">Lugar de descanso:</td>
              <td>{arrayCandidato.dondeDormira}</td>
            </tr>
            <tr>
              <td className="label">Persona a Cargo:</td>
              <td>{arrayCandidato.aCargo}</td>
            </tr>
            <tr>
              <td className="label">Veterinario de confianza:</td>
              <td>{arrayCandidato.veterinarioConfianza}</td>
            </tr>
            <tr>
              <td className="label">Esterilización:</td>
              <td>{arrayCandidato.esterilización}</td>
            </tr>
            <tr>
              <td className="label">Email de contacto:</td>
              <td>{arrayCandidato.email}</td>
            </tr>
          </tbody>
          </table>

          <table id="InfoMascota" className="BookingInfo">
          <thead>
          <tr>
              <th><h2>{arrayCandidato.mascota.nombre}</h2></th>
              <th><img src={arrayCandidato.mascota.imagen_url} alt="Foto de la mascota" /></th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td className="label">Edad:</td>
              <td className="valor">{arrayCandidato.mascota.edad}</td> 
            </tr>
            <tr>
              <td className="label">Tamaño:</td>
              <td className="valor">{arrayCandidato.mascota.tamaño}</td>
            </tr>
            <tr>
              <td className="label">Temperamento:</td>
              <td className="valor">{arrayCandidato.mascota.temperamento}</td>
            </tr>
            <tr>
              <td className="label">Sexo:</td>
              <td className="valor">{arrayCandidato.mascota.sexo}</td>
            </tr>
            <tr>
              <td className="label">Especie:</td>
              <td className="valor">{arrayCandidato.mascota.especie}</td>
            </tr >
          </tbody>
          </table>

        </div>


      </div>
    </div>
  );
}

export default BookingInfo;

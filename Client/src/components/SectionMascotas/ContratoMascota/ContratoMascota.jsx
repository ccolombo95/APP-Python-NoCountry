import React from 'react';
import { useParams, Link } from 'react-router-dom'; 
import "./ContratoMascota.css";

function ContratoMascota() {
  const { id } = useParams();
  const idNum = parseInt(id, 10);
  

  return (
    <section id='ContratoContainer'>
      <div id="ContratoMascota">
        
        <h1 id="ContratoTittle">Contrato de Adopción</h1>
        <h3>Me comprometo a cumplir con las siguientes obligaciones:</h3>
        <ul>
          <li>Visitas periódicas al veterinario, se sugiere que el médico sea una persona consiente,  protectora y amante de los animalitos, deberá ser siempre el mismo profesional de manera que  conozca desde el inicio al paciente que estará tratando.</li>
          <li>El animalito deberá estar al día con sus vacunas, vitaminas y desparasitantes.</li>
          <li> Si el animalito adoptado es un gatito deberá por lo menos permanecer dentro de casa hasta  que conozca el sitio y se adapte a sus nuevos dueños 20 días, para que juntamente con la  compañía de sus amos conozca y comparte sitios como el patio de su casa, entre otros. </li>
          <li> Podría recibir visitas aleatorias en mi domicilio, con el fin de realizar el seguimiento del estado, trato y medio en  el que se desenvuelve el animalito adoptado; también así se podrá mantener actualizada  nuestra base de datos</li>
        </ul>
        <h3>Al firmar este documento, el adoptante acepta que: </h3>
        <ul>
          <li> El adoptado será un miembro más de su familia. </li>
          <li>El adoptado tendrá en todo momento agua limpia con libre acceso. </li>
          <li>El adoptado tendrá una alimentación balanceada.</li>
          <li>El adoptado usará SIEMPRE UN COLLAR CON SU PLACA DE IDENTIFICACIÓN. Incluyendo nombre y teléfono del responsable </li>
          <li>El adoptado no será en ningún caso golpeado, maltratado, humillado, abandonado, ni regalado.</li>
          <li>El adoptado debe contar con un área para dormir y comer. </li>
          <li> El adoptado recibirá los cuidados médicos necesarios para su bienestar. Incluye desparasitación cada  6 meses y vacunación anual. </li>
          <li>El adoptado será esterilizado de manera obligatoria. </li>
          <li>SI NO SE CUMPLIERA CON LO INDICADO, EL ADOPTADO SERÁ RETIRADO  INMEDIATAMENTE Y SERA REMITIDO A LAS AUTORIDADES CORRESPONDIENTES  PARA LA APLICACIÓN DE SU SANCIÓN IMPUESTA POR LA JURISDICCION VIGENTE.</li>
        </ul>
        <div className="container-boton">
          <Link to={`/perfil/${idNum}/contrato/FormularioAdopcion`}>
            <span id="ContratoBoton">Aceptar</span>
          </Link>

        </div>
     
     


       



      </div>

    </section>
  );
}

export default ContratoMascota;

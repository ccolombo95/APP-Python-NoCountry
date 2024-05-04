import React from "react";
import "./FormularioAdopcion.css";
import { Link, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import axios from 'axios';

function validacion(values) {
  let isValid = true;
  const errors = {};

  if (!values.nombreApellido) {
    errors.nombreApellido = "Campo requerido";
    isValid = false;
  }
  if (!values.ciudad) {
    errors.ciudad = "Campo requerido";
    isValid = false;
  }
  if (!values.trabajoCargo) {
    errors.trabajoCargo = "Campo requerido";
    isValid = false;
  }
  if (!values.solvenciaEconomica) {
    errors.solvenciaEconomica = "Campo requerido";
    isValid = false;
  }
  if (!values.tipoVivienda) {
    errors.tipoVivienda = "Campo requerido";
    isValid = false;
  }
  if (!values.vivienda) {
    errors.vivienda = "Campo requerido";
    isValid = false;
  }
  if (!values.tieneMascotas) {
    errors.tieneMascotas = "Campo requerido";
    isValid = false;
  }
  if (!values.antecedentes) {
    errors.antecedentes = "Campo requerido";
    isValid = false;
  }
  if (!values.adopcion) {
    errors.adopcion = "Campo requerido";
    isValid = false;
  }
  if (!values.acuerdoAdopcion) {
    errors.acuerdoAdopcion = "Campo requerido";
    isValid = false;
  }
  if (!values.dondeDormira) {
    errors.dondeDormira = "Campo requerido";
    isValid = false;
  }
  if (!values.aCargo) {
    errors.aCargo = "Campo requerido";
    isValid = false;
  }
  if (!values.veterinarioConfianza) {
    errors.veterinarioConfianza = "Campo requerido";
    isValid = false;
  }
  if (!values.esterilizacion) {
    errors.esterilizacion = "Campo requerido";
    isValid = false;
  }
  if (!values.email) {
    errors.email = "Campo requerido";
    isValid = false;
  }

  return { isValid, errors };
}

function FomularioAdopcion() {
  const { id } = useParams(); 

  const idNum = parseInt(id, 10);
  const formik = useFormik({
    initialValues: {
      id_mascota: idNum,
      nombreApellido: "",
      ciudad: "",
      trabajoCargo: "",
      solvenciaEconomica: "",
      tipoVivienda: "",
      vivienda: "",
      tieneMascotas: "",
      antecedentes: "",
      adopcion: "",
      acuerdoAdopcion: "",
      dondeDormira: "",
      aCargo: "",
      veterinarioConfianza: "",
      esterilizacion: "",
      email:"",
    },
    onSubmit: (values) => {
      const { isValid, errors } = validacion(values);
      if (isValid) {
        axios.post('https://adoptaapp.pythonanywhere.com/candidato', values)
          .then(response => {
            console.log(response.data);
            window.location.href = `/perfil/${idNum}/contrato/FormularioAdopcion/end`;
          })
          .catch(error => {
            console.error('Error al enviar los datos', error);
          });
      } else {
        console.error('Campos inválidos', errors);
        const formAlert = document.getElementById("FormAlert");

        if (formAlert) {
          formAlert.textContent = "Todos los campos son requeridos";
          document.getElementById("FormAlert").style.display ="flex";
        } else {
          console.error('Elemento FormAlert no encontrado en el DOM');
        }
      }
    },
  });
  
  return (
    <div className="container-form">
      <h1>Formulario de Adopción</h1>
      <div className="FomularioAdopcion">
        <form onSubmit={formik.handleSubmit}>
          <div className="container-lable-input">
            <div>
              <label>¿Cuál es tu nombre y apellido?</label>
            </div>
            <div>
              <input
                id="nombreApellido"
                name="nombreApellido"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.nombreApellido}
              />
            </div>
          </div>
          <div className="container-lable-input">
            <div>
              <label>¿En qué ciudad vives?</label>
            </div>
            <div>
              <input
                id="ciudad"
                name="ciudad"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.ciudad}
              />
            </div>
          </div>
          <div className="container-lable-input">
            <div>
              <label>¿Cuál es tu trabajo y cargo?</label>
            </div>
            <div>
              <input
                id="trabajoCargo"
                name="trabajoCargo"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.trabajoCargo}
              />
            </div>
          </div>
          <div className="container-lable-input">
            <div>
              <label>¿A cuánto asciende tu solvencia económica mensualmente?</label>
            </div>
            <div>
              <select
                id="solvenciaEconomica"
                name="solvenciaEconomica"
                onChange={formik.handleChange}
                value={formik.values.solvenciaEconomica}
              >
                <option value="">-- Selecciona --</option>
                <option value="$500 - $1000 USD">$500 - $1000 USD</option>
                <option value="$1000 - $2000 USD">$1000 - $2000 USD</option>
                <option value="Más de $2000 USD">Más de $2000 USD</option>
              </select>
            </div>
          </div>
          {/* Agregar los campos faltantes aquí */}
          <div className="container-lable-input">
            <div>
              <label>¿Qué tipo de vivienda tienes?</label>
            </div>
            <div>
              <select
                id="tipoVivienda"
                name="tipoVivienda"
                onChange={formik.handleChange}
                value={formik.values.tipoVivienda}
              >
                <option value="">-- Selecciona --</option>
                <option value="Casa">Casa</option>
                <option value="Departamento">Departamento</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
          </div>
          <div className="container-lable-input">
            <div>
              <label>¿Dónde viviría el animal?</label>
            </div>
            <div>
              <input
                id="vivienda"
                name="vivienda"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.vivienda}
              />
            </div>
          </div>
          <div className="container-lable-input">
            <div>
              <label>¿Tienes otras mascotas?</label>
            </div>
            <div>
              <input
                id="tieneMascotas"
                name="tieneMascotas"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.tieneMascotas}
              />
            </div>
          </div>
          <div className="container-lable-input">
            <div>
              <label>¿Tienes antecedentes de tenencia de animales?</label>
            </div>
            <div>
              <input
                id="antecedentes"
                name="antecedentes"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.antecedentes}
              />
            </div>
          </div>
          <div className="container-lable-input">
            <div>
              <label>¿Por qué deseas adoptar a esta mascota?</label>
            </div>
            <div>
              <input
                id="adopcion"
                name="adopcion"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.adopcion}
              />
            </div>
          </div>
          <div className="container-lable-input">
            <div>
              <label>¿Estás de acuerdo con el proceso de adopción?</label>
            </div>
            <div>
              <input
                id="acuerdoAdopcion"
                name="acuerdoAdopcion"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.acuerdoAdopcion}
              />
            </div>
          </div>
          <div className="container-lable-input">
            <div>
              <label>¿Dónde dormirá el animal?</label>
            </div>
            <div>
              <input
                id="dondeDormira"
                name="dondeDormira"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.dondeDormira}
              />
            </div>
          </div>
          <div className="container-lable-input">
            <div>
              <label>¿Quién se hará cargo del animal?</label>
            </div>
            <div>
              <input
                id="aCargo"
                name="aCargo"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.aCargo}
              />
            </div>
          </div>
          <div className="container-lable-input">
            <div>
              <label>¿Tienes un veterinario de confianza?</label>
            </div>
            <div>
              <input
                id="veterinarioConfianza"
                name="veterinarioConfianza"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.veterinarioConfianza}
              />
            </div>
          </div>
          <div className="container-lable-input">
            <div>
              <label>¿Estás de acuerdo con la esterilización del animal?</label>
            </div>
            <div>
              <input
                id="esterilizacion"
                name="esterilizacion"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.esterilizacion}
              />
            </div>
          </div>
          <div className="container-lable-input">
            <div>
              <label>Escribí tu email de contacto</label>
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
          </div>
          <p id="FormAlert" className="alert warning"></p>
          <div className="container-button">
            <button type="submit" className="submit-btn">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FomularioAdopcion;

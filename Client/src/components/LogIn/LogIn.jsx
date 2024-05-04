import React, { useState } from "react";
import "./LogIn.css";
import { Link } from 'react-router-dom'; 

function LogIn() {
  // Estado para almacenar los valores del usuario y la contraseña
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    // Comprobar si el usuario y la contraseña coinciden con los valores deseados
    if (username === "Admin" && password === "Admin") {
      // Hacer algo cuando las credenciales son correctas, por ejemplo, habilitar el enlace
      document.getElementById("link").style.pointerEvents = "auto";
    } else {
      // Hacer algo si las credenciales son incorrectas
      document.getElementById("alert").style.display = "flex";
    }
  };

  return (
    <section id="SignUp">
      <div id="SignUpContainer">
        <form onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>
          <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Contraseña" maxLength="8" value={password} onChange={(e) => setPassword(e.target.value)} />
          <p id="alert">Usuario o contraseña incorrecta</p>
          <button type="submit" id="SignUpButton"><span><a href="/Admin"> Aceptar</a> </span></button>
        </form>
       
      </div>
    </section>
  );
}

export default LogIn;

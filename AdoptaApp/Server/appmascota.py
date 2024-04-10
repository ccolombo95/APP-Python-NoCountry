#--------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, request, jsonify, render_template
#from flask import request

# Instalar con pip install flask-cors
from flask_cors import CORS

# Instalar con pip install mysql-connector-python
import mysql.connector

# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename

# No es necesario instalar, es parte del sistema standard de Python
import os
import time
#--------------------------------------------------------------------



app = Flask(__name__)
CORS(app)  # Esto habilitará CORS para todas las rutas

#--------------------------------------------------------------------
class Catalogo:
    #----------------------------------------------------------------
    # Constructor de la clase
    def __init__(self, host, user, password, database):
        # Primero, establecemos una conexión sin especificar la base de datos
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()

        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        # Una vez que la base de datos está establecida, creamos la tabla si no existe
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS perritos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            edad INT NOT NULL,
            temperamento VARCHAR(255) NOT NULL,
            sexo ENUM('M', 'F') NOT NULL
        )''')
        self.conn.commit()

        # Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)
        
    #----------------------------------------------------------------
    def agregar_perrito(self, nombre, edad, temperamento, sexo):
        # Verificamos si ya existe un perrito con el mismo nombre
        self.cursor.execute(f"SELECT * FROM perritos WHERE nombre = '{nombre}'")
        perrito_existe = self.cursor.fetchone()
        if perrito_existe:
            return False

        sql = "INSERT INTO perritos (nombre, edad, temperamento, sexo) VALUES (%s, %s, %s, %s)"
        valores = (nombre, edad, temperamento, sexo)

        self.cursor.execute(sql, valores) 
        self.conn.commit()
        return True


    #----------------------------------------------------------------
    def consultar_perrito(self, nombre):
        # Consultamos un perrito a partir de su nombre
        self.cursor.execute(f"SELECT * FROM perritos WHERE nombre = '{nombre}'")
        return self.cursor.fetchone()

    #----------------------------------------------------------------
    def modificar_perrito(self, id, nuevo_nombre, nueva_edad, nuevo_temperamento, nuevo_sexo):
        sql = "UPDATE perritos SET nombre = %s, edad = %s, temperamento = %s, sexo = %s WHERE id = %s"
        valores = (nuevo_nombre, nueva_edad, nuevo_temperamento, nuevo_sexo, id)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

    #----------------------------------------------------------------
    def listar_perritos(self):
        self.cursor.execute("SELECT * FROM perritos")
        perritos = self.cursor.fetchall()
        return perritos

    #----------------------------------------------------------------
    def eliminar_perrito(self, id):
        # Eliminamos un perrito de la tabla a partir de su ID
        self.cursor.execute(f"DELETE FROM perritos WHERE id = {id}")
        self.conn.commit()
        return self.cursor.rowcount > 0
    
    #----------------------------------------------------------------
    def mostrar_perrito(self, id):
    # Mostramos los datos de un perrito a partir de su ID
        perrito = self.consultar_perrito(id)
        if perrito:
            print("-" * 40)
            print(f"ID.........: {perrito['id']}")
            print(f"Nombre.....: {perrito['nombre']}")
            print(f"Edad.......: {perrito['edad']}")
            print(f"Temperamento: {perrito['temperamento']}")
            print(f"Sexo.......: {'Masculino' if perrito['sexo'] == 'M' else 'Femenino'}")
            print("-" * 40)
        else:
            print("Perrito no encontrado.")

#--------------------------------------------------------------------
# Cuerpo del programa
#--------------------------------------------------------------------
# Crear una instancia de la clase Catalogo
catalogo = Catalogo(host='localhost', user='root', password='root', database='adopcion_perritos')

# Agregar algunos perritos (opcional)
# catalogo.agregar_perrito("Pia", 3, "Juguetona", "F")
# catalogo.agregar_perrito("Candela", 2, "Tranquila", "F")
# catalogo.agregar_perrito("Manchitas", 5, "Amigable", "M")

# Carpeta para guardar las imágenes
RUTA_DESTINO = './static/imagenes/'

# Al subir al servidor, deberá utilizarse la siguiente ruta. 
# RUTA_DESTINO = '/home/USUARIO/mysite/static/imagenes'

# A continuación, se pueden definir las rutas Flask y las funciones asociadas según sea necesario.
# Por ejemplo, puedes definir las rutas para listar, agregar, modificar y eliminar perritos.
# Además, puedes definir rutas para mostrar y manejar imágenes de perritos si es necesario.

#--------------------------------------------------------------------
# Listar todos los perritos
#--------------------------------------------------------------------
# La ruta Flask /perritos con el método HTTP GET está diseñada para proporcionar los detalles de todos los perritos almacenados en la base de datos.
# El método devuelve una lista con todos los perritos en formato JSON.
@app.route("/perritos", methods=["GET"])
def listar_perritos():
    perritos = catalogo.listar_perritos()
    return jsonify(perritos)



#--------------------------------------------------------------------
# Mostrar un solo perrito según su ID
#--------------------------------------------------------------------
# La ruta Flask /perritos/<int:id> con el método HTTP GET está diseñada para proporcionar los detalles de un perrito específico basado en su ID.
# El método busca en la base de datos el perrito con el ID especificado y devuelve un JSON con los detalles del perrito si lo encuentra, o un mensaje de error si no lo encuentra.
@app.route("/perritos/<int:id>", methods=["GET"])
def mostrar_perrito(id):
    perrito = catalogo.consultar_perrito(id)
    if perrito:
        return jsonify(perrito), 200
    else:
        return "Perrito no encontrado", 404



#--------------------------------------------------------------------
# Agregar un perrito
#--------------------------------------------------------------------
@app.route("/perritos", methods=["POST"])
# La ruta Flask `/perritos` con el método HTTP POST está diseñada para permitir la adición de un nuevo perrito a la base de datos.
# La función agregar_perrito se asocia con esta URL y es llamada cuando se hace una solicitud POST a /perritos.
def agregar_perrito():
    # Recojo los datos del formulario
    nombre = request.form['nombre']
    edad = request.form['edad']
    temperamento = request.form['temperamento']
    sexo = request.form['sexo']

    # Me aseguro de que el perrito no exista ya
    perrito = catalogo.consultar_perrito(nombre)
    if not perrito:  # Si el perrito no existe...
        # Agregar el perrito a la base de datos
        if catalogo.agregar_perrito(nombre, edad, temperamento, sexo):
            # Si el perrito se agrega con éxito, se devuelve una respuesta JSON con un mensaje de éxito y un código de estado HTTP 201 (Creado).
            return jsonify({"mensaje": "Perrito agregado correctamente."}), 201
        else:
            # Si el perrito no se puede agregar, se devuelve una respuesta JSON con un mensaje de error y un código de estado HTTP 500 (Internal Server Error).
            return jsonify({"mensaje": "Error al agregar el perrito."}), 500
    else:
        # Si el perrito ya existe, se devuelve una respuesta JSON con un mensaje de error y un código de estado HTTP 400 (Solicitud Incorrecta).
        return jsonify({"mensaje": "El perrito ya existe."}), 400

#--------------------------------------------------------------------
# Modificar un perrito según su id
#--------------------------------------------------------------------
@app.route("/perritos/<int:id>", methods=["PUT"])
# La ruta Flask /perritos/<int:id> con el método HTTP PUT está diseñada para actualizar la información de un perrito existente en la base de datos, identificado por su ID.
# La función modificar_perrito se asocia con esta URL y es invocada cuando se realiza una solicitud PUT a /perritos/ seguido de un número (el ID del perrito).
def modificar_perrito(id):
    # Se recuperan los nuevos datos del formulario
    nuevo_nombre = request.form.get("nombre")
    nueva_edad = request.form.get("edad")
    nuevo_temperamento = request.form.get("temperamento")
    nuevo_sexo = request.form.get("sexo")

    # Se llama al método modificar_perrito pasando el ID del perrito y los nuevos datos.
    if catalogo.modificar_perrito(id, nuevo_nombre, nueva_edad, nuevo_temperamento, nuevo_sexo):
        # Si la actualización es exitosa, se devuelve una respuesta JSON con un mensaje de éxito y un código de estado HTTP 200 (OK).
        return jsonify({"mensaje": "Perrito modificado correctamente."}), 200
    else:
        # Si el perrito no se encuentra (por ejemplo, si no hay ningún perrito con el ID dado), se devuelve un mensaje de error con un código de estado HTTP 404 (No Encontrado).
        return jsonify({"mensaje": "Perrito no encontrado"}), 404

#--------------------------------------------------------------------
# Eliminar un perrito según su código
#--------------------------------------------------------------------
@app.route("/perritos/<int:id>", methods=["DELETE"])
# La ruta Flask /perritos/<int:id> con el método HTTP DELETE está diseñada para eliminar un perrito específico de la base de datos, utilizando su ID como identificador.
# La función eliminar_perrito se asocia con esta URL y es llamada cuando se realiza una solicitud DELETE a /perritos/ seguido de un número (el ID del perrito).
def eliminar_perrito(id):
    # Busco el perrito en la base de datos
    perrito = catalogo.consultar_perrito(id)
    if perrito:  # Si el perrito existe, verifico si hay una imagen asociada en el servidor.
        # Luego, elimino el perrito del catálogo
        if catalogo.eliminar_perrito(id):
            # Si el perrito se elimina correctamente, se devuelve una respuesta JSON con un mensaje de éxito y un código de estado HTTP 200 (OK).
            return jsonify({"mensaje": "Perrito eliminado"}), 200
        else:
            # Si ocurre un error durante la eliminación (por ejemplo, si el perrito no se puede eliminar de la base de datos por alguna razón), se devuelve un mensaje de error con un código de estado HTTP 500 (Error Interno del Servidor).
            return jsonify({"mensaje": "Error al eliminar el perrito"}), 500
    else:
        # Si el perrito no se encuentra (por ejemplo, si no existe un perrito con el ID proporcionado), se devuelve un mensaje de error con un código de estado HTTP 404 (No Encontrado).
        return jsonify({"mensaje": "Perrito no encontrado"}), 404


#--------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
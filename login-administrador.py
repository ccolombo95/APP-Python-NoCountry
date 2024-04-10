#---------------------------------------------------------------------------

#Instalar con pip install flask
from flask import Flask, request, jsonify
#fron flask import request

#Instalar con pip install flask-cors
from flask_cors import CORS

#Instalar con pip install mysql-connector-python
import mysql.connector

from werkzeug.security import generate_password_hash, check_password_hash

#---------------------------------------------------------------------------

app = Flask(__name__)
CORS(app)

#------------------------------------------------------------------------------------------------------------------------------------------------
# Aca cree una clase administrador que se encarga de interectuar con la base de datos para registrar y autenticar administradores.
#------------------------------------------------------------------------------------------------------------------------------------------------

class Administrador:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        self.cursor = self.conn.cursor(dictionary=True)

#------------------------------------------------------------------------------------------------------------------------------------------------
#La funcion registrar_administrador se va a encargar de registrar un nuevo administrador en la base de datos.
#------------------------------------------------------------------------------------------------------------------------------------------------

    def registrar_administrador(self, username, password):
        hashed_password = generate_password_hash(password)
        sql = "INSERT INTO administradores (username, password) VALUES (%s, %s)"
        values = (username, hashed_password)
        self.cursor.execute(sql, values)
        self.conn.commit()

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
#Esta funcion de login_administrador verifica las credenciales que son proporcionadas por el usuario con las que se encuentran almacenadas en la base de datos, si es correcta devuel [True] si no devuelve [False]
#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    def login_administrador(self, username, password):
        self.cursor.execute("SELECT * FROM administradores WHERE username = %s", (username,))
        administrador = self.cursor.fetchone()
        if administrador and check_password_hash(administrador['password'], password):
            return True
        else:
            return False

#--------------------------------------------------------------------------------------------------------
# Modifica estos valores con tus credenciales de MySQL
db = Administrador(host='localhost', user='root', password='root', database='mi_base_de_datos')
#--------------------------------------------------------------------------------------------------------

#Las rutas /registrar y /login esta asociada a las funciones para registrar y autenticar administradores

#--------------------------------------------------------------------------------------------------------

@app.route('/registrar', methods=['POST'])
def registrar():
    data = request.json
    username = data['username']
    password = data['password']
    db.registrar_administrador(username, password)
    return jsonify({'message': 'Administrador registrado exitosamente'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    if db.login_administrador(username, password):
        return jsonify({'message': 'Inicio de sesión exitoso'})
    else:
        return jsonify({'message': 'Nombre de usuario o contraseña incorrectos'})


if __name__ == '__main__':
    app.run(debug=True)
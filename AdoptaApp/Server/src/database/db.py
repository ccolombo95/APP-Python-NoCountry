import mysql.connector
import os

# Configuracion de la base de datos
db_config = {
    "host": os.environ.get('MYSQLHOST'),
    "user": os.environ.get('MYSQLUSER'),
    "password": os.environ.get('MYSQLPASSWORD'),
    "port": os.environ.get('MYSQLPORT'),
    "database": os.environ.get('MYSQLDATABASE')
}


# Función para conectar a la base de datos de MySQL
def conectar_db():
    return mysql.connector.connect(**db_config)
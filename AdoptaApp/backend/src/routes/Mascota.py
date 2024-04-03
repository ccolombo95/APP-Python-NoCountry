from flask import Blueprint, jsonify
from database.db import conectar_db

main = Blueprint('mascota_blueprint', __name__)


@main.route('/', methods=['GET'])
def get_mascotas():
    try:
        db = conectar_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM mascotas")
        mascotas = cursor.fetchall()
        cursor.close()
        db.close()

        mascotas_list = []
        for mascota in mascotas:
            mascota_id, nombre, edad, tamaño, raza, temperamento, imagen_url = mascota
            mascotas_list.append({
                'mascota_id': mascota_id,
                'nombre': nombre,
                'edad': edad,
                'tamaño': tamaño,
                'raza': raza,
                'temperamento': temperamento,
                'imagen_url': imagen_url
            })

        return jsonify({'mascotas': mascotas_list, 'res': True}), 200
    
    except Exception as e:
        return jsonify({'error': str(e), 'res': False}), 500
from flask import jsonify
from database.db import conectar_db

def traer_mascotas():
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

def traer_mascotas_por_id(id):
    try:
        db = conectar_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM mascotas WHERE id = %s", (id,))
        mascota = cursor.fetchone()
        cursor.close()
        db.close()

        if mascota:
            mascota_id, nombre, edad, tamaño, raza, temperamento, imagen_url = mascota
            mascota_data = {
                'mascota_id': mascota_id,
                'nombre': nombre,
                'edad': edad,
                'tamaño': tamaño,
                'raza': raza,
                'temperamento': temperamento,
                'imagen_url': imagen_url
            }

            return jsonify({'mascota': mascota_data, 'res': True}), 200
        
        else:
            return jsonify({'error': 'Mascota no encontrada', 'res': False}), 404

    except Exception as e:
        return jsonify({'error': str(e), 'res': False}), 500
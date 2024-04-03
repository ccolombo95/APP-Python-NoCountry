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
        return jsonify({'mascotas': mascotas, 'res': True}), 200
    
    except Exception as e:
        return jsonify({'error': str(e), 'res': False}), 500
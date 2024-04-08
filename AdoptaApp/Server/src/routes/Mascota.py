from flask import Blueprint
from controllers.MascotaController import *

main = Blueprint('mascota_blueprint', __name__)


@main.route('/', methods=['GET'])
def get_mascotas():
    return traer_mascotas()

@main.route('/<int:id>', methods=['GET'])
def get_mascotas_by_id(id):
    return traer_mascotas_por_id(id)

@main.route('/registrar', methods=['POST'])
def register_mascota():
    return registrar_mascota()

@main.route('/actualizar/<int:id>', methods=['PUT'])
def update_mascota(id):
    return actualizar_mascota(id)

@main.route('/eliminar/<int:id>', methods=['DELETE'])
def delete_mascota(id):
    return eliminar_mascota(id)
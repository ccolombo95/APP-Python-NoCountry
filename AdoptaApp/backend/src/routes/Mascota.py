from flask import Blueprint
from controllers.MascotaController import *

main = Blueprint('mascota_blueprint', __name__)


@main.route('/', methods=['GET'])
def get_mascotas():
    return traer_mascotas()

@main.route('/<int:id>', methods=['GET'])
def get_mascotas_by_id(id):
    return traer_mascotas_por_id(id)
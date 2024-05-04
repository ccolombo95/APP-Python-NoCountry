from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Create engine and session
engine = create_engine('mysql+mysqlconnector://usuario:contraseña@usuariomysql.pythonanywhere-services.com/usuario$baseDeDatos')
Session = sessionmaker(bind=engine)
Base = declarative_base()

# Define models
class Mascota(Base):
    __tablename__ = 'mascotas'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(255))
    descripcion = Column(Text)
    edad = Column(Integer)
    temperamento = Column(String(255))
    sexo = Column(String(50))
    tamaño = Column(String(50))
    especie = Column(String(50))
    imagen_url = Column(String(255))

class Candidato(Base):
    __tablename__ = 'candidatos'

    id = Column(Integer, primary_key=True)
    id_mascota = Column(Integer)
    nombreApellido = Column(String(255))
    ciudad = Column(String(255))
    trabajoCargo = Column(String(255))
    solvenciaEconomica = Column(String(50))
    tipoVivienda = Column(String(50))
    tieneMascotas = Column(String(50))
    antecedentes = Column(Text)
    acuerdoAdopcion = Column(String(50))
    dondeDormira = Column(String(255))
    aCargo = Column(String(50))
    veterinarioConfianza = Column(String(255))
    esterilizacion = Column(String(50))
    email = Column(String(255))

class Noticia(Base):
    __tablename__ = 'noticias'

    id = Column(Integer, primary_key=True)
    titulo = Column(String(255))
    subtitulo = Column(String(255))
    cuerpo = Column(Text)
    imagen_url = Column(String(255))

# Create tables
Base.metadata.create_all(engine)

#-----------------------------------------------------CATALOGO MASCOTAS ------------------------------------------------------------------------
@app.route("/mascotas", methods=["GET"])
def listar_mascotas():
    session = Session()
    mascotas = session.query(Mascota).all()
    session.close()
    # Serializar las mascotas como diccionarios
    mascotas_serializadas = []
    for m in mascotas:
        mascota_serializada = {
            "id": m.id,
            "nombre": m.nombre,
            "descripcion": m.descripcion,
            "edad": m.edad,
            "temperamento": m.temperamento,
            "sexo": m.sexo,
            "tamaño": m.tamaño,
            "especie": m.especie,
            "imagen_url": m.imagen_url
        }
        mascotas_serializadas.append(mascota_serializada)
    return jsonify(mascotas_serializadas)

@app.route("/mascotas/<int:id>", methods=["GET"])
def mostrar_mascota(id):
    session = Session()
    mascota = session.query(Mascota).filter_by(id=id).first()
    session.close()
    if mascota:
        # Serializar la mascota como un diccionario
        mascota_serializada = {
            "id": mascota.id,
            "nombre": mascota.nombre,
            "descripcion": mascota.descripcion,
            "edad": mascota.edad,
            "temperamento": mascota.temperamento,
            "sexo": mascota.sexo,
            "tamaño": mascota.tamaño,
            "especie": mascota.especie,
            "imagen_url": mascota.imagen_url
        }
        return jsonify(mascota_serializada), 200
    else:
        return "Mascota no encontrada", 404

@app.route("/mascotas", methods=["POST"])
def agregar_mascota():
    data = request.get_json()
    mascota = Mascota(**data)
    session = Session()
    session.add(mascota)
    session.commit()
    session.close()
    return jsonify({"mensaje": "Mascota agregada correctamente."}), 201

@app.route("/mascotas/edit/<int:id>", methods=["PUT"])
def actualizar_mascota(id):
    data = request.get_json()
    session = Session()
    mascota = session.query(Mascota).filter_by(id=id).first()
    if mascota:
        for key, value in data.items():
            setattr(mascota, key, value)
        session.commit()
        session.close()
        return jsonify({"mensaje": "Mascota actualizada correctamente."}), 200
    else:
        session.close()
        return jsonify({"mensaje": "Error al actualizar la mascota."}), 500

@app.route("/mascotas/<int:id>", methods=["DELETE"])
def eliminar_mascota(id):
    session = Session()
    mascota = session.query(Mascota).filter_by(id=id).first()
    if mascota:
        session.delete(mascota)
        session.commit()
        session.close()
        return jsonify({"mensaje": "Mascota eliminada correctamente."}), 200
    else:
        session.close()
        return jsonify({"mensaje": "No se pudo eliminar la mascota."}), 500

#---------------------------------------------------------ACA CANDIDATOS-----------------------------------------------------------------
@app.route("/candidatos", methods=["GET"])
def listar_candidatos():
    session = Session()
    candidatos = session.query(Candidato).all()
    session.close()
    # Serializar los candidatos como diccionarios
    candidatos_serializados = []
    for c in candidatos:
        candidato_serializado = {
            "id": c.id,
            "id_mascota": c.id_mascota,
            "nombreApellido": c.nombreApellido,
            "ciudad": c.ciudad,
            "trabajoCargo": c.trabajoCargo,
            "solvenciaEconomica": c.solvenciaEconomica,
            "tipoVivienda": c.tipoVivienda,
            "tieneMascotas": c.tieneMascotas,
            "antecedentes": c.antecedentes,
            "acuerdoAdopcion": c.acuerdoAdopcion,
            "dondeDormira": c.dondeDormira,
            "aCargo": c.aCargo,
            "veterinarioConfianza": c.veterinarioConfianza,
            "esterilizacion": c.esterilizacion,
            "email": c.email
        }
        candidatos_serializados.append(candidato_serializado)
    return jsonify(candidatos_serializados)

@app.route("/candidatos", methods=["POST"])
def agregar_candidato():
    data = request.get_json()
    candidato = Candidato(**data)
    session = Session()
    session.add(candidato)
    session.commit()
    session.close()
    return jsonify({"mensaje": "Candidato agregado correctamente."}), 201

@app.route("/candidatos/<int:id>", methods=["DELETE"])
def eliminar_candidato(id):
    session = Session()
    candidato = session.query(Candidato).filter_by(id=id).first()
    if candidato:
        session.delete(candidato)
        session.commit()
        session.close()
        return jsonify({"mensaje": "Candidato eliminado correctamente."}), 200
    else:
        session.close()
        return jsonify({"mensaje": "No se pudo eliminar el candidato."}), 500

#--------------------------------------------------------------ACA EMPIEZAAA
@app.route("/noticias", methods=["GET"])
def listar_noticias():
    session = Session()
    noticias = session.query(Noticia).all()
    session.close()
    # Serializar las noticias como diccionarios
    noticias_serializadas = []
    for n in noticias:
        noticia_serializada = {
            "id": n.id,
            "titulo": n.titulo,
            "subtitulo": n.subtitulo,
            "cuerpo": n.cuerpo,
            "imagen_url": n.imagen_url
        }
        noticias_serializadas.append(noticia_serializada)
    return jsonify(noticias_serializadas)

@app.route("/noticias/<int:id>", methods=["GET"])
def mostrar_noticia(id):
    session = Session()
    noticia = session.query(Noticia).filter_by(id=id).first()
    session.close()
    if noticia:
        # Serializar la noticia como un diccionario
        noticia_serializada = {
            "id": noticia.id,
            "titulo": noticia.titulo,
            "subtitulo": noticia.subtitulo,
            "cuerpo": noticia.cuerpo,
            "imagen_url": noticia.imagen_url
        }
        return jsonify(noticia_serializada), 200
    else:
        return "Noticia no encontrada", 404

@app.route("/noticias", methods=["POST"])
def agregar_noticia():
    data = request.get_json()
    noticia = Noticia(**data)
    session = Session()
    session.add(noticia)
    session.commit()
    session.close()
    return jsonify({"mensaje": "Noticia agregada correctamente."}), 201

@app.route("/noticias/edit/<int:id>", methods=["PUT"])
def actualizar_noticia(id):
    data = request.get_json()
    session = Session()
    noticia = session.query(Noticia).filter_by(id=id).first()
    if noticia:
        for key, value in data.items():
            setattr(noticia, key, value)
        session.commit()
        session.close()
        return jsonify({"mensaje": "Noticia actualizada correctamente."}), 200
    else:
        session.close()
        return jsonify({"mensaje": "Error al actualizar la noticia."}), 500

@app.route("/noticias/delete/<int:id>", methods=["DELETE"])
def eliminar_noticia(id):
    session = Session()
    noticia = session.query(Noticia).filter_by(id=id).first()
    if noticia:
        session.delete(noticia)
        session.commit()
        session.close()
        return jsonify({"mensaje": "Noticia eliminada correctamente."}), 200
    else:
        session.close()
        return jsonify({"mensaje": "No se pudo eliminar la noticia."}), 500

# Ruta para manejar solicitudes OPTIONS
@app.route('/')
def handle_options():
    response = jsonify({'status': 'success'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=443, debug=True)

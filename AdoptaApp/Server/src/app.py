from flask import Flask
from config import config

# cloudinary
import cloudinary
import cloudinary.uploader
import cloudinary.api

# Routes
from routes import Mascota

app = Flask(__name__)

cloudinary.config( 
  cloud_name = "dbe88hckk", 
  api_key = "513929725166659", 
  api_secret = "0YUMB08X4zORp86rKt8xXnXo54s" 
)

if __name__ == '__main__':
    app.config.from_object(config['development'])

    # Blueprints
    app.register_blueprint(Mascota.main, url_prefix='/api/mascotas')
    
    app.run()
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

app = Flask(__name__, root_path=os.getcwd())
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

import routes, models

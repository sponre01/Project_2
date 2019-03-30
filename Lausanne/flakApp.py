
#from flask import Flask
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt
from sqlalchemy.pool import NullPool
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
 

# engine = create_engine("sqlite:///Resources/hawaii.sqlite",
#                 poolclass=NullPool)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables

# Save references to each table

# Create our session (link) from Python to the DB




app = Flask(__name__)

@app.route('/')
def hello_world():
    """List all available api routes."""
    return (
      render_template("index.html")
    )

 
if __name__ == '__main__':
    app.run(debug=True)

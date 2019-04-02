
#from flask import Flask
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt
from sqlalchemy.pool import NullPool
from flask import Flask, jsonify, render_template, abort, request
from flask_sqlalchemy import SQLAlchemy
import sqlite3
import pymysql


pymysql.install_as_MySQLdb()

# engine = create_engine("sqlite:///Resources/hawaii.sqlite",
#                 poolclass=NullPool)
engine = create_engine("sqlite:///../data/new_olympics.db")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
Olympian = Base.classes.olympics_raw
# Save references to each table



# Create our session (link) from Python to the DB
session = Session(engine)
###############################################
######## TESTING TABLE EXISTENCE ##############
###############################################
conn = sqlite3.connect('../data/new_olympics.db')
cursor = conn.cursor()
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print(cursor.fetchall())
################################################
################## WORKS ######################
################################################

app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../data/new_olympics.db'
db = SQLAlchemy(app)

from models import *

@app.route('/map')
def hello_world():
    """List all available api routes."""
    return (
      render_template("map.html")
    )
@app.route('/')
def home():
  return(
    render_template('home.html')
  )
@app.route('/mapData')
def map_data():
  subq = (db.session.query(raw.country_id,func.count(raw.id)).group_by(raw.country_id)).subquery()
  results=db.session.query(country_ref.country_name, country_ref.code, subq).join(subq).all()
  cName = [result[0] for result in results]
  code = [result[1] for result in results]
  nMedals = [result[3] for result in results]
  map_data_api = [{
    "country_name":cName,
    "code": code,
    "nMedals":nMedals
  }]
  return(
    jsonify(map_data_api)
  )

@app.route("/api/v1.0/olympians", methods=['GET'])
def names():
    """Return a list of all olympian data"""

    df = pd.read_sql_query(f"SELECT * FROM olympics_raw", con = engine)
    print(df.head())
    

    # return jsonify(all_olympians)
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/v1.0/olympians/params/', methods=['GET'])
# example : http://127.0.0.1:5000/api/v1.0/olympians/params?Edition=2000&Sport=Aquatics
def get_parameters():
  params = request.args.to_dict()
    
  def parameters(params):
    possible_params = ["City",	"Edition",	"Sport",	"Discipline",	"Athlete",	"NOC",	"Gender",	"Event",	"Event_gender",	"Medal"]
    param_keys = [p.capitalize() for p in list(params.keys())]
    fin_list = [key for key in param_keys if key in possible_params]
    return fin_list

  # testing return
  # return jsonify(params)
  param_keys = parameters(params)
  print(param_keys)
  where_clause =  ' AND '.join([f"{x} = '{params[x].capitalize()}'" for x in param_keys])
  print("----------------------------------------------------------------------")
  print(where_clause)
  df = pd.read_sql_query(f"SELECT * FROM olympics_raw WHERE {where_clause}", con = engine)
  
  print(df.head())

  # return jsonify(all_olympians)
  return jsonify(df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)

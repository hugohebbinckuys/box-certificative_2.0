import mysql.connector
from flask import g, jsonify # g = variable de contexte pr stocker données pendant contexte d'une app 
import flask
import requests
import logging # pour gestion des erreurs je crois (logs)*

from flask_cors import CORS

DATABASE = 'clustering_etudiant'

def get_db () :
    db = getattr(g, '_database', None)
    if (db is None): # donc si dans le contexte y a pas encore de bdd mémorisée : 
        db = mysql.connector.connect(host="localhost", user="root", password="", database = DATABASE)
    return db

def close_connection () : 
    db = getattr(g, "_database", None)
    if db is not None :
        db.close()
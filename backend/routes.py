import mysql.connector
from flask import g, jsonify, request # g = variable de contexte pr stocker données pendant contexte d'une app 
import flask
import requests
import logging # pour gestion des erreurs je crois (logs)

from backend.bdd_connection import get_db
from backend import app # on importe le app de backendmtn et pas de app car on a créé un __init__.py 
from flask_cors import CORS, cross_origin

@app.route('/createUser', methods=['OPTIONS', 'POST'])
@cross_origin(origin='http://localhost:5173', methods=['POST', 'OPTIONS']) # configuration plus précise de cross-origin / cross-origin automatise l'ajout des bons headers cors 
def createUser():
    if request.method == "OPTIONS":
        # Répondre aux requêtes OPTIONS (CORS preflight)
        return '', 204  # Réponse OK pour OPTIONS et 204 peremet d'accepter la demande en retournant rien. Si on avait retourné un header avec le code 200 si le header etait pas forcément bon c possible qu'il refuse l'accès donc c plus simple 204 sns rien retourenr 
    
    elif request.method == "POST" :
        try:    
            data = request.json # transfo en json pour ensuite manipuler
            username = data.get('username')
            password = data.get('password')
            role = "Student"

            db = get_db()
            cursor = db.cursor()

            query = "insert into user (username, password, role) values (%s, %s, %s)"
            cursor.execute(query, (username, password, role))
            db.commit() # pour confirmer l'envoie sinon pas enregistré dans bdd je crois. 
            return 'Done', 201
        except Exception as e: 
            logging.error(f"Erreur {e}")
            return jsonify({"error": "erreur", "details :":str(e)}), 500
    else : 
        return jsonify({'error' : 'method is not POST'})
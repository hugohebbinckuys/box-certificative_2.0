import mysql.connector
from flask import g, jsonify, request # g = variable de contexte pr stocker données pendant contexte d'une app 
import flask
import requests
import logging # pour gestion des erreurs je crois (logs)

from backend.bdd_connection import get_db
from backend import app # on importe le app de backendmtn et pas de app car on a créé un __init__.py 
from flask_cors import CORS, cross_origin

def userExists (username) : 
    db = get_db()
    cursor = db.cursor()

    query = ("Select username from user")
    cursor.execute(query, ())

    print ("username recherché : ", username)
    result = cursor.fetchall()
    print ("liste des users trouvés : ", result)

    for user in result : 
        if username in user : 
            return True
    
    return False

def getUser(username) :
    db = get_db()
    cursor = db.cursor()

    query = "Select username, password, role from user where username = %s"
    cursor.execute(query, (username,))
    userFound = cursor.fetchone()

    return userFound

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
            role = data.get('role')

            print ("\n informations reçues : " + username, ", ", password, ", ", role)

            if (userExists(username)) : 
                return jsonify({"error" : "user already exists"}), 500
            else : 
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
        return jsonify({'error :' : 'method is not POST'})
    

@app.route('/login', methods=['GET','POST','OPTIONS'])
@cross_origin(origin="http://localhost:5173", methods=['GET','POST','OPTIONS'])
def login():
    if request.method == 'OPTIONS' : 
        return '', 204
    elif request.method == 'POST' : 
        try :
            data = request.json
            username = data.get('username')
            password = data.get('password')

            if (not userExists(username)) :
                return jsonify({"error :": "user does not exist "}), 500
        
            else : 
                user = getUser(username)
                print ("user password : -", user[1], "- entered password : -", password, "-")
                if (user[1] != password) :
                    return jsonify({"error : ": "password is incorrect"}), 500
                else : 
                    return jsonify({"info": "user can access, password is ok", "role":user[2]}), 200
        except Exception as e: 
            logging.error(f"Erreur {e}")
            return jsonify({"error": "erreur", "details :":str(e)}), 500
from backend import app # on va chercher le app qu'on a instancié dans __init__.py
import backend.routes # on doit importer les routes parce que sinon app ne les connait pas et donc refuse 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

# maintenant app.py doit juste lancer le serveur et crée pas les instances de fask etc 
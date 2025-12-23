from pymongo import MongoClient
from datetime import datetime



if __name__ == "__main__":

      
    print("=== Configuration ===")
    uri = "mongodb://admin:password@localhost:27017/?authSource=admin"
    client = MongoClient(uri)

    db = client["python"]

    collection = db["students"]


# # Affichez le premier document de la collection

#     print(collection.find_one())

# Comptez le nombre total d'étudiants
    # print(collection.count_documents({}))

# # Trouvez et affichez l'étudiant nommé "Aurelia Menendez"
#     print(collection.find_one({'name' : "Aurelia Menendez"}))

# # Trouvez l'étudiant avec _id = 50
#     print(collection.find_one({'_id' : 50}))

# # Trouvez tous les étudiants qui n'ont pas de nom (name vide)
#     unknown_students = collection.find({'name' : ""})
#     for student in unknown_students:
#         print(student)

# # Affichez uniquement les noms des 10 premiers étudiants (sans les _id)

#     ten_first_students = collection.find({}, {'_id': False}).limit(10)
#     for student in ten_first_students:
#         print(student)

# # Affichez les 5 premiers étudiants triés par ordre alphabétique
#     print("les 5 premiers etudiants")
#     ten_first_students = collection.find().limit(5).sort([("name")])
#     for student in ten_first_students:
#         print(student)

# # Pour l'étudiant avec _id = 0, extrayez et affichez sa note d'examen

#     student = collection.find_one({'_id' : 0})
#     print(f"Note de l'étudiant : {student["scores"][0]["score"]}")

# # Calculez la moyenne des 3 notes de l'étudiant avec _id = 1

    # pipeline = [
    #     { "$match": { '_id': 1 } },
    #     { "$unwind" : "$scores"},
    #     { "$group": { "_id": 0, "moyenne": { "$avg": "$scores.score" } } }
    # ]
    # aggCursor = collection.aggregate(pipeline)
    # for document in aggCursor:
    #     print(document)

# # Utilisez $unwind pour déplier le tableau scores et afficher les 5 premiers résultats
#     notes = collection.aggregate({"$unwind" : "$scores"}, {"$limit" : 5})
#     for note in notes:
#         print(note)

# # Calculez la moyenne générale de chaque étudiant et affichez le top 10
#     pipeline = [
#         { "$unwind" : "$scores"},
#         { "$group": { "_id": "$name", "moyenne": { "$avg": "$scores.score" } } },
#         { "$sort" : {"moyenne": -1}},
#         { "$limit" : 10}
#     ]
#     aggCursor = collection.aggregate(pipeline)
#     for document in aggCursor:
#         print(document)

# #Calculez la moyenne de tous les étudiants pour chaque type d'évaluation (exam, quiz, homework)

#     pipeline = [
#         { "$unwind" : "$scores"},
#         { "$group": { "_id": "$scores.type", "moyenne": { "$avg": "$scores.score" } } }
#     ]
#     aggCursor = collection.aggregate(pipeline)
#     for document in aggCursor:
#         print(document)

# # Pour chaque type d'évaluation, trouvez qui a eu la meilleure note

    # pipeline = [
    #     { "$unwind" : "$scores"},
    #     {"$sort" : {"scores.score": -1}},
    #     { "$group": { "_id": "$scores.type", "max": { "$first": "$scores.score" }, "etu": { "$first": "$name" } } }, 
    # ]
    # aggCursor = collection.aggregate(pipeline)
    # for document in aggCursor:
    #     print(document)

# # Pour chaque étudiant, calculez le minimum, maximum et moyenne de ses notes

#     pipeline = [
#          { "$unwind" : "$scores"},
#          { "$group": { "_id": "$name", "minimum": { "$min": "$scores.score" }, "maximum": { "$max": "$scores.score" }, "moyenne": { "$avg": "$scores.score" } } },
#     ]
#     aggCursor = collection.aggregate(pipeline)
#     for document in aggCursor:
#          print(document)

# # Comptez combien d'étudiants ont une moyenne générale supérieure à 70

    # pipeline = [
    #      { "$unwind" : "$scores"},
    #      { "$group": { "_id": "$_id", "minimum": { "$min": "$scores.score" }, "maximum": { "$max": "$scores.score" }, "moyenne": { "$avg": "$scores.score" } } },
    #      { "$match": {'moyenne': {"$gt": 70} }},
    #      { "$count" : "nombre_etudiants"}
    # ]
    # aggCursor = list(collection.aggregate(pipeline))
    # print(f"Il y a {aggCursor[0]["nombre_etudiants"]} étudiants qui ont plus de 70 de mmoyenne générale")

# # Ajoutez un champ moyenne à tous les documents contenant la moyenne des 3 notes

#     collection.update_many({}, [{"$set" : {"moyenne": {"$avg": "$scores.score"} }}])

# # Ajoutez un champ niveau selon la moyenne : "Excellent" (≥80), "Bien" (≥60), "Passable" (≥40), "Insuffisant" (<40)

#     collection.update_many({}, [{
#         "$set": {
#             "niveau": {
#                 "$switch": {
#                     "branches": [
#                     { "case": { "$gt": [ "$moyenne", 80 ] }, "then": "Excellent" },
#                     { "case": { "$gt": [ "$moyenne", 60 ] }, "then": "Bien" },
#                     { "case": { "$gt": [ "$moyenne", 40 ] }, "then": "Passable" },
#                     ],
#                     "default": "Insuffisant"
#                 }
#             }
#         }
#     }])

# #Mettez à jour le nom de l'étudiant avec _id = 113 (qui est vide) en "Nom Inconnu"

#     collection.update_one(

#         {"_id": 113},

#         {"$set": {"name": "Nom Inconnu"}}

#     )


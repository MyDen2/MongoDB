# from pymongo import MongoClient
import hashlib as hl


# if __name__ == "__main__":

      
#     print("=== Configuration ===")
#     uri = "mongodb://admin:password@localhost:27017/?authSource=admin"
#     client = MongoClient(uri)

#     db = client["silver_db"]

#     customers_collection = db["customers"]
#     campaigns_collection = db["campaigns"]
#     transactions_collection = db["transactions"]

use("customers")

db.customers_collection.aggregate([
  # 1) Ici tu mets ton nettoyage
  # Exemple: retirer des champs, convertir des types, etc.
  {
    "$project": {
      "_id": 1,
      "name": { "$trim": { input: "$name" } },
      "email": { hl.md5("$email") },
      "phone": { hl.md5("$phone") },
      "createdAt": {
        "$cond": [
          { "$eq": [{ "$type": "$createdAt" }, "string"] },
          { "$dateFromString": { "dateString": "$createdAt" } },
          "$createdAt"
        ]
      }
    }
  },

  # 2) Ecrire dans la DB silver_db (collection "ma_collection")
  {
    "$merge": {
      "into": { db: "silver_db", "coll": "ma_collection" },
      "on": "_id",
      "whenMatched": "replace",
      "whenNotMatched": "insert"
    }
  }
])

from pymongo import MongoClient, UpdateOne
import hashlib as hl


if __name__ == "__main__":

      
    print("=== Configuration ===")
    uri = "mongodb://admin:password@localhost:27017/?authSource=admin"
    client = MongoClient(uri)

    db = client["bronze_db"]
    silver_db = client["silver_db"]

    customers_collection = db["customers"]
    campaigns_collection = db["campaigns"]
    transactions_collection = db["transactions"]

    def md5_or_unknown(value: object) -> str:
        if value is None:
            return "Unknown"
        
        s = str(value).strip()
        if s == "":
            return "Unknown"
        return hl.md5(s.encode("utf-8")).hexdigest()    

    customers_pipeline = [
            {
                "$set": {
                    "first_name": {"$ifNull": ["$first_name", "Unknown"]},
                    "last_name": {"$ifNull": ["$last_name", "Unknown"]},
                    "age": {"$ifNull": ["$age", "Unknown"]},
                    "country": {"$ifNull": ["$country", "Unknown"]},
                    "city": {"$ifNull": ["$city", "Unknown"]},
                    "gender": {"$ifNull": ["$gender", "Unknown"]},
                    "marketing_consent": {"$ifNull": ["$marketing_consent", "Unknown"]},
                    "email": {"$ifNull": ["$email", None]},
                    "phone": {"$ifNull": ["$phone", None]}
                }
            },
            {
                "$set": {
                    "full_name": {
                        "$trim": {
                            "input": {
                                "$concat": [
                                    {"$toString": "$first_name"},
                                    " ",
                                    {"$toString": "$last_name"}
                                ]
                            }
                        }
                    }
                }
            }
        ]

    cursor = customers_collection.aggregate(customers_pipeline, allowDiskUse=True)
    ops = []
    total = 0
    for doc in cursor:
            # anonymisation
            doc["email"] = md5_or_unknown(doc.get("email"))
            doc["phone"] = md5_or_unknown(doc.get("phone"))

            # upsert sur customer_id (id fonctionnel)
            cid = doc.get("customer_id")
            ops.append(UpdateOne({"customer_id": cid}, {"$set": doc}, upsert=True))

            total += 1

    if ops:
      silver_db["customers"].bulk_write(ops, ordered=False)

    print(f"✅ {total} documents enrichis + anonymisés -> silver_db.customers")

# Pour les transactions : 

    transactions_pipeline = [
            {
                "$set": {
                    "customer_id": {"$ifNull": ["$customer_id", "Unknown"]},
                    "product": {"$ifNull": ["$product", "Unknown"]},
                    "amount": {"$ifNull": ["$amount", 0]},
                    "quantity": {"$ifNull": ["$quantity", 1]},
                    "payment_method": {"$ifNull": ["$payment_method", "Unknown"]},
                    "discount_applied": {"$ifNull": ["$discount_applied", 0]},
                    "shipping_cost": {"$ifNull": ["$shipping_cost", 0]}                }
            },
            {
                "$set": {
                    "total_amount": {
                        "$add": [
                          {"$subtract": ["$amount", "$discount_applied"]},
                          "$shipping_cost"
                        ]
                    }
                }
            },
            {   "$merge": { 
                    "into": {"db": "silver_db", "coll": "transactions"}, 
                    "on": "_id",
                    "whenMatched": "replace", 
                    "whenNotMatched": "insert" 
                } 
            }
        ]

    transactions_collection.aggregate(transactions_pipeline, allowDiskUse=True)


    client.close()

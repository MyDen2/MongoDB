use("info")

db

db.produits.insertOne({
    nom : "MacBook Pro",
    fabriquant: "Apple",
    prix: 11435.99,
    options: ["Intel Core i5", "Retina Display", "Long Life Battery"]
})

db.produits.insertOne({
    nom : "MacBook Air",
    fabriquant: "Apple",
    prix: 125794.73,
    ultrabook: true,
    options: ["Intel Core i7", "SSD", "Long Life Battery"]
})

db.produits.insertOne({
    nom : "ThinkPad X230",
    fabriquant: "Lenovo",
    prix: 114358.74,
    ultrabook: true,
    options: ["Intel Core i5", "SSD", "Long Life Battery"]
})

// Récupérer tous les produits.

db.produits.find()

// Récupérer le premier produit

db.produits.findOne()

// Trouver l’id du Thinkpad et faites la requête pour récupérer ce produit avec son id.

db.produits.find({nom : "ThinkPad X230"}, {_id :1}) 

db.produits.find({_id : ObjectId("694036e0d0d6b979ffdfb47d")})

//  Récupérer les produits dont le prix est supérieur à 13723 DA

db.produits.find({prix : {$gt : 13723}})

// Récupérer le premier produit ayant le champ ultrabook à true

db.produits.findOne({ultrabook : true})

//  Récupérer le premier produit dont le nom contient Macbook

db.produits.findOne({nom : {$regex : "MacBook"}})

// Récupérer les produits dont le nom commence par Macbook

db.produits.find({nom : {$regex : "MacBook"}})

// Supprimer les deux produits dont le fabricant est Apple.

db.produits.remove({fabriquant : "Apple"})

db.produits.find()

//  Supprimer le Lenovo X230 en utilisant uniquement son id

db.produits.remove({_id : ObjectId("694036e0d0d6b979ffdfb47d")})

db.produits.find()
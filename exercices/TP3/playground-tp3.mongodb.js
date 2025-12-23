use("bibliotheque")

// Liste de tous les livres (type "Book")
db.books.find({type : "Book"})

// Liste des publications depuis 2011

db.books.find({type : "Article", year : {$gt: 2011}})

// Liste des livres depuis 2014

db.books.find({type : "Book", year : {$gt: 2014}})

// Liste des publications de l'auteur "Toru Ishida"

db.books.find(
    { authors: { "$in" : ["Toru Ishida"]} } 
)

// Liste de tous les éditeurs (type "publisher"), distincts
// db.books.find({ publisher: { $exists: true } }
// )

// Liste de tous les auteurs distincts

db.books.distinct("authors")

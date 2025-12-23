use("livre")

// db.books.find()

// db.books.find().limit(5)


//db.books.find({'authors' : {$size:2}}) //tous les livres qui ont deux auteurs
db.books.countDocuments({'authors' : {$size:2}}) 
// db.books.find()
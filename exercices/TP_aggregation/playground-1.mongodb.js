use("bibliotheque")

// Trier les publications de "Toru Ishida" par titre de livre et par page de début

db.books.aggregate([{$match: {authors: { $in : ["Toru Ishida"]}}}, {$sort: {title: -1, "pages.start" : -1}}])

// Compter le nombre de ses publications

db.books.aggregate([{$match: {authors: { $in : ["Toru Ishida"]}} }, {$count: 'comptage'}]) //22

// Compter le nombre de publications depuis 2011 et par type


db.books.aggregate([
  { $match: { year: { $gt: 2011 } } },
  {
    $group: {
      _id: "$type",
      count: { $sum: 1 }
    }
  }
])

// Compter le nombre de publications par auteur et trier le résulat par ordre croissant. 
db.books.aggregate([
  { $unwind: "$authors" },
  {
    $group: {
      _id: "$authors",
      totalPublications: { $sum: 1 }
    }
  },
  {
    $sort: {
      totalPublications: -1
    }
  }
])

// demo !:: 

//db.restaurant.find().limit(5)

//db.restaurant.find({outcode: "W6"})

//db.restaurant.find({postcode: {$not: {$eq: "8NX"}}})

//db.restaurant.aggregate([{$match: {rating: 5} }])

//db.restaurant.aggregate([{$match: {rating: 5} }, {$count: 'comptage'}])

//db.restaurant.aggregate([{$match: {rating: 5} }, {$project: {

//  URL: 1,

 // name: 1

//}}])

//db.restaurant.aggregate([{$group: {_id: "$type_of_food", count: {$sum: 1}}}])

// db.restaurant.aggregate([{$group: {_id: "$type_of_food", count: {$sum: 1}}}, {$match: {

//   count: {$gt:10}

// }}])

// db.restaurant.aggregate([{$group: {_id: "$type_of_food", count: {$sum: 1}}}, 

//     {$match: {count: {$gt:10}}}, 

//     {$sort: {count: -1}}]);

//db.restaurant.aggregate([{$group: {_id: "$postcode", nombre_de_restaurant: {$sum: 1}}}]);

//db.restaurant.aggregate([{$match: {type_of_food: "Thai", rating: {$gt: 4}}}]);

//db.restaurant.aggregate([{$match : {rating : 6}}, {$project : {_id : 0, name : 1, type_of_food : 1, rating : 1}}, {$limit : 3}])

//db.restaurant.aggregate([{$match : {type_of_food : "Caribbean"}}, {$count : "no_of_restaurants_with_caribbean_food"}])

//db.restaurant.aggregate([{$group: {_id: "$type_of_food", note_moyenne: {$avg: "$rating"}}}, {$sort: {note_moyenne: -1}}]);

db.restaurant.aggregate([{$match : {rating : {$ne : "Not yet rated"}}}, {$group : {_id : "$type_of_food", 

    total_rating : {$sum : "$rating"} , 

    avg_rating : {$avg : "$rating"}, 

    max_rating : {$max : "$rating"},

    min_rating : {$min : "$rating"}}}

])




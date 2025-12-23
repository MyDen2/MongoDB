use("restauration")
db
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

// db.restaurant.aggregate([{$match : {rating : {$ne : "Not yet rated"}}}, {$group : {_id : "$type_of_food", 
//     total_rating : {$sum : "$rating"} , 
//     avg_rating : {$avg : "$rating"}, 
//     max_rating : {$max : "$rating"},
//     min_rating : {$min : "$rating"}}}
// ])

// Afficher la liste des restaurants mais limitez l’affichage à 10.

// db.restaurant.find().limit(10)

// Afficher la liste des 10 premiers restaurants mais en trier cette liste par ordre
// alphabétique.

//db.restaurant.aggregate([{$sort : {name : 1}}, {$limit : 10}])

// Afficher la liste des 10 premiers restaurants mais en tri, mais uniquement ceux sur
// Bristol , er cette liste par ordre alphabétique.

db.restaurant.aggregate([{$match : {"address line 2": "Bristol"}}, {$sort : {name : 1}}, {$limit : 10}])

// Afficher la liste des 10 premiers restaurants mais on affiche que le nom du restaurant
// et son quartier.

db.restaurant.aggregate([{$match : {"address line 2": "Bristol"}}, {$sort : {name : 1}}, {$limit : 10}])


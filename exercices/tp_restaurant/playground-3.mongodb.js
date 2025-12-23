use("restauration2")
//db
// Afficher la liste des restaurants mais limitez l’affichage à 10.

db.restaurant.find().limit(10)

// Afficher la liste des 10 premiers restaurants mais en trier cette liste par ordre
// alphabétique.

db.restaurant.aggregate([{$sort : {name : 1}}, {$limit : 10}])

// Afficher la liste des 10 premiers restaurants mais en tri, mais uniquement ceux sur
// “Brooklyn” (champs : borough) , er cette liste par ordre alphabétique.

db.restaurant.aggregate([{$match : {borough: "Brooklyn"}}, {$sort : {name : 1}}, {$limit : 10}])

// Afficher la liste des 10 premiers restaurants mais on affiche que le nom du restaurant
// et son quartier.

db.restaurant.aggregate([
  { $sort: { name: 1 } },
  { $limit: 10 },
  {
    $project: {
      name: 1,
      borough: 1
    }
  }
])

// Afficher la liste des 10 premiers restaurants mais on affiche tout sauf adresse et le
// grade.

db.restaurant.aggregate([
  { $sort: { name: 1 } },
  { $limit: 10 },
  {
    $project: {
      address: 0,
      grades: 0
    }
  }
])

// Afficher la liste des 10 premiers restaurants avec un nouveau champ qui va afficher
// le nombre d’avis (grades) par restaurant.

db.restaurant.aggregate([
  { $sort: { name: -1 } },
  { $limit: 10 },
  {
    $addFields: {
      nbAvis: { $size: "$grades" }
    }
  }
])

//  Afficher la liste des 10 premiers  restaurants avec un nouveau champ qui va afficher
// le nombre d’avis (grades) par restaurant et il faudra faire le tri par le nombre d’avis.

db.restaurant.aggregate([
  { $sort: { nbAvis: 1 } },
  { $limit: 10 },
  {
    $addFields: {
      nbAvis: { $size: "$grades" }
    }
  }
])

// On souhaite toujours afficher la liste des 10 premiers restaurants en affichant le nom
// du restaurant en majuscule et le quartier du restaurant.

db.restaurant.aggregate([
  { $sort: { name: 1 } },      
  { $limit: 10 },               
  {
    $project: {
      _id: 0,
      name: { $toUpper: "$name" },  
      borough: 1                     
    }
  }
])

//  On souhaite toujours afficher la liste des 10 premiers restaurants en affichant le nom
// du restaurant en majuscule et les 3 premières lettres du quartier.

db.restaurant.aggregate([
  { $sort: { name: 1 } },      
  { $limit: 10 },              
  {
    $project: {
      _id: 0,
      name: { $toUpper: "$name" },             
      borough: { $substrCP: ["$borough", 0, 3] } 
    }
  }
])

// On souhaite avoir le nombre total de restaurants toujours avec agrégation.

db.restaurant.aggregate([
  { $count: "totalRestaurants" }
])

// 11. On souhaite avoir le nombre de restaurants par quartier (borough).

db.restaurant.aggregate([
  {
    $group: {
      _id: "$borough",       
      totalRestaurants: { $sum: 1 } 
    }
  },
  { $sort: { totalRestaurants: -1 } } 
])

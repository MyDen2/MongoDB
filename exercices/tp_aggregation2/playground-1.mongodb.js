use("sport")

// Quels sont les sportifs (identifiant, nom et prénom) qui ont un
// âge entre 20 et 30 ans ?

// db.sportif.aggregate([
//   {$match : {Age : {$lt: 30, $gt: 20}}},
//   {
//     $project: {
//       IdSportif: 1,
//       Nom: 1,
//       Prenom: 1
//     }
//   }
// ])


// Quels sont les gymnases de ville “Villetaneuse” ou de
// “Sarcelles” qui ont une surface de plus de 400 m2 ?

// db.gymnase.find()

// db.gymnase.aggregate([
//   {
//     $match: {
//       $or: [
//         { Ville: "VILLETANEUSE" },
//         { Ville: "SARCELLES" }
//       ],
//       Surface: { $gt: 400 }
//     }
//   }
// ])


// Quels sont les sportifs (identifiant et nom) qui pratiquent du
// handball ?

// db.sportif.aggregate([
//   {$match : {"Sports.Jouer" : "Hand Ball"}},
//   {
//     $project: {
//       IdSportif: 1,
//       Nom: 1,
//       Prenom: 1
//     }
//   }
// ])

// 4. Quels sportifs (identifiant et nom) ne pratiquent aucun sport ?

// db.sportif.aggregate([
//   {$match : {"Sports.Jouer" : { $exists: false }}},
//   {
//     $project: {
//       IdSportif: 1,
//       Nom: 1,
//       Prenom: 1
//     }
//   }
// ])

//  Quels gymnases n’ont pas de séances le dimanche ?

// db.gymnase.aggregate([
//   {$match : {Seances : { $not: {$elemMatch: {Jour : {$regex :"imanche$"}}} }}}
// ])

// Quels gymnases ne proposent que des séances de basketball ou de volley ball ?

// db.gymnase.aggregate([
//   {
//     $match: {
//       Seances: {
//         $not: {
//           $elemMatch: {
//             Libelle: { $nin: ["Volley ball", "Basket ball"] }
//           }
//         }
//       }
//     }
//   }
// ])


// Quels sont les entraîneurs qui sont aussi joueurs ?

// db.sportif.aggregate([
//   {$match : {"Sports.Jouer" : { $exists: true },"Sports.Entrainer" : { $exists: false }}},
//   {
//     $project: {
//       IdSportif: 1,
//       Nom: 1,
//       Prenom: 1
//     }
//   }
// ])

// Pour le sportif “Kervadec” quel est le nom de son conseiller ?

// db.sportif.aggregate([
//   {
//     $match: { Nom: "KERVADEC" }
//   },
//   {
//     $lookup: {
//       from: "sportif",
//       localField: "IdSportifConseiller",
//       foreignField: "IdSportif",
//       as: "conseiller"
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       NomSportif: "$Nom",
//       PrenomSportif: "$Prenom",
//       NomConseiller: { $arrayElemAt: ["$conseiller.Nom", 0] },
//       PrenomConseiller: { $arrayElemAt: ["$conseiller.Prenom", 0] }
//     }
//   }
// ]);

// Quelle est la moyenne d’âge des sportives qui pratiquent du
// basket ball ?

// db.sportif.aggregate([
//   {
//     $match: {
//       Sexe: { $in: ["F", "f"] },
//       "Sports.Jouer": "Basket ball"
//     }
//   },
//   {
//     $group: {
//       _id: null, // pour mettre tous dans un seul groupe
//       moyenneAge: { $avg: "$Age" }
//     }
//   }
// ])


// Quels entraîneurs n’entraînent que du hand ball ou du basket ball ?

//  Pour chaque sportif donner le nombre de sports qu’il arbitre

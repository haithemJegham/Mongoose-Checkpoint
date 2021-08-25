//Installing and setting up Mongoose:

const mongoose = require("mongoose");

require("dotenv").config();
const express = require("express");
const app = express();

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => (err ? console.log(err) : console.log("connected to database"))
);

app.listen(process.env.PORT, (err) =>
  err
    ? console.error(err)
    : console.log(`server is running on ${process.env.PORT}`)
);

// Installing and setting up Mongoose:

let personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);
let person = new Person({
  name: "Mohamed Abderrahmen",
  age: 7,
  favoriteFoods: ["candy", "sandwich"],
});

console.log(person);

//Create and Save a Record of a Model

var createAndSavePerson = function (done) {
  let Eline = new Person({
    name: "Eline",
    age: 9,
    favoriteFoods: ["icecream"],
  }); 

  Eline.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });

};

//Create Many Records with model.create()

let arrayOfPeople = [
  {
      name: "haithem",
      age: 39,
      favoriteFoods: ["fried chicken", "Pizza", "chips"]
  },
  { name: "khawla", age: 24, favoriteFoods: ["watermelon", "mango"] },
  { name: "louna", age: 20, favoriteFoods: ["Spaghetty"] }
  ];
  
  var createManyPeople = function(arrayOfPeople, done) {
  
  Person.create(arrayOfPeople, (error, createdPeople) => {
      if(error){
      console.log(error)
      }else{
      done(null, createdPeople)
      }
  });
  };
  //Use model.find() to Search Your Database
var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, (error, arrayOfResults) => {
  if(error){
      console.log(error)
  }else{
      done(null, arrayOfResults)
  }
  })
};

//Use model.findOne() to Return a Single Matching Document from Your Database
var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods : {$all : [food]}}, (error, result) => {
  if(error){
      console.log(error)
  }else{
      done(null, result)
  }
  })
}

//Use model.findById() to Search Your Database By _id
var findPersonById = function(personId, done) {
  Person.findById(personId, (error, result) => {
  if(error){
      console.log(error)
  }else{
      done(null, result)
  }
  })
}

//Perform Classic Updates by Running Find, Edit, then Save
var findEditThenSave = function(personId, done) {
  var foodToAdd = "hamburger";
  
  Person.findById(personId, (error, result) => {
  if(error){
      console.log(error)
  }else{
      result.favoriteFoods.push(foodToAdd)
      result.save((error, updatedResult) => {
      if(error){
          console.log(error)
      }else{
          done(null, updatedResult)
      }
      })
  }
  })
};

//Perform New Updates on a Document Using model.findOneAndUpdate()
var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (error, updatedRecord) => {
  if(error){
      console.log(error)
  }else{
      done(null, updatedRecord)
  }
  })  
};

//Delete One Document Using model.findByIdAndRemove
var removeById = function(personId, done) {
  Person.findByIdAndRemove(personId, (error, deletedRecord) => {
  if(error){
      console.log(error)
  }else{
      done(null, deletedRecord)
  }
  })
};

//MongoDB and Mongoose - Delete Many Documents with model.remove()
var removeManyPeople = function(done) {
  var nameToRemove = "Mariem";
  Person.remove({name: nameToRemove}, (error, JSONStatus)=> {
  if(error){
      console.log(error)
  }else{
      done(null, JSONStatus)
  }
  })
};


//Chain Search Query Helpers to Narrow Search Results
var queryChain = function(done) {
  var foodToSearch = "Spaghetty";
  
  Person.find({favoriteFoods : {$all: [foodToSearch]}})
  .sort({name: 'asc'})
  .limit(2)
  .select('-age')
  .exec((error, filteredResults) => {
  if(error){
      console.log(error)
  }else{
      done(null, filteredResults)
  }
  })
};
  
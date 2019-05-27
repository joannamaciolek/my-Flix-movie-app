//importing required modules
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const express = require('express')
const morgan = require('morgan')
const bodyParser = require("body-parser")
const uuid = require("uuid");

//creating variable to use express functionality
const app = express();
//serves documentation.html file from public folder
app.use(express.static('public'));

//using middleware function for bodyParer
app.use(bodyParser.json());
//logs requests using Morgan’s “common” format
app.use(morgan('common'));

//connecting Mongoose to the database
mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

//Gets the list of ALL movies
app.get('/movies',function(req, res) {
  Movies.find()
  .then(function(movies){
    res.status(201).json(movies)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});

//Gets the data about a single movie by title
app.get('/movies/:Title',function(req, res){
  Movies.findOne({Title : req.params.Title})
  .then(function(movies){
    res.json(movies)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});

//Get the genre of a single movie based on its title
app.get('/movies/genres/:Title',function(req, res) {
  Movies.findOne({Title: req.params.Title})
  .then(function(movie){
    if(movie){
      res.status(201).send("Movie with the title : " + movie.Title + " is  a " + movie.Genre.Name + " ." );
    }else{
      res.status(404).send("Movie with the title : " + req.params.Title + " was not found.");
        }
    })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});

//Gets the data about a director by name
app.get('/movies/directors/:Name', function(req, res) {
  Movies.findOne({"Director.Name" : req.params.Name})
  .then(function(movies){
    res.json(movies.Director)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});

//Creates new user profile
app.post('/users', function(req, res){
Users.findOne({Username: req.body.Username })
  .then(function(user){
    if(user){
      return res.status(400).send(req.body.Username + " already exists.");
    }else{
      Users
      .create ({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user) })
      .catch(function(error){
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error){
      console.error(error);
      res.status(500).send("Error: " + error);
  });
});

//Gets user profile by username
  app.get('/users/:Username', function(req, res) {
    Users.findOne({Username : req.params.Username})
    .then(function(user){
      res.json(user)
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
  });

// Updates user profile
app.put('/users/:Username', function(req, res) {
  Users.findOneAndUpdate({Username: req.params.Username},
  {$set:
    {
      Username: req.body.Username,
      Password:req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  {new: true},//ensures updated user profile is returned
  function(err,updatedUser){
    if (err){
      console.error(err);
      res.status(500).send("Error:" + err);
    }else{
      res.json(updatedUser)
    }
  });
});

// Adds movie to the users list of favourites
app.post('/users/:Username/Favourites/:MovieID',function(req, res){
  Users.findOneAndUpdate({Username: req.params.Username} ,{
    $addToSet  : {Favourites : req.params.MovieID}
  },
  {new: true},
  function(err,updatedUser){
    if (err){
      console.error(err);
      res.status(500).send("Error:" + err);
    }else{
      res.json(updatedUser)
    }
  })
});

// Removes movie from the users list of favourites
  app.delete('/users/:Username/Favourites/:MovieID',function(req, res){
    Users.findOneAndUpdate ({Username: req.params.Username},{
     $pull : {Favourites : req.params.MovieID}
  },
  {new: true},
  function(err,updatedUser){
    if (err){
      console.error(err);
      res.status(500).send("Error:" + err);
    }else{
      res.json(updatedUser)
    }
  });
});

// Deletes user account by username
  app.delete('/users/:Username',function(req, res){
    Users.findOneAndRemove ({Username: req.params.Username })
    .then(function(user) {
      if (!user){
        res.status(400).send("Account with the username: " + req.params.Username + " was not found .");
      }else{
        res.status(200).send("Account with the username : " + req.params.Username + " was successfully deleted.");
      }
    })
    .catch(function(err){
      console.error(err.stack);
      res.status(500).send("Error: " + err);
    });
  });

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);

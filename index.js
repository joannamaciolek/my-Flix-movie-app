//importing express
const express = require('express'),
  //importing morgan
  morgan = require('morgan'),
  //importing bodyParser & uuid
  bodyParser = require("body-parser"),
  uuid = require("uuid");
//creating variable to use express functionality
const app = express();
//using middleware function for bodyParer
app.use(bodyParser.json());
//serves documentation.html file from public folder
app.use(express.static('public'));

//logs requests using Morgan’s “common” format
app.use(morgan('common'));

//list of movies
let topMovies = [ {
  title : 'The Pursuit of Happyness',
  description: 'A struggling salesman takes custody of his son as he\'s poised to begin a life-changing professional career.',
  genre: 'Biography',
  director: {
    name: 'Gabriele Muccino',
    bio: 'Gabriele Muccino is an Italian film director. He has worked his way from making short films only aired on Italian television to become a well-known and successful American filmmaker.',
    birthYear: '1967',
    deathYear: 'n/a',
    movies: ['The Pursuit of Happyness', 'Seven Pounds']
  },
  actors: ['Will Smith' , 'Jaden Smith'],
  releaseYear: '2006',
  imageURL: 'https://www.imdb.com/title/tt0454921/mediaviewer/rm2553318400'
},
{
  title : 'About a Boy',
  description: 'A cynical, immature young man is taught how to act like a grown-up by a little boy.',
  genre: 'Comedy',
  director: {
    name: 'Chris & Paul Weitz',
    bio: 'Christopher Weitz is an American film director, screenwriter, and producer. He is best known for his work with his brother Paul Weitz on the comedy films',
    birthYear: '1969',
    deathYear: 'n/a',
    movies: ['About a Boy', 'The Golden Compass']
  },
  actors: ['Hugh Grant', 'Nicholas Hoult', 'Toni Collette' ],
  releaseYear: '2002',
  imageURL: 'https://www.imdb.com/title/tt0276751/mediaviewer/rm2323043328'
},
{
  title : 'Amélie',
  description: 'Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.',
  genre: 'Comedy',
  director: {
    name: 'Jean-Pierre Jeunet',
    bio: 'Jean-Pierre Jeunet is a French film director, producer, and screenwriter. His films are known to mix elements of fantasy, reality and science fiction either to create idealized realities or to give relevance to mundane situations.',
    birthYear: '1953',
    deathYear: 'n/a',
    movies: ['Amélie', 'A Very Long Engagement']
  },
  actors: ['Audrey Tautou', 'Mathieu Kassovitz' ],
  releaseYear: '2001',
  imageURL: 'https://www.imdb.com/title/tt0211915/mediaviewer/rm1617958656'
},
{
  title : 'A Good Year',
  description: 'A British investment broker inherits his uncle\'s chateau and vineyard in Provence, where he spent much of his childhood. He discovers a new laid-back lifestyle as he tries to renovate the estate to be sold.',
  genre: 'Comedy',
  director: {
    name: 'Ridley Scott',
    bio: 'Ridley Scott is an English film director and producer.Scott\'s work has an atmospheric, highly concentrated visual style.',
    birthYear: '1937',
    deathYear: 'n/a',
    movies: ['A Good Year', 'Thelma & Louise', 'Alien', 'Gladiator']
  },
  actors: ['Russell Crowe', 'Abbie Cornish', 'Albert Finney' ],
  releaseYear: '2006',
  imageURL: 'https://www.imdb.com/title/tt0401445/mediaviewer/rm2831325440'
},
{
  title : 'Thelma & Louise',
  description: 'Two best friends set out on an adventure, but it soon turns around to a terrifying escape from being hunted by the police, as these two girls escape for the crimes they committed.',
  genre: 'Adventure',
  director: {
    name: 'Ridley Scott',
    bio: 'Ridley Scott is an English film director and producer.Scott\'s work has an atmospheric, highly concentrated visual style.',
    birthYear: '1937',
    deathYear: 'n/a',
    movies: ['A Good Year', 'Thelma & Louise', 'Alien', 'Gladiator']
  },
  actors: ['Susan Sarandon', 'Geena Davis' ],
  releaseYear: '1991',
  imageURL: 'https://www.imdb.com/title/tt0103074/mediaviewer/rm133085952'
},
]

let Users = [
  {
    username: 'Jonathan Smith',
    password: 'Movie1',
    email: 'johnsmith@gmail.com',
    birthday: '19.03.1987'
  }
]
//Gets the list of ALL movies
app.get('/movies', function(req, res) {
  res.json(topMovies)
});

//Gets the data about a single movie by title
app.get("/movies/:title", (req, res) => {
  res.json(topMovies.find( (movie) =>
    { return movie.title === req.params.title   }));
});

//Get the list of movies by genre
app.get("/movies/genres/:genre", (req, res) => {
  res.json(topMovies.find( (movie) =>
    { return movie.genre === req.params.genre   }));
});

//Gets the data about a director by name
app.get("/movies/directors/:name", (req, res) => {
  res.send('Successful GET request returning data on director by name');
});

//Creates new user profile
app.post("/users/", (req, res) => {
  let newUser = req.body;
  //check if user profile contains all required information
  if (!newUser.username && !newUser.password && !newUser.email && !newUser.birthday) {
      const message = "Missing user information in request body";
      res.status(400).send(message);
  } else {
      //adds newUser to the database
      Users.push(newUser);
      res.status(201).send(newUser);
    }
  });

//Gets user profile
  app.get("/users/:username", (req, res) => {
    res.send('Successful GET request returning data on user profile');
  });

// Updates user profile
app.put("/users/:username", (req, res) => {
  let user = Users.find((user) => { return user.username === req.params.username });
  res.status(201).send("The user account: " + req.params.username + " has been successfully updated .");
  res.status(404).send("Account with the username: " + req.params.username + " was not found.")
});

// Adds movie to the users list of favourites
app.post("/users/favourites_list/:username/:title", (req, res) => {

  res.status(201).send("The movie: " + req.params.title + " has been successfully added to your list of favourites.");
  res.status(404).send("The movie: " + req.params.title + " was not found.")
  });

// Removes movie from the users list of favourites
  app.delete("/users/favourites_list/:username/:title", (req, res) => {

    res.status(201).send("The movie: " + req.params.title + " has been successfully removed from your list of favourites.");
    res.status(404).send("The movie: " + req.params.title + " was not found.")
    });

// Deletes user account
  app.delete("/users/:username", (req, res) => {
      let user = Users.find((user) => { return user.username === req.params.username });

      if (user) {
        Users.filter(function(obj) { return obj.username !== req.params.username });
        res.status(201).send("Account with the username : " + req.params.username + " was deleted.")
      }
    });

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Ooops! Something went wrong!');
});

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);

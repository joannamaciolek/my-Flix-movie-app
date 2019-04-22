//importing express
const express = require('express');
//importing morgan
const morgan = require('morgan');

//creating variable to use express functionality
const app = express();

//serves documentation.html file from public folder
app.use(express.static('public'));

//logs requests using Morgan’s “common” format
app.use(morgan('common'));

//list of top 10 movies
let topMovies = [ {
  title : 'The Pursuit of Happyness',
  stars: 'Will Smith \, Jaden Smith',
  director : 'Gabriele Muccino',
  released:'2006'
},
{
  title : 'About a Boy',
  stars: ' Hugh Grant\, Nicholas Hoult\, Toni Collette ',
  director : ' Chris & Paul Weitz',
  released:'2002'
},
{
  title : 'A Good Year',
  stars: ' Russell Crowe\, Abbie Cornish\, Albert Finney',
  director : 'Ridley Scott',
  released:'2006'
},
{
  title : 'Under the Tuscan Sun',
  stars: 'Diane Lane\, Raoul Bova\, Sandra Oh',
  director : 'Audrey Wells',
  released:'2003'
},
{
  title : 'Up',
  stars: 'Edward Asner\, Jordan Nagai\, John Ratzenberger ',
  director : 'Pete Docter',
  released:'2009'
},
{
  title : 'Ratatouille',
  stars: 'Brad Garrett\, Lou Romano\, Patton Oswalt',
  director : 'Brad Bird\, Jan Pinkava',
  released:'2007'
},
{
  title : 'Amélie',
  stars: ' Audrey Tautou\, Mathieu Kassovitz',
  director : 'Jean-Pierre Jeunet',
  released:'2001'
},
{
  title : 'Moonrise Kingdom',
  stars: ' Jared Gilman\, Kara Hayward\, Bruce Willis',
  director : 'Wes Anderson',
  released:'2012'
},
{
  title : 'Ace Ventura: Pet Detective',
  stars: ' Jim Carrey\, Courteney Cox\, Sean Young',
  director : 'Tom Shadyac',
  released:'1994'
},
{
  title : 'Desperado',
  stars: ' Antonio Banderas\, Salma Hayek',
  director : 'Robert Rodriguez',
  released:'1995'
}
]
//GET requests
app.get('/movies', function(req, res) {
  res.json(topMovies)
});
app.get('/', function(req, res) {
  res.send('Welcome to my movie app!')
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Ooops! Something went wrong!');
});

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);

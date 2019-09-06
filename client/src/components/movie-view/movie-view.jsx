import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './movie-view.scss'

import { Link } from "react-router-dom";

export function MovieView(props) {

  const {movie,user} = props;
  if (!movie) return null;

  function handleSubmit(event) {
      event.preventDefault();
      axios.put(`https://my-flix-1098.herokuapp.com/users/${user}/Favourites/${movie._id}`, {
        Username: user
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      .then(response => {
        console.log(response);
        alert('Movie has been added to your Favorite List!');
      })
      .catch(event => {
        console.log('error adding movie to list');
        alert('Ooooops... Something went wrong!');
      });
    };

    return (
      <Card className="movie-view" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={movie.ImageUrl} />
        <Card.Body>
          <Card.Title className="movie-title">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <ListGroup className="list-group-flush" variant="flush">
            <ListGroup.Item>Genre: {movie.Genre.Name}</ListGroup.Item>
              <Link className="text-center" to={`/genres/${movie.Genre.Name}`}>
                <Button variant="outline-secondary" size="sm">Learn more</Button>
              </Link>
            <ListGroup.Item>Director: {movie.Director.Name}</ListGroup.Item>
              <Link className="text-center" to={`/directors/${movie.Director.Name}`}>
                <Button variant="outline-secondary" size="sm">Learn more</Button>
              </Link>
          </ListGroup>
          <div className="text-center">
            <Button variant="outline-warning" onClick={event => handleSubmit(event)}> Add to Favourites </Button>
            <Link to={`/`}>
              <Button className="button-back" variant="outline-info">BACK</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }

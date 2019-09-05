import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './movie-view.scss'

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

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
            <Link to={`/`}>
              <Button className="button-back" variant="outline-info">BACK</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

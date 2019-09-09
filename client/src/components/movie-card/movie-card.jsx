import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss'

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card style={{ width: '14rem', height: '41rem' }}>
        <Card.Img variant="top" src={movie.ImageUrl} />
        <Card.Body>
          <Card.Title className="movie-title">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="button-card" variant="info">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

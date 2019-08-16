import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './genre-view.scss'

import { Link } from "react-router-dom";

export function GenreView(props) {

  const { movies, genreName } = props;
  if (!movies || !movies.length) return null;
  const movie = movies.find(m => m.Genre.Name === props.genreName);

    return (
      <Card style={{ width: '16rem', height:'20rem' }}>
        <Card.Body>
          <Card.Title className="genre-info">{movie.Genre.Name}</Card.Title>
          <Card.Text>
          Description: {movie.Genre.Description}
          </Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="button-card" variant="info">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }

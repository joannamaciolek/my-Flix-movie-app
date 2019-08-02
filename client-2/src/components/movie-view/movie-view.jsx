import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './movie-view.scss'

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
            <ListGroup.Item>Director: {movie.Director.Name}</ListGroup.Item>
          </ListGroup>
          <div className="text-center">
          <Button className="button-back" onClick={() => this.props.returnCallback()} variant="outline-info">BACK</Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        Description: PropTypes.string,
        Genre: PropTypes.shape({
            Name: PropTypes.string
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string
        })
    }).isRequired,
    onClick: PropTypes.func.isRequired
}

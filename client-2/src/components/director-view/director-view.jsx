import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './director-view.scss'

import { Link } from "react-router-dom";

export function DirectorView(props) {

  const { movies, directorName } = props;
  if (!movies || !movies.length) return null;
  const director = movies.find(m => m.Director.Name == directorName).Director

    return (
      <Card style={{ width: '16rem', height:'20rem' }}>
        <Card.Body>
          <Card.Title className="director-info">{director.Name}</Card.Title>
          <Card.Text>
          Biography: {director.Bio}
          <br/>
          Birth Year: {director.BirthYear}
          </Card.Text>
          <Link to={`/movies/${movies._id}`}>
            <Button className="button-card" variant="info">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }

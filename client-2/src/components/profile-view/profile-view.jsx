import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './profile-view.scss'

import { Link } from "react-router-dom";

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  deleteMovieFromFavs(event, favoriteMovie) {
    event.preventDefault();
    console.log(favoriteMovie);
    axios.delete(`https://my-flix-1098.herokuapp.com/users${localStorage.getItem('user')}/movies/${favoriteMovie}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      this.getUser(localStorage.getItem('token'));
    })
    .catch(event => {
      alert('Oops... something went wrong...');
    });
  }


  render() {
    const {movie,userInfo,Favourites= []} = this.props;

    return (
      <Card className="profile-view" style={{ width: '24rem' }}>
        <Card.Img variant="top" src="images/user_icon.svg" />
        <Card.Body>
          <Card.Title className="profile-title">My Profile</Card.Title>
          <ListGroup className="list-group-flush" variant="flush">
            <ListGroup.Item>Username: {userInfo.Username}</ListGroup.Item>
            <ListGroup.Item>Password:******* </ListGroup.Item>
            <ListGroup.Item>Email: {userInfo.Email}</ListGroup.Item>
            <ListGroup.Item>Birthday: {userInfo.Birthday && userInfo.Birthday.slice(0, 10)}</ListGroup.Item>
            <ListGroup.Item>Favourite Movies:
              {Favourites.length === 0 &&
                <p>No Favourite Movies have been added</p>}
              {Favourites.length > 0 &&
                Favourites.map(favoriteMovie =>
                (<ListGroup.Item>{movie.Title}
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant='info' size='sm'>
                      View
                    </Button>
                  </Link>
                  <Button variant='danger' size='sm' onClick={() => this.deleteMovieFromFavs(movie._id)}>
                    Remove
                  </Button>
                  </ListGroup.Item>
                ))}
            </ListGroup.Item>
          </ListGroup>
          <div className="text-center">
            <Link to={`/`}>
              <Button className="button-back" variant="outline-info">BACK</Button>
            </Link>
            <Link to={`/update/:Username`}>
              <Button className="button-update" variant="outline-secondary">Update profile</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
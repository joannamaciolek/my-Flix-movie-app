import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss'

  export class MainView extends React.Component {

    constructor() {
      super();

      this.state = {
        movies: null,
        selectedMovie: null,
        user: null,
        newUser:null
      };
    }
    // One of the "hooks" available in a React Component
    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
      this.getMovies(accessToken);
      }
    }

    onMovieClick(movie) {
      this.setState({
        selectedMovie: movie
      });
    }

    getMovies(token) {
      axios.get('https://my-flix-1098.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
    // Assign the result to the state
      this.setState({
        movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    onLoggedIn(authData) {
      console.log(authData);
      this.setState({
        user: authData.user.Username
      });
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);
    }

  RegisterUser() {
        this.setState({
            newUser:null
        });
    }

    ResetMainView() {
    this.setState({
        selectedMovie: null
      });
    }

    render() {
      const { movies, selectedMovie, user, newUser } = this.state;

      if (newUser) return <RegistrationView RegisterUser={newUser => this.RegisterUser()}/>;
      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

      // Before the movies have been loaded
      if (!movies) return <div className="main-view"/>;

      return (
       <Container className="main-view" fluid="true">
         <Row>
            {selectedMovie
               ?<Col> <MovieView returnCallback={() => this.ResetMainView()} movie={selectedMovie}/> </Col>
               : movies.map(movie => (
                <Col> <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/> </Col>
               ))
            }
         </Row>
       </Container>
      );
    }
  }

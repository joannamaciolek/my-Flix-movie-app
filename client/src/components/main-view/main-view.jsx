import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link} from "react-router-dom";


import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-view/profile-update';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './main-view.scss'

  export class MainView extends React.Component {

    constructor() {
      super();

      this.state = {
        movies: [],
        user: null,
        email: '',
        birthday: '',
        token: '',
        userInfo: {}
      };
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

    getUser(user, token) {
    axios
      .get('https://my-flix-1098.herokuapp.com/users/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          email: response.data.Email,
          birthday: response.data.Birthday,
          token: token,
          userInfo: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    }

    updateUser(data) {
    this.setState({
      userInfo: data
    });
    localStorage.setItem('user', data.Username);
  }

    // One of the "hooks" available in a React Component
    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
      this.getMovies(accessToken);
      this.getUser(localStorage.getItem("user"), accessToken);
      }
    }

    onMovieClick(movie) {
      window.location.hash = '#' + movie._id;
      this.setState({
        selectedMovieId: movie._id
      });
    }

    onLoggedIn(authData) {
      this.setState({
        user: authData.user.Username
      });
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);
      this.setState({
        userInfo: authData.user
      });
    }

    onLogout() {
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     localStorage.removeItem('movies');
     this.setState({
       user: null
     })
     window.open('/', '_self');
    }

    render() {
      const { movies, user, userInfo, token } = this.state;

      // Before the movies have been loaded
      if (!movies) return <div className="main-view"/>;

      return (
        <Router>
         <Container className="main-view" fluid="true">
           <div className="btn-group">
           <Link to={`/users/${user}`}>
             <Button className="profile-view" variant="info">
               Profile
             </Button>
           </Link>
             <Button className="logout" variant="info" onClick={() => this.onLogout()} >
               Log out
             </Button>
             </div>
           <Row>
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
              return movies.map(m => <MovieCard key={m._id} movie={m} userInfo={userInfo}/>)
              }
            }/>
            <Route path="/register" render={() => <RegistrationView />} />
            <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
            <Route path="/directors/:name" render={({ match }) => {
              if (!movies || !movies.length) return <div className="main-view"/>;
              return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
            } />
            <Route path="/genres/:name" render={({ match }) => {
              if (!movies || !movies.length) return <div className="main-view"/>;
              return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>}
            } />
            <Route path="/users/:Username" render={({ match }) => {return <ProfileView userInfo={userInfo} />}}/>
            <Route path="/update/:Username" render={() => <ProfileUpdate userInfo={userInfo} user={user} token={token} updateUser={data => this.updateUser(data)} />}
            />
           </Row>
         </Container>
        </Router>
      );
    }
  }

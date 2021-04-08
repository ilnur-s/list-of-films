import './styles/style.scss';
import './styles/reset.scss';

import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import MoviesList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';
import Header from './components/Header';
import { getMoviesData, getGenres } from './helpers/requests';
import { throttle } from './helpers/utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      genres: [],
      page: 1,
      isFavorites: false,
    };
  }

  async componentDidMount() {
    const { page } = this.state;
    const moviesState = await getMoviesData(page);
    const genresState = await getGenres();
    this.setState({ films: moviesState.results, genres: genresState.genres });
    window.addEventListener('scroll', throttle(this.handleDownloadList, 1000));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.handleDownloadList, 1000));
  }

  handleDownloadList = () => this.downloadList();

  downloadList = async () => {
    const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    const { films, page } = this.state;
    if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
      const nextPage = page + 1;
      const currentState = films;
      const newList = await getMoviesData(nextPage);
      currentState.push(...newList.results);
      this.setState({
        films: currentState,
        page: nextPage,
      });
    }
  };

  filteringMovies = (films) => films.filter((film) => (film.isFavorite));

  addOrDeleteToFavourites = (movie) => {
    const { films } = this.state;
    const index = films.indexOf(movie);
    const selectedMovieItem = films[index];
    if (selectedMovieItem.isFavorite) {
      selectedMovieItem.isFavorite = false;
    } else {
      selectedMovieItem.isFavorite = true;
    }
    const newState = films.map((film, i) => (i === index ? selectedMovieItem : film));
    this.setState({ films: newState });
  }

  openOrCloseFavorites = () => {
    const { isFavorites } = this.state;
    this.setState({ isFavorites: !isFavorites });
  }

  render() {
    const {
      films, genres, isFavorites,
    } = this.state;
    console.log(genres);
    return (
      <>
        <Router>
          <Header openOrCloseFavorites={this.openOrCloseFavorites} isFavorites={isFavorites} />
          <Switch>
            <Route exact path="/">
              <main className="films-list">
                <div className="wrapper">
                  <MoviesList
                    movies={isFavorites ? this.filteringMovies(films) : films}
                    addOrDeleteToFavourites={this.addOrDeleteToFavourites}
                  />
                </div>
              </main>
            </Route>
            <Route path="/movie/:id">
              <MovieDetails />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;

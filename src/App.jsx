import './styles/style.scss';

import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import MoviesList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';
import Header from './components/Header';
import FilterForm from './components/FilterForm';
import SortingForm from './components/SortingForm';
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
      favoritesFilms: [],
      sorting: 'popularity',
      filtering: '',
    };
  }

  async componentDidMount() {
    const { page, sorting, filtering } = this.state;
    const moviesState = await getMoviesData(page, sorting, filtering);
    const genresState = await getGenres();
    this.setState({ films: moviesState, genres: genresState });
    window.addEventListener('scroll', throttle(this.handleDownloadList, 1000));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.handleDownloadList, 1000));
  }

  handleDownloadList = () => this.downloadList();

  downloadList = async () => {
    const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    const {
      films, page, sorting, filtering,
    } = this.state;
    if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
      const nextPage = page + 1;
      const currentState = films;
      const newList = await getMoviesData(nextPage, sorting, filtering);
      currentState.push(...newList);
      this.setState({ films: currentState, page: nextPage });
    }
  };

  filteringMovies = (films) => films.filter((film) => (film.isFavorite));

  addOrDeleteToFavourites = (movie) => {
    const { films } = this.state;
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const favoritesId = favorites.map((favorite) => favorite.id);
    const selectedMovieItem = movie;
    if (selectedMovieItem.isFavorite) {
      selectedMovieItem.isFavorite = false;
      const selectedMovieIndex = favoritesId.indexOf(selectedMovieItem.id);
      favorites.splice(selectedMovieIndex, 1);
      this.setState({ favoritesFilms: favorites });
    } else {
      selectedMovieItem.isFavorite = true;
      favorites.push(selectedMovieItem);
      this.setState({ favoritesFilms: favorites });
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    const newState = films.map((film) => (film.id === selectedMovieItem.id
      ? { ...film, isFavorite: selectedMovieItem.isFavorite }
      : film));
    this.setState({ films: newState });
  }

  openOrCloseFavorites = () => {
    const { isFavorites } = this.state;
    this.setState({
      isFavorites: !isFavorites,
      favoritesFilms: JSON.parse(localStorage.getItem('favorites')),
    });
  }

  sortBy = async (e) => {
    const { filtering } = this.state;
    this.setState({ sorting: e.target.value, page: 1 });
    const newList = await getMoviesData(1, e.target.value, filtering);
    this.setState({ films: newList });
  }

  filterByGenre = async (e) => {
    const { sorting, filtering, genres } = this.state;
    const currentInputId = e.target.id;
    const newGenres = genres;
    newGenres[currentInputId].checked = !newGenres[currentInputId].checked;
    const currentInputValue = e.target.value;
    const newFilter = filtering.split(',');
    const index = newFilter.indexOf(currentInputValue);
    if (index === -1) {
      newFilter.push(currentInputValue);
    } else {
      newFilter.splice(index, 1);
    }
    this.setState({ filtering: newFilter.join(), page: 1 });
    const newList = await getMoviesData(1, sorting, newFilter.join());
    this.setState({ films: newList, genres: newGenres });
  };

  render() {
    const {
      films, genres, isFavorites, sorting, favoritesFilms,
    } = this.state;
    return (
      <>
        <Router>
          <Header openOrCloseFavorites={this.openOrCloseFavorites} isFavorites={isFavorites} />
          <Switch>
            <Route exact path="/">
              <div className="wrapper">
                { !isFavorites && (
                  <>
                    <FilterForm genres={genres} filterByGenre={this.filterByGenre} />
                    <SortingForm sorting={sorting} sortBy={this.sortBy} />
                  </>
                )}
                <main className={isFavorites ? 'films-favorites' : 'films-list'}>
                  <MoviesList
                    movies={isFavorites ? favoritesFilms : films}
                    addOrDeleteToFavourites={this.addOrDeleteToFavourites}
                  />
                </main>
              </div>
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

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
      sorting: 'popularity',
      filtering: '',
    };
  }

  async componentDidMount() {
    const { page, sorting, filtering } = this.state;
    const moviesState = await getMoviesData(page, sorting, filtering);
    const genresState = await getGenres();
    this.setState({ films: moviesState.results, genres: genresState });
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

  sortBy = async (e) => {
    const { filtering } = this.state;
    this.setState({ sorting: e.target.value, page: 1 });
    const newList = await getMoviesData(1, e.target.value, filtering);
    this.setState({ films: newList.results });
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
    this.setState({ films: newList.results, genres: newGenres });
  };

  render() {
    const {
      films, genres, isFavorites, sorting,
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
                <main className="films-list">
                  <MoviesList
                    movies={isFavorites ? this.filteringMovies(films) : films}
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

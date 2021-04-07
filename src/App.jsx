import './styles/style.scss';
import './styles/reset.scss';

import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import MoviesList from './components/MoviesList';
import MovieInfo from './components/MovieInfo';
import Header from './components/Header';
import { getMovies, getGenres } from './helpers/requests';
import { throttle } from './helpers/utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      genres: [],
      page: 1,
    };
  }

  async componentDidMount() {
    const { page } = this.state;
    const moviesState = await getMovies(page);
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
      const newList = await getMovies(nextPage);
      currentState.push(...newList.results);
      this.setState({
        films: currentState,
        page: nextPage,
      });
    }
  };

  render() {
    const { films, genres } = this.state;
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              <Header />
              <div id="film-list" className="films-list">
                {films.map((item, index) => (
                  <MoviesList
                    itemNumber={index + 1}
                    id={item.id}
                    key={item.id}
                    title={item.title}
                    description={item.overview}
                    imagePath={item.poster_path}
                  />
                ))}
              </div>
            </Route>
            <Route path="/movie/:id">
              <MovieInfo films={films} genres={genres} />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;

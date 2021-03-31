import './styles/reset.scss';
import './styles/style.scss';

import React from 'react';
import ListItem from './components/ListItem';
import request from './helpers/request';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
    };
  }

  async componentDidMount() {
    const newState = await request();
    this.setState({ films: newState.results });
  }

  render() {
    const { films } = this.state;
    return (
      <div className="films-list">
        {films.map((item, index) => (
          <ListItem
            id={index + 1}
            key={item.id}
            title={item.title}
            description={item.overview}
            imagePath={item.poster_path}
          />
        ))}
      </div>
    );
  }
}

export default App;

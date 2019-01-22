// TODO: Remove after passing results to <Results /> component
/* eslint-disable react/no-unused-state */

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';

import Title from './title/title';
import Tagline from './tagline/tagline';
import Search from './search/search';

class App extends Component {
  constructor() {
    super();
    this.state = { results: undefined };
  }

  async getBooks(term) {
    term.trim().toLowerCase().replace(' ', '+');
    const response = await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${term}`);
    const books = response.data.items;
    this.setState({ results: books });
  }

  render() {
    const getBooks = debounce((term) => {
      this.getBooks(term);
    }, 500);

    return (
      <Fragment>
        <Title />
        <Tagline />
        <Search onChange={getBooks} />
      </Fragment>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root') || document.createElement('div'));

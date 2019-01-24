import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import Title from './title/title';
import Tagline from './tagline/tagline';
import Search from './search/search';
import Results from './results/results';

const Error = styled.div`
  font-size: 1.5em;
  text-align: center;
  padding: 5em 0;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  componentDidMount() {
    this.getBooks('cats');
  }

  async getBooks(term) {
    term.trim().toLowerCase().replace(' ', '+');
    const response = await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${term}`);
    const books = response.data.items;
    this.setState({ results: books });
  }

  render() {
    const { results } = this.state;

    const getBooks = debounce((term) => {
      this.getBooks(term);
    }, 500);

    if (!results) {
      return (
        <Fragment>
          <Title />
          <Tagline />
          <Search onChange={getBooks} />
          <Error>
            Sorry, nothing was found! &thinsp;
            <span role="img" aria-label="sad face emoji">
              😢
            </span>
          </Error>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Title />
        <Tagline />
        <Search onChange={getBooks} />
        <Results results={results} />
      </Fragment>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root') || document.createElement('div'));

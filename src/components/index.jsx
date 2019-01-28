import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import Title from './title/title';
import Tagline from './tagline/tagline';
import Search from './search/search';
import Results from './results/results';
import NotFound from './notFound/notFound';

const Error = styled.div`
  font-size: 1.5em;
  text-align: center;
  padding: 5em 0;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [], valid: true };
  }

  componentDidMount() {
    this.getBooks('cats');
  }

  async getBooks(term) {
    const regex = new RegExp(/^\s*$|[#%&]+/);
    if ((regex.test(term) === false) && (term.length > 0)) {
      const response = await axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${term}`);
      const books = response.data.items;
      this.setState({ results: books, valid: true });
    } else {
      this.setState({ valid: false });
    }
  }

  render() {
    const { results, valid } = this.state;

    const getBooks = debounce((term) => {
      this.getBooks(term);
    }, 300);

    if (!results) {
      return (
        <Fragment>
          <Title />
          <Tagline />
          <Search valid={valid} onChange={getBooks} />
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
        <Search valid={valid} onChange={getBooks} />
        <Results results={results} />
      </Fragment>
    );
  }
}

export default App;

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root') || document.createElement('div')
);

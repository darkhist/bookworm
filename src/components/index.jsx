import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import debounce from 'lodash.debounce';

import Header from './header/header';
import Search from './search/search';
import Results from './results/results';
import Err from './err/err';
import NotFound from './notFound/notFound';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box
  }

  body {
  background: #F7F7F7;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [], valid: true, error: false };
  }

  componentDidMount() {
    this.getBooks('cats');
  }

  async getBooks(term) {
    const regex = new RegExp(/^\s*$|[#%&]+/);
    if ((regex.test(term) === false) && (term.length > 0)) {
      try {
        const response = await axios
          .get(`https://www.googleapis.com/books/v1/volumes?q=${term}`);
        const books = response.data.items;
        this.setState({ results: books, valid: true });
      } catch (error) {
        this.setState({ error: true });
      }
    } else {
      this.setState({ valid: false });
    }
  }

  renderResults() {
    const { results, error } = this.state;
    if (error) return <Err msg="Oops. We couldn't reach the Google Books API" />;
    return results ? <Results results={results} /> : <Err msg="Sorry, no results!" />;
  }

  render() {
    const { valid } = this.state;

    const getBooks = debounce((term) => {
      this.getBooks(term);
    }, 300);

    return (
      <Fragment>
        <GlobalStyle />
        <Header />
        <Search valid={valid} onChange={getBooks} />
        {this.renderResults()}
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

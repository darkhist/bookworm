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
    this.state = { results: [], valid: true, error: {} };
  }

  componentDidMount() {
    this.getBooks('cats');
  }

  async getBooks(term) {
    const regex = new RegExp(/^\s*$|[#%&]+/);
    if ((regex.test(term) === false) && (term.length > 0)) {
      try {
        const fields = 'items/etag, items/volumeInfo/authors, items/volumeInfo/publisher, items/volumeInfo/imageLinks/smallThumbnail, items/volumeInfo/infoLink';
        const url = `https://www.googleapis.com/books/v1/volumes?q=${term}&fields=${fields}`;
        const response = await axios.get(url);
        const books = response.data.items;
        this.setState({ results: books, valid: true });
      } catch (e) {
        const { error } = this.state;
        error.status = e.response.status;
        this.setState({ error });
      }
    } else {
      this.setState({ valid: false });
    }
  }

  renderResults() {
    const { results, error } = this.state;
    if (error.status === 403) return <Err msg="Oops. Rate limit exceeded" />;
    if (error.status === 404) return <Err msg="Oops. We couldn't reach the Google Books API" />;
    if (error.status === 500) return <Err msg="Oops. Server error" />;
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

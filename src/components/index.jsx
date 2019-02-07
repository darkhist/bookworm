import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
    this.state = {
      results: [],
      index: 0,
      searchTerm: '',
      valid: true,
      error: {}
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.getBooks('cats', 0);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async getBooks(term, index) {
    const regex = new RegExp(/^\s*$|[#%&]+/);
    if ((regex.test(term) === false) && (term.length > 0)) {
      try {
        const { results, error } = this.state;
        const fields = 'items/etag, items/volumeInfo/title, items/volumeInfo/authors, items/volumeInfo/publisher, items/volumeInfo/imageLinks/smallThumbnail, items/volumeInfo/infoLink';
        const url = `https://www.googleapis.com/books/v1/volumes?q=${term}&fields=${fields}&startIndex=${index}`;
        const response = await axios.get(url);
        const books = response.data.items || [];
        if (books.length > 0) {
          this.setState({
            results: [...results, ...books],
            searchTerm: term,
            valid: true,
            error: {}
          });
        } else {
          error.status = 404;
          this.setState({ error });
        }
      } catch (e) {
        const { error } = this.state;
        error.status = e.response.status;
        this.setState({ error });
      }
    } else {
      this.setState({ valid: false });
    }
  }

  getMoreResults() {
    const { results } = this.state;
    const newStartIndex = results.length + 1;
    this.setState({ index: newStartIndex }, async () => {
      const { searchTerm, index } = this.state;
      await this.getBooks(searchTerm, index);
    });
  }

  handleScroll() {
    const scrollOffset = window.innerHeight + document.documentElement.scrollTop;
    const viewportHeight = document.documentElement.offsetHeight;
    const getMoreResults = debounce(() => {
      this.getMoreResults();
    }, 300);
    if (scrollOffset === viewportHeight) {
      getMoreResults();
      window.scrollTo({
        top: viewportHeight - 500,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  renderResults() {
    const { results, error } = this.state;
    if (error.status === 403) return <Err msg="Oops. Rate limit exceeded" />;
    if (error.status === 404) return <Err msg="Sorry, no results" />;
    if (error.status === 500) return <Err msg="Oops. Server error" />;
    return results ? <Results results={results} /> : <Err msg="Sorry, no results!" />;
  }

  render() {
    const { searchTerm, valid } = this.state;
    const getBooks = debounce((currentSearch) => {
      if (searchTerm !== currentSearch) {
        this.setState({ results: [] }, async () => {
          await this.getBooks(currentSearch, 0);
        });
      }
    }, 750);

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

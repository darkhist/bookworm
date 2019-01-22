import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Title from './title/title';
import Tagline from './tagline/tagline';
import Search from './search/search';

const App = () => (
  <Fragment>
    <Title />
    <Tagline />
    <Search />
  </Fragment>
);

export default App;

ReactDOM.render(<App />, document.getElementById('root') || document.createElement('div'));

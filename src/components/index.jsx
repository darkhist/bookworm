import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Title from './title/title';
import Tagline from './tagline/tagline';

const App = () => (
  <Fragment>
    <Title />
    <Tagline />
  </Fragment>
);

export default App;

ReactDOM.render(<App />, document.getElementById('root') || document.createElement('div'));

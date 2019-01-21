import React from 'react';
import ReactDOM from 'react-dom';

import Title from './title/title';

const App = () => (
  <Title />
);

export default App;

ReactDOM.render(<App />, document.getElementById('root') || document.createElement('div'));

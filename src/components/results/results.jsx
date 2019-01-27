import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Book from '../book/book';

const StyledResults = styled.ul`
  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: auto;
  justify-items: center;
  margin: 1em 0;
  padding: 0;
`;

const Results = ({ results }) => {
  const books = results.map(result => (
    <Book key={result.etag} book={result} />
  ));

  return (
    <main>
      <StyledResults>
        {books}
      </StyledResults>
    </main>
  );
};

Results.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired
};

export default Results;

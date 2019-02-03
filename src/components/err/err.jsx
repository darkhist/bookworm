import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  font-size: 1.5em;
  text-align: center;
  margin: 3em 0;

  @media screen and (min-width: 768px) {
    margin: 5em 0;
  }
`;

const Err = ({ msg }) => (
  <ErrorMessage>
    {msg}
    <br />
    <span role="img" aria-label="sad face emoji">
      😢
    </span>
  </ErrorMessage>
);

Err.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Err;

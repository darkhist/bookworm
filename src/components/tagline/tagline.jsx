import React from 'react';
import styled from 'styled-components';

const StyledTagline = styled.p`
  font-size: 1em;
  font-style: italic;
  margin: .5em 0;
  text-align: center;
`;

const Tagline = () => (
  <StyledTagline>
    Discover new books!
  </StyledTagline>
);

export default Tagline;

import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  margin: 1em 0;
  text-align: center;
`;

const Title = () => (
  <StyledTitle>
    <span role="img" aria-label="book emoji"> 📚 </span>
    Bookworm
    <span role="img" aria-label="bug emoji"> 🐛 </span>
  </StyledTitle>
);

export default Title;

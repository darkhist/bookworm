import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  margin: .5em 0;
  text-align: center;
`;

const Title = () => (
  <header>
    <StyledTitle>
      <span role="img" aria-label="book emoji"> 📚 </span>
      Bookworm
      <span role="img" aria-label="bug emoji"> 🐛 </span>
    </StyledTitle>
  </header>
);

export default Title;

import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  margin: .5em;
  text-align: center;

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

const Header = () => (
  <header>
    <StyledTitle> bookworm. </StyledTitle>
  </header>
);

export default Header;

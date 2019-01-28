import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  color: #ED4D51;
  display: grid;
  grid-template-rows: repeat(3, auto);
  justify-items: center;
  margin: 8em;
`;

const ErrorCode = styled.h1`
  font-size: 2em;
`;

const ErrorMessage = styled.p`
  font-size: 1em;
  font-style: italic;
`;

const Button = styled.button`
  border: 2px solid #ED4D51;
  border-radius: 5px;
  background: white;
  color: #ED4D51;
  font-size: 1em;
  letter-spacing: 1px;
  margin: 1em 0;
  padding: .25em .75em;
  text-decoration: none;

  &:hover {
    background: #ED4D51;
    color: white;
  }
`;

const NotFound = () => (
  <ErrorContainer>
    <ErrorCode> 404 </ErrorCode>
    <ErrorMessage> Page not found </ErrorMessage>
    <Button as="a" href="/" type="button">
      Go Back
    </Button>
  </ErrorContainer>
);

export default NotFound;

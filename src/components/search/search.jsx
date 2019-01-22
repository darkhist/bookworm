import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-items: center;
  text-align: center;
  margin: 1.5em 1em;
`;

const Input = styled.input`
  border: 0;
  border-bottom: 1px solid black;
  font-size: 1em;
  width: 75%;
`;

const Button = styled.button`
  border-radius: 45px;
  font-size: .75em;
`;

class Search extends Component {
  constructor() {
    super();
    this.state = { term: '' };
  }

  onInputChange(term) {
    this.setState({ term });
  }

  render() {
    const { term } = this.state;

    return (
      <Form role="search">
        <Input
          placeholder="Search"
          value={term}
          type="text"
          aria-label="search"
          onChange={(event) => {
            this.onInputChange(event.target.value);
          }}
        />
        <Button type="submit" aria-label="search button">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form>
    );
  }
}

export default Search;

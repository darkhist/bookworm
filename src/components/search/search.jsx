import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SearchContainer = styled.div`
  text-align: center;
  margin: 1.5em 1em;
`;

const Input = styled.input`
  border: 0;
  border-bottom: 1px solid black;
  font-size: 1em;
  width: 75%;
`;

class Search extends Component {
  constructor() {
    super();
    this.state = { term: '' };
  }

  onInputChange(term) {
    const { onChange } = this.props;
    this.setState({ term });
    onChange(term);
  }

  render() {
    const { term } = this.state;

    return (
      <SearchContainer>
        <Input
          placeholder="Search"
          value={term}
          type="text"
          aria-label="search"
          onChange={(event) => {
            this.onInputChange(event.target.value);
          }}
        />
      </SearchContainer>
    );
  }
}

Search.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Search;

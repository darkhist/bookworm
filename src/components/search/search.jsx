import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SearchContainer = styled.div`
  text-align: center;
  margin: 1em;
`;

const Input = styled.input`
  background: transparent;
  border: 0;
  border-bottom: 1px solid black;
  font-size: 1em;
  width: 75%;
`;

const ErrorMessage = styled.span`
  color: red;
  display: ${props => (props.valid ? 'none' : 'block')};
`;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  onInputChange(term) {
    const { onChange } = this.props;
    this.setState({ term });
    onChange(term);
  }

  render() {
    const { term } = this.state;
    const { valid } = this.props;

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
        <ErrorMessage valid={valid}>
          Searches cannot be empty, and the following characters are not allowed: #, %, &
        </ErrorMessage>
      </SearchContainer>
    );
  }
}

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired
};

export default Search;

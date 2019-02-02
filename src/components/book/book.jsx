import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import fallback from '../../assets/books-and-glasses.jpg';

const StyledBook = styled.li`
  display: grid;
  grid-row-gap: .5em;
  align-items: center;
  justify-items: center;
  border: 1px solid grey;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 
  0 3px 6px rgba(0,0,0,0.23);
  list-style-type: none;
  margin: .75em;
  padding: 1em;
  width: 85%;

  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
    0 10px 10px rgba(0,0,0,0.22);
  }
`;

const Title = styled.div`
  font-size: 1em;
  padding: .25em 0;
  text-align: center;
`;

const Thumbnail = styled.img`
  padding: .5em 0;
`;

const Detail = styled.p`
  font-size: .75em;
  font-style: italic;
  margin: 0;
  padding: .25em 0;
  text-align: center;
`;

const Button = styled.button`
  background: transparent;
  border: 2px solid black;
  border-radius: 5px;
  color: black;
  font-size: .75em;
  padding: .25em .75em;
  text-decoration: none;
  width: 8em;
`;

const Book = ({ book }) => {
  const { title } = book.volumeInfo;
  let authors = book.volumeInfo.authors || 'Not Available';
  const publisher = book.volumeInfo.publisher || 'Not Available';
  let thumbnail = book.volumeInfo.imageLinks
    ? book.volumeInfo.imageLinks.smallThumbnail : fallback;
  const link = book.volumeInfo.infoLink;
  const alt = `Cover of ${title}`;

  thumbnail = thumbnail.replace('http', 'https');

  if ((Array.isArray(authors)) && (authors.length > 1)) {
    authors = authors.join(', ');
  }

  return (
    <StyledBook>
      <Title>
        <cite>
          {title}
        </cite>
      </Title>

      <Thumbnail
        src={thumbnail}
        alt={alt}
      />

      <div>
        <Detail>
          Author(s): &thinsp;
          {authors}
        </Detail>
        <Detail>
          Publisher(s): &thinsp;
          {publisher}
        </Detail>
      </div>

      <div>
        <Button as="a" href={link} type="button">
          Learn more
        </Button>
      </div>
    </StyledBook>
  );
};

Book.propTypes = {
  book: PropTypes.instanceOf(Object).isRequired
};

export default Book;

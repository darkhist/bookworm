import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledBook = styled.li`
  display: grid;
  align-items: center;
  justify-items: center;

  border: 1px solid grey;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 
  0 3px 6px rgba(0,0,0,0.23);
  list-style-type: none;
  margin: .5em;
  padding: .5em;
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
  background: white;
  border: 2px solid black;
  border-radius: 30px;
  font-size: .75em;
  margin: .5em;
  width: 8em;
`;

const Link = styled.a`
  color: black;
  text-decoration: none;
`;

const Book = ({ book }) => {
  const { title } = book.volumeInfo;
  const { authors } = book.volumeInfo;
  const { publisher } = book.volumeInfo;
  const thumbnail = book.volumeInfo.imageLinks.smallThumbnail;
  const link = book.volumeInfo.infoLink;
  const alt = `Cover of ${title}`;

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
        <Button type="button">
          <Link href={link}>
            Learn More
          </Link>
        </Button>
      </div>
    </StyledBook>
  );
};

Book.propTypes = {
  book: PropTypes.instanceOf(Object).isRequired
};

export default Book;

import React from 'react';
import { shallow } from 'enzyme';
import mock from 'axios';

import App from '../components/index';

describe('App', () => {
  it('should render without crashing', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});


describe('getBooks()', () => {
  const getBooks = async () => {
    const response = await mock.get('https://www.googleapis.com/books/v1/volumes?q=flowers');
    return response;
  };

  it('query Google Books API & return correct info', async () => {
    const query = await getBooks();

    expect(query.data).toBeDefined();

    const book = query.data.items[0].volumeInfo;

    const info = {
      title: book.title,
      authors: book.authors,
      publisher: book.publisher,
      thumbnail: book.imageLinks.smallThumbnail,
      link: book.infoLink
    };

    expect(info.title).toEqual('Flowers');
    expect(info.authors).toEqual(['Gail Saunders Smith']);
    expect(info.publisher).toEqual('Capstone');
    expect(info.thumbnail).toEqual('http://books.google.com/books/content?id=ogs_KDUQLSsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api');
    expect(info.link).toEqual('http://books.google.com/books?id=ogs_KDUQLSsC&dq=flowers&hl=&source=gbs_api');
  });
});

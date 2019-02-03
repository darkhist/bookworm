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
  const ok = 'https://www.googleapis.com/books/v1/volumes?q=flowers';
  const noResults = 'https://www.googleapis.com/books/v1/volumes?q=really_long_strange_query';
  const invalid = 'https://www.googleapis.com/books/v99999/vols';

  const getBooks = async url => mock.get(`${url}`);

  it('query Google Books API & return correct info', async () => {
    const query = await getBooks(ok);

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

  it('display an error if there is nothing found', async () => {
    const query = await getBooks(noResults);
    expect(query.data.items.length).toBe(0);

    const app = shallow(<App />);
    app.setState({ results: [] });
    expect(app).toMatchSnapshot();
  });

  it('should handle API errors gracefully', async () => {
    const expectedError = new Error('Invalid Request');

    try {
      await getBooks(invalid);
    } catch (error) {
      expect(error).toEqual(expectedError);
    }

    const app = shallow(<App />);
    app.setState({ error: true });
    expect(app).toMatchSnapshot();
  });
});

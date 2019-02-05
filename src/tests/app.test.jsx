import React from 'react';
import { shallow } from 'enzyme';
import mock from 'axios';

import App from '../components/index';
import Err from '../components/err/err';

const valid = 'https://www.googleapis.com/books/v1/volumes?q=flowers';
const badReq = 'https://www.googleapis.com/books/v1/volumes?q=%%%%';
const noResults = 'https://www.googleapis.com/books/v1/volumes?q=really_long_strange_query';
const invalidURL = 'https://www.googleapis.com/books/v9999';
const getBooks = async url => mock.get(`${url}`);

describe('App', () => {
  it('should render without crashing', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });

  it('should have the correct init state', () => {
    const app = shallow(<App />);
    expect(app.state('results')).toEqual([]);
    expect(app.state('valid')).toBeTruthy();
    expect(app.state('error')).toBeFalsy();
  });

  it('should call getBooks on componentDidMount', () => {
    const spy = jest.spyOn(App.prototype, 'getBooks');
    shallow(<App />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('cats');
  });

  it('should have the correct state on valid queries', async () => {
    const app = shallow(<App />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'getBooks');
    instance.getBooks(valid);
    expect(spy).toHaveBeenCalledTimes(2);

    const results = await getBooks(valid);
    expect(app.state('results')).toEqual(results.data.items);
    expect(app.state('valid')).toBeTruthy();
    expect(app.state('error')).toBeFalsy();
  });

  it('should have the correct state on invalid queries', () => {
    const app = shallow(<App />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'getBooks');
    instance.getBooks(badReq);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(app.state('valid')).toBeFalsy();
    expect(app).toMatchSnapshot();
  });

  it('should have the correct state on API call failure', async () => {
    const app = shallow(<App />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'setState');
    await instance.getBooks(invalidURL);
    expect(spy).toHaveBeenCalled();
    expect(app.find(Err)).toBeTruthy();
  });

  it('should handle state changes properly', async () => {
    const app = shallow(<App />);
    const instance = app.instance();
    const spy = jest.spyOn(instance, 'getBooks');
    await instance.getBooks(valid);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(app.state('results')).toHaveLength(1);
    expect(app.state('valid')).toBeTruthy();
    expect(app.state('error')).toBeFalsy();
    await instance.getBooks(badReq);
    expect(spy).toHaveBeenCalledTimes(3);
    expect(app.state('results')).toHaveLength(1);
    expect(app.state('valid')).toBeFalsy();
    expect(app.state('error')).toBeFalsy();
    expect(app).toMatchSnapshot();
  });

  it('should render errors accordingly', () => {
    const app = shallow(<App />);
    app.setState({ error: true });
    expect(app.find(Err)).toBeTruthy();
    expect(app).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});


describe('getBooks()', () => {
  it('should query Google Books API & return correct info', async () => {
    const query = await getBooks(valid);

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

  it('should detect if no results are found', async () => {
    try {
      const results = await getBooks(noResults);
      expect(results.data.items.length).toBe(0);
    } catch (error) {
      expect(error.status).toBe(200);
      expect(error.data).toEqual({
        kind: 'books#volumes',
        totalItems: 0
      });
    }
  });

  it('should detect if invalid terms are used', async () => {
    try {
      await getBooks(badReq);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.data).toEqual('Bad Request');
    }
  });

  it('should detect API request failures', async () => {
    try {
      const results = await getBooks(invalidURL);
      expect(results.data.items.length).toBe(0);
      const app = shallow(<App />);
      expect(app).toMatchSnapshot();
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.data).toEqual('Not Found');
    }
  });
});

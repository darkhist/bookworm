import React from 'react';
import { shallow } from 'enzyme';

import Book from '../components/book/book';

describe('Book', () => {
  const book = {
    volumeInfo: {
      title: 'Flowers',
      authors: [
        'Gail Saunders Smith'
      ],
      publisher: 'Capstone',
      publishedDate: '2004-09-01',
      description: 'Simple text and photographs depict the parts of flowers and their pollination.',
      industryIdentifiers: [
        {
          type: 'ISBN_10',
          identifier: '0736848649'
        },
        {
          type: 'ISBN_13',
          identifier: '9780736848640'
        }
      ],
      readingModes: {
        text: false,
        image: true
      },
      pageCount: 24,
      printType: 'BOOK',
      categories: [
        'Juvenile Nonfiction'
      ],
      maturityRating: 'NOT_MATURE',
      allowAnonLogging: false,
      contentVersion: '0.1.1.0.preview.1',
      imageLinks: {
        smallThumbnail: 'http://books.google.com/books/content?id=ogs_KDUQLSsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        thumbnail: 'http://books.google.com/books/content?id=ogs_KDUQLSsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
      },
      language: 'en',
      previewLink: 'http://books.google.com/books?id=ogs_KDUQLSsC&printsec=frontcover&dq=flowers&hl=&cd=1&source=gbs_api',
      infoLink: 'http://books.google.com/books?id=ogs_KDUQLSsC&dq=flowers&hl=&source=gbs_api',
      canonicalVolumeLink: 'https://books.google.com/books/about/Flowers.html?hl=&id=ogs_KDUQLSsC'
    },
    saleInfo: {
      country: 'US',
      saleability: 'NOT_FOR_SALE',
      isEbook: false
    },
    accessInfo: {
      country: 'US',
      viewability: 'PARTIAL',
      embeddable: true,
      publicDomain: false,
      textToSpeechPermission: 'ALLOWED',
      epub: {
        isAvailable: false
      },
      pdf: {
        isAvailable: false
      },
      webReaderLink: 'http://play.google.com/books/reader?id=ogs_KDUQLSsC&hl=&printsec=frontcover&source=gbs_api',
      accessViewStatus: 'SAMPLE',
      quoteSharingAllowed: false
    },
    searchInfo: {
      textSnippet: 'Simple text and photographs depict the parts of flowers and their pollination.'
    }
  };

  it('should render without crashing', () => {
    const results = shallow(<Book book={book} />);
    expect(results).toMatchSnapshot();
  });
});

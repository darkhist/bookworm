import React from 'react';
import { shallow } from 'enzyme';

import Book from '../components/book/book';

describe('Book', () => {
  const book = {
    volumeInfo: {
      title: 'Bad Cat',
      authors: [
        'Jim Edgar',
        'James Jennings Edgar'
      ],
      publisher: 'Workman Publishing',
      publishedDate: '2004',
      description: 'Presents photographs of mischievous kittens and cats, along with quotations describing the intentions and attitudes of the feline subjects.',
      industryIdentifiers: [
        {
          type: 'ISBN_10',
          identifier: '0761136193'
        },
        {
          type: 'ISBN_13',
          identifier: '9780761136194'
        }
      ],
      readingModes: {
        text: false,
        image: true
      },
      pageCount: 246,
      printType: 'BOOK',
      categories: [
        'Humor'
      ],
      averageRating: 3.5,
      ratingsCount: 15,
      maturityRating: 'NOT_MATURE',
      allowAnonLogging: false,
      contentVersion: '1.0.0.0.preview.1',
      imageLinks: {
        smallThumbnail: 'http://books.google.com/books/content?id=74TaXzteRdQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        thumbnail: 'http://books.google.com/books/content?id=74TaXzteRdQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
      },
      language: 'en',
      previewLink: 'http://books.google.com/books?id=74TaXzteRdQC&printsec=frontcover&dq=bad+cat&hl=&cd=1&source=gbs_api',
      infoLink: 'http://books.google.com/books?id=74TaXzteRdQC&dq=bad+cat&hl=&source=gbs_api',
      canonicalVolumeLink: 'https://books.google.com/books/about/Bad_Cat.html?hl=&id=74TaXzteRdQC'
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
      textToSpeechPermission: 'ALLOWED_FOR_ACCESSIBILITY',
      epub: {
        isAvailable: false
      },
      pdf: {
        isAvailable: true,
        acsTokenLink: 'http://books.google.com/books/download/Bad_Cat-sample-pdf.acsm?id=74TaXzteRdQC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api'
      },
      webReaderLink: 'http://play.google.com/books/reader?id=74TaXzteRdQC&hl=&printsec=frontcover&source=gbs_api',
      accessViewStatus: 'SAMPLE',
      quoteSharingAllowed: false
    },
    searchInfo: {
      textSnippet: 'Presents photographs of mischievous kittens and cats, along with quotations describing the intentions and attitudes of the feline subjects.'
    }
  };

  it('should render without crashing', () => {
    const results = shallow(<Book book={book} />);
    expect(results).toMatchSnapshot();
  });

  it('return a comma separated list of authors, if needed', () => {
    let { authors } = book.volumeInfo;
    if (authors.length > 1) {
      authors = authors.join(', ');
    }
    const results = shallow(<Book book={book} />);
    expect(results.text().includes(authors)).toBeTruthy();
  });
});

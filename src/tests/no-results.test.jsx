import React from 'react';
import { shallow } from 'enzyme';

import NoResults from '../components/noResults/noResults';

describe('No Results', () => {
  it('should render without crashing', () => {
    const noResults = shallow(<NoResults />);
    expect(noResults).toMatchSnapshot();
  });
});

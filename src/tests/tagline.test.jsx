import React from 'react';
import { shallow } from 'enzyme';

import Tagline from '../components/tagline/tagline';

describe('Tagline', () => {
  it('should render without crashing', () => {
    const tagline = shallow(<Tagline />);
    expect(tagline).toMatchSnapshot();
  });
});

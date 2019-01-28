import React from 'react';
import { shallow } from 'enzyme';

import Header from '../components/header/header';

describe('Header', () => {
  it('should render without crashing', () => {
    const header = shallow(<Header />);
    expect(header).toMatchSnapshot();
  });

  it('should have the correct header', () => {
    const header = shallow(<Header />);
    expect(header.text()).toContain('bookworm');
  });
});

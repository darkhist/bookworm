import React from 'react';
import { shallow } from 'enzyme';

import Title from '../components/title/title';

describe('Title', () => {
  it('should render without crashing', () => {
    const title = shallow(<Title />);
    expect(title).toMatchSnapshot();
  });

  it('should have the correct title', () => {
    const title = shallow(<Title />);
    expect(title.text()).toContain('Bookworm');
  });
});

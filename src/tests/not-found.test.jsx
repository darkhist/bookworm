import React from 'react';
import { shallow, mount } from 'enzyme';

import NotFound from '../components/notFound/notFound';

describe('404', () => {
  it('should render without crashing', () => {
    const notFound = shallow(<NotFound />);
    expect(notFound).toMatchSnapshot();
  });

  it('should render a 404 error message', () => {
    const notFound = shallow(<NotFound />);
    expect(notFound.html()).toContain('404');
    expect(notFound.html()).toContain('Page not found');
  });

  it('should render a btn that redirects home', () => {
    const notFound = mount(<NotFound />);
    const btn = notFound.find('a');
    expect(btn.exists()).toBeTruthy();
    expect(btn.text()).toBe('Go Back');
  });
});

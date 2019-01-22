import React from 'react';
import { shallow, mount } from 'enzyme';

import Search from '../components/search/search';

describe('Search', () => {
  const fn = jest.fn();

  it('should render without crashing', () => {
    const search = shallow(<Search onChange={fn} />);
    expect(search).toMatchSnapshot();
  });

  it('should have the correct init state', () => {
    const search = shallow(<Search onChange={fn} />);
    expect(search.state('term')).toEqual('');
  });

  it('should have an input', () => {
    const search = mount(<Search onChange={fn} />);
    const input = search.find('input');
    expect(input.exists()).toBeTruthy();
  });

  it('should update the state on input change', () => {
    const search = mount(<Search onChange={fn} />);
    const input = search.find('input');

    input.simulate('change', {
      target: {
        value: 'Harry Potter'
      }
    });
    expect(search.state('term')).toEqual('Harry Potter');

    input.simulate('change', {
      target: {
        value: 'The Great Gatsby'
      }
    });
    expect(search.state('term')).toEqual('The Great Gatsby');
  });
});

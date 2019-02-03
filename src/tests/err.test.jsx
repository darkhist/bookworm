import React from 'react';
import { shallow } from 'enzyme';

import Err from '../components/err/err';

describe('Err', () => {
  it('should render without crashing', () => {
    const err = shallow(<Err msg="" />);
    expect(err).toMatchSnapshot();
  });

  it('should render with "no results"', () => {
    const err = shallow(<Err msg="no results" />);
    expect(err).toMatchSnapshot();
  });

  it('should render with "oops. something went wrong"', () => {
    const err = shallow(<Err msg="oops. something went wrong" />);
    expect(err).toMatchSnapshot();
  });
});

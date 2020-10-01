import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { Spinner } from '../../../src/components/layout/Spinner';

// Globals for tests
let wrapper;

describe('<Spinner /> component.', () => {
  test('Successfully renders.', () => {
    wrapper = shallow(<Spinner />);
    expect(wrapper.toExist()).toBe(true);
  });
});

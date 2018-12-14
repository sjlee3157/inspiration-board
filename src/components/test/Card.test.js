import React from 'react';
import { shallow } from 'enzyme';
import Card from '../Card';

describe('Card', () => {

  it('will match the Card Snapshot', () => {
    const wrapper = shallow( <Card
      id={ 1 }
      text='succumb sob suffer'
      emoji='poop'
    /> );
  expect(wrapper).toMatchSnapshot();
  });

});

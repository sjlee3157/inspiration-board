import React from 'react';
import { shallow } from 'enzyme';
import NewCardForm from '../NewCardForm';

describe('NewCardForm', () => {

  it('will match the NewCardForm Snapshot', () => {
    const wrapper = shallow( <NewCardForm /> );
  expect(wrapper).toMatchSnapshot();
  });

});

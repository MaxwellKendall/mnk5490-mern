import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Component from '../src/components/Component';

/*
 * This is an example of a component level test.
 * We are confirming the successful render of the Parent most component
 */

describe('Component Component:', () => {
  let wrapper;

  it('exists?', () => {
    wrapper = shallow(Component);
    expect(wrapper).to.exist;
  });
});

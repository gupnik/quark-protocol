import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { PageDots } from './PageDots';
import IconButton from '@material-ui/core/IconButton';

describe('PageDots component', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(
      <PageDots amount={3} currentTab={1} onPageChange={jest.fn()} showDots />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match the snapshot without dots', () => {
    const wrapper = shallow(
      <PageDots amount={3} currentTab={1} onPageChange={jest.fn()} showDots={false} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call function prop on page change by clicking on the dot', () => {
    const fn = jest.fn((data) => data);
    const wrapper = shallow(<PageDots amount={3} currentTab={1} onPageChange={fn} showDots />);

    const dot = wrapper.find('.dot').at(0);
    dot.simulate('click');
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(1);
  });

  it('should call function prop on page change by clicking the back button', () => {
    const fn = jest.fn((data) => data);
    const currentTab = 2;
    const wrapper = shallow(
      <PageDots amount={3} currentTab={currentTab} onPageChange={fn} showDots />
    );

    const backButton = wrapper.find(IconButton).at(0);
    backButton.simulate('click');
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(currentTab - 1);
  });

  it('should call function prop on page change by clicking the forward button', () => {
    const fn = jest.fn((data) => data);
    const currentTab = 2;
    const wrapper = shallow(
      <PageDots amount={3} currentTab={currentTab} onPageChange={fn} showDots />
    );

    const forwardButton = wrapper.find(IconButton).at(1);
    forwardButton.simulate('click');
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(currentTab + 1);
  });

  it('should have disabled back button if current tab is 1', () => {
    const wrapper = shallow(
      <PageDots amount={3} currentTab={1} onPageChange={jest.fn()} showDots />
    );

    const backButton = wrapper.find(IconButton).at(0);
    expect(backButton.props().disabled).toBeTruthy();
  });

  it('should have disabled forward button if current tab is the last one', () => {
    const wrapper = shallow(
      <PageDots amount={3} currentTab={3} onPageChange={jest.fn()} showDots />
    );

    const forwardButton = wrapper.find(IconButton).at(1);
    expect(forwardButton.props().disabled).toBeTruthy();
  });
});

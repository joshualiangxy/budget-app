import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

let startLogout, wrapper;

beforeEach(() => {
  startLogout = jest.fn();
  startLogout.mockReturnValue(new Promise(resolve => resolve('test')));
  wrapper = shallow(<Header startLogout={startLogout} />);
});

test('Should render Header correctly', () => expect(wrapper).toMatchSnapshot());

test('Should call startLogout on button click', () =>
  wrapper
    .find('button')
    .prop('onClick')()
    .then(() => expect(startLogout).toHaveBeenCalledTimes(1)));

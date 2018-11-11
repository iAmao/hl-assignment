import 'jest-dom/extend-expect'
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import ServiceFilter from '../ServiceFilter';


const props = {
  onClick: jest.fn(),
  onChange: jest.fn(),
  removeItem: jest.fn(),
  inputClassName: 'col-10',
  values: {
    value: '',
    list: ['cleaning']
  }
};

test('Displays apartment service filters', () => {
  const { unmount, queryByText, container } = render(
    <ServiceFilter {...props} values={{ ...props.values, value: 'washing' }} />
  );

  expect(queryByText('washing')).toBeInTheDocument();
  expect(queryByText('cleaning')).toBeInTheDocument();
  expect(container.firstChild.children[1].firstChild.value).toEqual('washing');
  expect(container.firstChild.children[1].children[1].firstChild.innerHTML)
    .toEqual('<div>washing</div>');

  unmount();
});

test('Handle onChange prop service filters', () => {
  const { unmount, queryByText, container, getByPlaceholderText } = render(
    <ServiceFilter {...props} />
  );

  const input = getByPlaceholderText('Enter Service');
  expect(queryByText('cleaning')).toBeInTheDocument();
  expect(input.value).toEqual('');
  expect(container.firstChild.children[1].children[1].firstChild.innerHTML)
    .toEqual('');

  fireEvent.change(input, { target: { value: 'television' } });
  expect(props.onChange).toHaveBeenCalled();

  unmount();
});

test('Handle onClick prop service filters', () => {
  const { unmount, getByText, container, getByPlaceholderText } = render(
    <ServiceFilter {...props} values={{ ...props.values, value: 'desk' }} />
  );

  const input = getByPlaceholderText('Enter Service');
  expect(getByText('cleaning')).toBeInTheDocument();
  expect(input.value).toEqual('desk');
  expect(container.firstChild.children[1].children[1].firstChild.innerHTML)
    .toEqual('<div>desk</div>');

  fireEvent.click(getByText('desk'));
  expect(props.onClick).toHaveBeenCalled();
});

test('Handle removeItem prop service filters', () => {
  const { unmount, getByText, container, getByPlaceholderText } = render(
    <ServiceFilter {...props} values={{ ...props.values, value: 'desk' }} />
  );

  fireEvent.click(getByText('cleaning'));
  expect(props.removeItem).toHaveBeenCalled();
});

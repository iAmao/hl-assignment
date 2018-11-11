import 'jest-dom/extend-expect'
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import AmenityFilter from '../AmenityFilter';


const props = {
  onClick: jest.fn(),
  onChange: jest.fn(),
  removeItem: jest.fn(),
  inputClassName: 'col-10',
  values: {
    value: '',
    list: ['radio']
  }
};

test('Displays apartment amenity filters', () => {
  const { unmount, queryByText, container } = render(
    <AmenityFilter {...props} values={{ ...props.values, value: 'xx' }} />
  );

  expect(queryByText('xx')).toBeInTheDocument();
  expect(queryByText('radio')).toBeInTheDocument();
  expect(container.firstChild.children[1].firstChild.value).toEqual('xx');
  expect(container.firstChild.children[1].children[1].firstChild.innerHTML)
    .toEqual('<div>xx</div>');

  unmount();
});

test('Handle onChange prop amenity filters', () => {
  const { unmount, queryByText, container, getByPlaceholderText } = render(
    <AmenityFilter {...props} />
  );

  const input = getByPlaceholderText('Enter Amenity');
  expect(queryByText('radio')).toBeInTheDocument();
  expect(input.value).toEqual('');
  expect(container.firstChild.children[1].children[1].firstChild.innerHTML)
    .toEqual('');

  fireEvent.change(input, { target: { value: 'television' } });
  expect(props.onChange).toHaveBeenCalled();

  unmount();
});

test('Handle onClick prop amenity filters', () => {
  const { unmount, getByText, container, getByPlaceholderText } = render(
    <AmenityFilter {...props} values={{ ...props.values, value: 'desk' }} />
  );

  const input = getByPlaceholderText('Enter Amenity');
  expect(getByText('radio')).toBeInTheDocument();
  expect(input.value).toEqual('desk');
  expect(container.firstChild.children[1].children[1].firstChild.innerHTML)
    .toEqual('<div>desk</div>');

  fireEvent.click(getByText('desk'));
  expect(props.onClick).toHaveBeenCalled();
});

test('Handle removeItem prop amenity filters', () => {
  const { unmount, getByText, container, getByPlaceholderText } = render(
    <AmenityFilter {...props} values={{ ...props.values, value: 'desk' }} />
  );

  fireEvent.click(getByText('radio'));
  expect(props.removeItem).toHaveBeenCalled();
});

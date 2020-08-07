import React from 'react';
import '../../test/setup';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import renderWithRedux from '../../test/testUtils';
import Header from './Header';

it('renders a header component', () => {
  const { getTestById } = renderWithRedux(<Header />);

  console.log(getTestById('header-bar'));
});

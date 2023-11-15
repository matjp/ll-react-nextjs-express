import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';

import BookItem from '../BookItem';
import Book from '@/model/Book';

describe('BookItem Tests', () => {

  it('renders correctly', async () => {

    const [reload, setReload] = useState<boolean>(false);

    const book: Book = {
      title: "Alice's Adventures in Wonderland",
      author: 'Lewis Carrol',
      cover_image: '',
      borrowed: false
    }

    render(<BookItem book={book} formName='borrow' reload={reload} setReload={setReload}></BookItem>);
    
    await waitFor(() => {
      expect(screen.getByAltText(/Adventures/)).toBeDefined();
    })
  })

});
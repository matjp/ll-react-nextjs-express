import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';

import BookForm from '../BookForm';

describe('BookForm Tests', () => {

  it('renders correctly', async () => {

    const [reload, setReload] = useState<boolean>(false);

    render(<BookForm formName='borrow' formValue='Oliver Twist' disabled={false} reload={reload} setReload={setReload}></BookForm>);
        
    await waitFor(() => {
      expect(screen.getByRole('form', {name: 'borrow'})).toBeDefined();
    })
  })

});
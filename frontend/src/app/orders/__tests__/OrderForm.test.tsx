import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderForm from '../components/OrderForm';
import { vi, describe, it, expect } from 'vitest';
import * as service from '../lib/trade.service';

describe('<OrderForm />', () => {
  it('shows validation errors and prevents submit', async () => {
    render(<OrderForm />);

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText('Invalid Security Name')).toBeVisible();
  });

  it('happy path – books trade and shows Completed', async () => {
    // mock service to remove random failure
    vi.spyOn(service, 'bookTrade').mockResolvedValueOnce({
      id: '1',
      fund: { id: 'f1', name: 'Global Equity', price: 100 },
      transactionType: 'Buy',
      quantity: 1,
      value: 100,
      statusTrail: ['Submitted', 'Executed', 'Completed']
    } as any);

    render(<OrderForm />);

    await userEvent.selectOptions(
      screen.getByLabelText(/fund name/i),
      'f1'
    );
    await userEvent.selectOptions(
      screen.getByLabelText(/transaction type/i),
      'Buy'
    );
    await userEvent.type(screen.getByLabelText(/quantity/i), '1');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Completed')).toBeVisible();
  });
});

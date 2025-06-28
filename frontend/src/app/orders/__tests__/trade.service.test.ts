import { listFunds, bookTrade } from '../lib/trade.service';
import { vi, expect, describe, it } from 'vitest';

describe('trade.service', () => {
  it('returns static fund list', () => {
    const funds = listFunds();
    expect(funds).toHaveLength(3);
    expect(funds[0]).toMatchObject({ id: 'f1', price: 100 });
  });

  it('books a trade & returns Completed flow', async () => {
    const order = await bookTrade({
      fundId: 'f1',
      transactionType: 'Buy',
      quantity: 2
    });

    expect(order.statusTrail.at(-1)).toBe('Completed');
    expect(order.value).toBe(200);
  });

  it('fails when legacy down (mock Math.random)', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.05); // force failure

    await expect(
      bookTrade({ fundId: 'f1', transactionType: 'Buy', quantity: 1 })
    ).rejects.toThrow('Legacy service unavailable');

    (Math.random as any).mockRestore();
  });
});

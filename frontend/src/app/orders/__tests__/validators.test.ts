import { orderSchema } from '../validators';
import { describe, it, expect } from 'vitest';

describe('orderSchema', () => {
  it('passes for a valid payload', () => {
    const obj = orderSchema.parse({
      fundId: 'f1',
      transactionType: 'Buy',
      quantity: 3
    });
    expect(obj.quantity).toBe(3);
  });

  it.each([
    [{ fundId: 'x', transactionType: 'Buy', quantity: 1 }, 'Invalid Security Name'],
    [{ fundId: 'f1', transactionType: 'Hold', quantity: 1 }, 'Invalid Transaction Type'],
    [{ fundId: 'f1', transactionType: 'Buy', quantity: 0 }, 'Invalid Quantity']
  ])('rejects invalid payload %#', (payload, msg) => {
    expect(() => orderSchema.parse(payload)).toThrow(msg);
  });
});

import funds from "../data/funds.json";
import { v4 as uuid } from "uuid";

/* ---------- Types ---------- */
export type TxType = "Buy" | "Sell";

export interface Fund {
  id: string;
  name: string;
  price: number;
}

export interface CreateOrder {
  fundId: string;
  transactionType: TxType;
  quantity: number;
}

export type OrderStatus =
  | "Submitted"
  | "Cancelled"
  | "Executed"
  | "Completed"
  | "Failed";

export interface Order {
  id: string;
  fund: Fund;
  transactionType: TxType;
  quantity: number;
  value: number;
  statusTrail: OrderStatus[];
}

/* ---------- 1 TPS queue simulating legacy ---------- */
let busy = false;
const q: (() => void)[] = [];
function nextJob() {
  if (!busy && q.length) q.shift()!();
}

/* ---------- public mock API ---------- */
export function listFunds(): Fund[] {
  return funds; // static for now
}

/** books a trade & resolves within < 1 s; fails randomly (20 %) */
export function bookTrade(dto: CreateOrder): Promise<Order> {
  return new Promise<Order>((resolve, reject) => {
    q.push(() => {
      busy = true;
      const legacyDown = Math.random() < 0.2;

      setTimeout(() => {
        try {
          if (legacyDown) throw new Error("Legacy service unavailable");

          const fund = funds.find((f) => f.id === dto.fundId);
          if (!fund) throw new Error("Invalid Security Name");

          const value = fund.price * dto.quantity;

          resolve({
            id: uuid(),
            fund,
            transactionType: dto.transactionType,
            quantity: dto.quantity,
            value,
            statusTrail: ["Submitted", "Executed", "Completed"]
          });
        } catch (e) {
          reject(e);
        } finally {
          busy = false;
          nextJob();
        }
      }, 600); // ⚑ < 1 000 ms SLA
    });
    nextJob();
  });
}

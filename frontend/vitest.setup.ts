import '@testing-library/jest-dom';

// Mock Next.js router if components ever call useRouter
import { vi } from 'vitest';
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() })
}));

// Example: window.matchMedia stub (Tailwind dark-mode hooks)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  }))
});

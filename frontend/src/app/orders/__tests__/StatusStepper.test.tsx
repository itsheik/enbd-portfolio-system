import { render, screen } from '@testing-library/react';
import StatusStepper from '../components/StatusStepper';
import { describe, it, expect } from 'vitest';

it('renders numeric steps + icons', () => {
  render(
    <StatusStepper
      steps={['Submitted', 'Executed', 'Completed', 'Failed']}
    />
  );

  // numeric badges
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();

  // status labels
  expect(screen.getByText('Completed')).toBeInTheDocument();
  expect(screen.getByText('Failed')).toBeInTheDocument();

  // arrows
  expect(screen.getAllByText('→')).toHaveLength(3);
});

it('renders nothing for empty list', () => {
  const { container } = render(<StatusStepper steps={[]} />);
  expect(container.firstChild).toBeNull();
});

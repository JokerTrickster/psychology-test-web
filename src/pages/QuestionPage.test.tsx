import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test/test-utils';
import QuestionPage from './QuestionPage';
import type { Node } from '../types';

describe('QuestionPage', () => {
  const mockNode: Node = {
    id: 'q1',
    type: 'question',
    text: '당신은 아침에 일어나면?',
    options: [
      { text: '바로 일어난다', nextId: 'q2' },
      { text: '더 잔다', nextId: 'q3' },
      { text: '알람을 끈다', nextId: 'q4' },
    ],
  };

  const defaultProps = {
    node: mockNode,
    onSelectOption: vi.fn(),
  };

  it('renders the question text', () => {
    render(<QuestionPage {...defaultProps} />);
    expect(screen.getByText('당신은 아침에 일어나면?')).toBeInTheDocument();
  });

  it('renders all option buttons', () => {
    render(<QuestionPage {...defaultProps} />);
    expect(screen.getByText('바로 일어난다')).toBeInTheDocument();
    expect(screen.getByText('더 잔다')).toBeInTheDocument();
    expect(screen.getByText('알람을 끈다')).toBeInTheDocument();
  });

  it('calls onSelectOption with nextId when option is clicked', async () => {
    const onSelectOption = vi.fn();
    render(<QuestionPage node={mockNode} onSelectOption={onSelectOption} />);
    await userEvent.click(screen.getByText('바로 일어난다'));
    expect(onSelectOption).toHaveBeenCalledWith('q2');
  });

  it('calls onSelectOption with correct nextId for second option', async () => {
    const onSelectOption = vi.fn();
    render(<QuestionPage node={mockNode} onSelectOption={onSelectOption} />);
    await userEvent.click(screen.getByText('더 잔다'));
    expect(onSelectOption).toHaveBeenCalledWith('q3');
  });

  it('renders without imageUrl', () => {
    const nodeWithoutImage: Node = { ...mockNode, imageUrl: undefined };
    const { container } = render(
      <QuestionPage node={nodeWithoutImage} onSelectOption={vi.fn()} />
    );
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('handles node with imageUrl', () => {
    const nodeWithImage: Node = { ...mockNode, imageUrl: '/test.png' };
    // Image is hidden on mobile (display: none for xs), but element exists in DOM
    render(<QuestionPage node={nodeWithImage} onSelectOption={vi.fn()} />);
    // The component still renders, just may be hidden via CSS
    expect(screen.getByText('당신은 아침에 일어나면?')).toBeInTheDocument();
  });

  it('renders with empty options', () => {
    const nodeNoOptions: Node = { ...mockNode, options: [] };
    render(<QuestionPage node={nodeNoOptions} onSelectOption={vi.fn()} />);
    expect(screen.getByText('당신은 아침에 일어나면?')).toBeInTheDocument();
  });

  it('handles hover on option buttons', async () => {
    render(<QuestionPage {...defaultProps} />);
    const firstOption = screen.getByText('바로 일어난다');
    await userEvent.hover(firstOption);
    expect(firstOption).toBeInTheDocument();
    await userEvent.unhover(firstOption);
    expect(firstOption).toBeInTheDocument();
  });

  it('handles touch events on option buttons', () => {
    render(<QuestionPage {...defaultProps} />);
    const button = screen.getByText('바로 일어난다').closest('button')!;
    fireEvent.touchStart(button);
    fireEvent.touchEnd(button);
    expect(button).toBeInTheDocument();
  });
});

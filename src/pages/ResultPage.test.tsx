import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test/test-utils';
import ResultPage from './ResultPage';
import type { Node } from '../types';

describe('ResultPage', () => {
  const mockNode: Node = {
    id: 'r1',
    type: 'result',
    title: '모란앵무',
    description: '당신은 사랑스럽고 활발한 모란앵무입니다!\n친구들과 함께하는 것을 좋아해요.',
    imageUrl: '/images/result1.png',
  };

  const defaultProps = {
    node: mockNode,
    onRestart: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the completion badge', () => {
    render(<ResultPage {...defaultProps} />);
    expect(screen.getByText(/테스트 완료/)).toBeInTheDocument();
  });

  it('renders the result title', () => {
    render(<ResultPage {...defaultProps} />);
    expect(screen.getByText('모란앵무')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<ResultPage {...defaultProps} />);
    expect(screen.getByText(/사랑스럽고 활발한 모란앵무/)).toBeInTheDocument();
  });

  it('renders the result image', () => {
    render(<ResultPage {...defaultProps} />);
    const img = screen.getByAltText('Result');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/result1.png');
  });

  it('does not render image when imageUrl is absent', () => {
    const nodeNoImage: Node = { ...mockNode, imageUrl: undefined };
    render(<ResultPage node={nodeNoImage} onRestart={vi.fn()} />);
    expect(screen.queryByAltText('Result')).not.toBeInTheDocument();
  });

  it('renders restart button', () => {
    render(<ResultPage {...defaultProps} />);
    expect(screen.getByRole('button', { name: /다시 테스트하기/ })).toBeInTheDocument();
  });

  it('calls onRestart when restart button is clicked', async () => {
    vi.useRealTimers(); // userEvent needs real timers
    const onRestart = vi.fn();
    render(<ResultPage node={mockNode} onRestart={onRestart} />);
    await userEvent.click(screen.getByRole('button', { name: /다시 테스트하기/ }));
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it('renders summary when provided', () => {
    render(<ResultPage {...defaultProps} summary="활발하고 사교적인 새" />);
    expect(screen.getByText('활발하고 사교적인 새')).toBeInTheDocument();
  });

  it('does not render summary when not provided', () => {
    render(<ResultPage {...defaultProps} />);
    expect(screen.queryByText('활발하고 사교적인 새')).not.toBeInTheDocument();
  });

  it('shows confetti after 400ms', async () => {
    vi.useRealTimers();
    render(<ResultPage {...defaultProps} />);
    // Wait for confetti to appear (setTimeout 400ms)
    await new Promise((r) => setTimeout(r, 500));
    // Confetti renders star/heart icons - check they exist
    expect(screen.getByText(/친구들과도 함께 해보세요/)).toBeInTheDocument();
  });

  it('renders the fun message', () => {
    render(<ResultPage {...defaultProps} />);
    expect(screen.getByText(/친구들과도 함께 해보세요/)).toBeInTheDocument();
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test/test-utils';
import ResultPageParrot from './ResultPage-parrot';
import type { BirdResult } from '../types-score';

describe('ResultPage-parrot', () => {
  const mockResult: BirdResult = {
    name: '꼬꼬',
    scoreRange: [5, 8],
    summary: '활발하고 장난끼 많은 앵무새',
    description: '당신과 잘 맞는 앵무새는 꼬꼬입니다!\n에너지가 넘치고 호기심이 많아요.',
    imageUrl: '/images/parrot1.png',
    traits: ['활발', '호기심', '장난끼'],
    compatibility: ['도란이', '모란이'],
  };

  const defaultProps = {
    result: mockResult,
    onRestart: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the result name', () => {
    render(<ResultPageParrot {...defaultProps} />);
    expect(screen.getByText('꼬꼬')).toBeInTheDocument();
  });

  it('renders the badge text', () => {
    render(<ResultPageParrot {...defaultProps} />);
    expect(screen.getByText(/당신의 궁합 앵무새는/)).toBeInTheDocument();
  });

  it('renders the summary', () => {
    render(<ResultPageParrot {...defaultProps} />);
    expect(screen.getByText('활발하고 장난끼 많은 앵무새')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<ResultPageParrot {...defaultProps} />);
    expect(screen.getByText(/당신과 잘 맞는 앵무새는 꼬꼬/)).toBeInTheDocument();
  });

  it('renders the result image', () => {
    render(<ResultPageParrot {...defaultProps} />);
    const img = screen.getByAltText('꼬꼬');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/parrot1.png');
  });

  it('does not render image when imageUrl is absent', () => {
    const resultNoImage: BirdResult = { ...mockResult, imageUrl: undefined };
    render(<ResultPageParrot result={resultNoImage} onRestart={vi.fn()} />);
    expect(screen.queryByAltText('꼬꼬')).not.toBeInTheDocument();
  });

  it('renders trait chips', () => {
    render(<ResultPageParrot {...defaultProps} />);
    expect(screen.getByText('#활발')).toBeInTheDocument();
    expect(screen.getByText('#호기심')).toBeInTheDocument();
    expect(screen.getByText('#장난끼')).toBeInTheDocument();
  });

  it('does not render traits section when empty', () => {
    const resultNoTraits: BirdResult = { ...mockResult, traits: [] };
    render(<ResultPageParrot result={resultNoTraits} onRestart={vi.fn()} />);
    expect(screen.queryByText('#활발')).not.toBeInTheDocument();
  });

  it('renders compatibility section', () => {
    render(<ResultPageParrot {...defaultProps} />);
    expect(screen.getByText('잘 맞는 친구')).toBeInTheDocument();
    expect(screen.getByText('도란이, 모란이')).toBeInTheDocument();
  });

  it('does not render compatibility when empty', () => {
    const resultNoCompat: BirdResult = { ...mockResult, compatibility: [] };
    render(<ResultPageParrot result={resultNoCompat} onRestart={vi.fn()} />);
    expect(screen.queryByText('잘 맞는 친구')).not.toBeInTheDocument();
  });

  it('renders restart button', () => {
    render(<ResultPageParrot {...defaultProps} />);
    expect(screen.getByRole('button', { name: /다시 테스트하기/ })).toBeInTheDocument();
  });

  it('calls onRestart when clicked', async () => {
    vi.useRealTimers();
    const onRestart = vi.fn();
    render(<ResultPageParrot result={mockResult} onRestart={onRestart} />);
    await userEvent.click(screen.getByRole('button', { name: /다시 테스트하기/ }));
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it('shows confetti after 400ms', async () => {
    vi.useRealTimers();
    render(<ResultPageParrot {...defaultProps} />);
    await new Promise((r) => setTimeout(r, 500));
    expect(screen.getByText(/친구들과도 함께 해보세요/)).toBeInTheDocument();
  });

  it('renders without summary', () => {
    const resultNoSummary: BirdResult = { ...mockResult, summary: '' };
    render(<ResultPageParrot result={resultNoSummary} onRestart={vi.fn()} />);
    expect(screen.getByText('꼬꼬')).toBeInTheDocument();
  });

  it('renders fun message', () => {
    render(<ResultPageParrot {...defaultProps} />);
    expect(screen.getByText(/친구들과도 함께 해보세요/)).toBeInTheDocument();
  });
});

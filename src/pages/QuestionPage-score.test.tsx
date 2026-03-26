import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test/test-utils';
import QuestionPageScore from './QuestionPage-score';
import type { Question } from '../types-score';

describe('QuestionPage-score', () => {
  const mockQuestion: Question = {
    id: 'q1',
    text: '새로운 사람을 만나면?',
    options: [
      { text: '먼저 다가간다', score: 1 },
      { text: '기다린다', score: -1 },
    ],
    category: '사교성',
  };

  const defaultProps = {
    question: mockQuestion,
    questionNumber: 3,
    totalQuestions: 12,
    onSelectOption: vi.fn(),
  };

  it('renders the question text', () => {
    render(<QuestionPageScore {...defaultProps} />);
    expect(screen.getByText('새로운 사람을 만나면?')).toBeInTheDocument();
  });

  it('renders progress indicator', () => {
    render(<QuestionPageScore {...defaultProps} />);
    expect(screen.getByText('3 / 12')).toBeInTheDocument();
  });

  it('renders category', () => {
    render(<QuestionPageScore {...defaultProps} />);
    expect(screen.getByText('사교성')).toBeInTheDocument();
  });

  it('renders both options', () => {
    render(<QuestionPageScore {...defaultProps} />);
    expect(screen.getByText('먼저 다가간다')).toBeInTheDocument();
    expect(screen.getByText('기다린다')).toBeInTheDocument();
  });

  it('calls onSelectOption with score when A is clicked', async () => {
    const onSelectOption = vi.fn();
    render(<QuestionPageScore {...defaultProps} onSelectOption={onSelectOption} />);
    await userEvent.click(screen.getByText('먼저 다가간다'));
    expect(onSelectOption).toHaveBeenCalledWith(1);
  });

  it('calls onSelectOption with score when B is clicked', async () => {
    const onSelectOption = vi.fn();
    render(<QuestionPageScore {...defaultProps} onSelectOption={onSelectOption} />);
    await userEvent.click(screen.getByText('기다린다'));
    expect(onSelectOption).toHaveBeenCalledWith(-1);
  });

  it('renders progress bar', () => {
    const { container } = render(<QuestionPageScore {...defaultProps} />);
    expect(container.querySelector('.MuiLinearProgress-root')).toBeInTheDocument();
  });

  it('renders at first question', () => {
    render(<QuestionPageScore {...defaultProps} questionNumber={1} />);
    expect(screen.getByText('1 / 12')).toBeInTheDocument();
  });

  it('renders at last question', () => {
    render(<QuestionPageScore {...defaultProps} questionNumber={12} />);
    expect(screen.getByText('12 / 12')).toBeInTheDocument();
  });

  it('handles hover on option buttons', async () => {
    render(<QuestionPageScore {...defaultProps} />);
    const firstOption = screen.getByText('먼저 다가간다');
    await userEvent.hover(firstOption);
    expect(firstOption).toBeInTheDocument();
    await userEvent.unhover(firstOption);
    expect(firstOption).toBeInTheDocument();
  });

  it('handles touch events on option buttons', () => {
    render(<QuestionPageScore {...defaultProps} />);
    const button = screen.getByText('먼저 다가간다').closest('button')!;
    fireEvent.touchStart(button);
    fireEvent.touchEnd(button);
    expect(button).toBeInTheDocument();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test/test-utils';
import TestSelectPage from './TestSelectPage';

describe('TestSelectPage', () => {
  const defaultProps = {
    onSelectTest: vi.fn(),
  };

  it('renders the title', () => {
    render(<TestSelectPage {...defaultProps} />);
    expect(screen.getByText(/어떤 테스트를 해볼까/)).toBeInTheDocument();
  });

  it('renders the lovebird test card', () => {
    render(<TestSelectPage {...defaultProps} />);
    expect(screen.getByText('나는 어떤 앵무새일까?')).toBeInTheDocument();
    expect(screen.getByText(/31가지 앵무새/)).toBeInTheDocument();
  });

  it('renders the parrot compatibility card', () => {
    render(<TestSelectPage {...defaultProps} />);
    expect(screen.getByText(/나랑 궁합 좋은 모란도란은/)).toBeInTheDocument();
    expect(screen.getByText(/5마리 앵무새/)).toBeInTheDocument();
  });

  it('calls onSelectTest with lovebird when clicked', async () => {
    const onSelectTest = vi.fn();
    render(<TestSelectPage onSelectTest={onSelectTest} />);
    await userEvent.click(screen.getByText('나는 어떤 앵무새일까?'));
    expect(onSelectTest).toHaveBeenCalledWith('lovebird');
  });

  it('calls onSelectTest with parrot when clicked', async () => {
    const onSelectTest = vi.fn();
    render(<TestSelectPage onSelectTest={onSelectTest} />);
    await userEvent.click(screen.getByText(/나랑 궁합 좋은 모란도란은/));
    expect(onSelectTest).toHaveBeenCalledWith('parrot');
  });

  it('renders 4 social links', () => {
    render(<TestSelectPage {...defaultProps} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(4);
  });

  it('social links open in new tab', () => {
    render(<TestSelectPage {...defaultProps} />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('renders bottom text', () => {
    render(<TestSelectPage {...defaultProps} />);
    expect(screen.getByText(/간단한 질문으로 알아보는 나만의 앵무새/)).toBeInTheDocument();
  });
});

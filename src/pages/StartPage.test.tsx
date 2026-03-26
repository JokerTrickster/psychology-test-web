import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test/test-utils';
import StartPage from './StartPage';

describe('StartPage', () => {
  const defaultProps = {
    onStart: vi.fn(),
  };

  it('renders the title', () => {
    render(<StartPage {...defaultProps} />);
    expect(screen.getByText(/나는 어떤 앵무새일까/)).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<StartPage {...defaultProps} />);
    expect(screen.getByText(/간단한 질문으로 알아보는/)).toBeInTheDocument();
  });

  it('renders the start button', () => {
    render(<StartPage {...defaultProps} />);
    expect(screen.getByRole('button', { name: /테스트 시작하기/ })).toBeInTheDocument();
  });

  it('calls onStart when button is clicked', async () => {
    const onStart = vi.fn();
    render(<StartPage onStart={onStart} />);
    await userEvent.click(screen.getByRole('button', { name: /테스트 시작하기/ }));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('renders the bottom info text', () => {
    render(<StartPage {...defaultProps} />);
    expect(screen.getByText(/31가지 다양한 앵무새/)).toBeInTheDocument();
  });
});

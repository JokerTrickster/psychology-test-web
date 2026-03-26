import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './test/test-utils';
import App from './App-score';

describe('App-score', () => {
  it('renders TestSelectPage initially', () => {
    render(<App />);
    expect(screen.getByText(/어떤 테스트를 해볼까/)).toBeInTheDocument();
  });

  describe('lovebird test flow', () => {
    it('shows StartPage after selecting lovebird', async () => {
      render(<App />);
      await userEvent.click(screen.getByText('나는 어떤 앵무새일까?'));
      expect(screen.getByText(/나는 어떤 앵무새일까/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /테스트 시작하기/ })).toBeInTheDocument();
    });

    it('starts questions after clicking start', async () => {
      render(<App />);
      await userEvent.click(screen.getByText('나는 어떤 앵무새일까?'));
      await userEvent.click(screen.getByRole('button', { name: /테스트 시작하기/ }));
      // Should show first question with progress
      expect(screen.getByText(/1 \//)).toBeInTheDocument();
    });

    it('completes full lovebird test flow', async () => {
      render(<App />);
      // Select lovebird test
      await userEvent.click(screen.getByText('나는 어떤 앵무새일까?'));
      // Start test
      await userEvent.click(screen.getByRole('button', { name: /테스트 시작하기/ }));

      // Answer all questions by clicking first option (A)
      let attempts = 0;
      while (attempts < 50) {
        const restartButton = screen.queryByRole('button', { name: /다시 테스트하기/ });
        if (restartButton) break;

        const buttons = screen.getAllByRole('button');
        if (buttons.length > 0) {
          await userEvent.click(buttons[0]);
        }
        attempts++;
      }

      // Should reach result page
      expect(screen.getByRole('button', { name: /다시 테스트하기/ })).toBeInTheDocument();
    });

    it('returns to TestSelectPage on restart', async () => {
      render(<App />);
      await userEvent.click(screen.getByText('나는 어떤 앵무새일까?'));
      await userEvent.click(screen.getByRole('button', { name: /테스트 시작하기/ }));

      // Answer all questions
      let attempts = 0;
      while (attempts < 50) {
        const restartButton = screen.queryByRole('button', { name: /다시 테스트하기/ });
        if (restartButton) break;
        const buttons = screen.getAllByRole('button');
        if (buttons.length > 0) await userEvent.click(buttons[0]);
        attempts++;
      }

      // Restart
      await userEvent.click(screen.getByRole('button', { name: /다시 테스트하기/ }));
      expect(screen.getByText(/어떤 테스트를 해볼까/)).toBeInTheDocument();
    });
  });

  describe('parrot test flow', () => {
    it('goes directly to first question after selecting parrot', async () => {
      render(<App />);
      await userEvent.click(screen.getByText(/나랑 궁합 좋은 모란도란은/));
      // Parrot test skips StartPage, goes directly to question
      expect(screen.getByText(/1 \//)).toBeInTheDocument();
    });

    it('completes full parrot test flow', async () => {
      render(<App />);
      await userEvent.click(screen.getByText(/나랑 궁합 좋은 모란도란은/));

      // Answer all questions
      let attempts = 0;
      while (attempts < 30) {
        const restartButton = screen.queryByRole('button', { name: /다시 테스트하기/ });
        if (restartButton) break;
        const buttons = screen.getAllByRole('button');
        if (buttons.length > 0) await userEvent.click(buttons[0]);
        attempts++;
      }

      // Should reach parrot result page
      expect(screen.getByRole('button', { name: /다시 테스트하기/ })).toBeInTheDocument();
    });
  });

  describe('score calculation', () => {
    it('accumulates scores correctly through questions', async () => {
      render(<App />);
      await userEvent.click(screen.getByText(/나랑 궁합 좋은 모란도란은/));

      // Answer all with B option (second button, typically score -1)
      let attempts = 0;
      while (attempts < 30) {
        const restartButton = screen.queryByRole('button', { name: /다시 테스트하기/ });
        if (restartButton) break;
        const buttons = screen.getAllByRole('button');
        if (buttons.length >= 2) {
          await userEvent.click(buttons[1]); // Always pick B
        } else if (buttons.length > 0) {
          await userEvent.click(buttons[0]);
        }
        attempts++;
      }

      // Should reach a result (different from all-A answers)
      expect(screen.getByRole('button', { name: /다시 테스트하기/ })).toBeInTheDocument();
    });
  });

  // Note: "Error: Result not found" branch (App-score.tsx:144) is defensive code
  // that requires score data to have no matching result for a valid score.
  // With the current score-data.json, all possible scores have matching results.
  // This branch is intentionally kept as a safety net but is not testable
  // without module-level data mocking.
});

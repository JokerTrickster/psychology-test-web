import { describe, it, expect, vi } from 'vitest';

describe('main', () => {
  it('calls createRoot and render', async () => {
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);

    const mockRender = vi.fn();
    vi.doMock('react-dom/client', () => ({
      createRoot: vi.fn(() => ({ render: mockRender })),
    }));

    // Dynamic import triggers module execution
    await import('./main');

    // Verify render was called
    expect(mockRender).toHaveBeenCalledTimes(1);

    document.body.removeChild(rootDiv);
    vi.doUnmock('react-dom/client');
  }, 15000);
});

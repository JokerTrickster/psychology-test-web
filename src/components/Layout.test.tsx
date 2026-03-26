import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../test/test-utils';
import Layout from './Layout';

describe('Layout', () => {
  it('renders children', () => {
    render(
      <Layout>
        <div data-testid="child">Child content</div>
      </Layout>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders a container element', () => {
    const { container } = render(
      <Layout>
        <span>Test</span>
      </Layout>
    );
    const muiContainer = container.querySelector('.MuiContainer-root');
    expect(muiContainer).toBeInTheDocument();
  });
});

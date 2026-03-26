import { render, type RenderOptions } from '@testing-library/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme';
import type { ReactElement, ReactNode } from 'react';

function AllTheProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };

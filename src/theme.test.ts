import { describe, it, expect } from 'vitest';
import theme from './theme';

describe('theme', () => {
  it('has correct primary color', () => {
    expect(theme.palette.primary.main).toBe('#7EC850');
    expect(theme.palette.primary.light).toBe('#B8E986');
    expect(theme.palette.primary.dark).toBe('#5CA632');
  });

  it('has correct secondary color', () => {
    expect(theme.palette.secondary.main).toBe('#FFE84D');
    expect(theme.palette.secondary.light).toBe('#FFF9B0');
    expect(theme.palette.secondary.dark).toBe('#FFD700');
  });

  it('has correct text colors', () => {
    expect(theme.palette.text.primary).toBe('#2C2C2C');
    expect(theme.palette.text.secondary).toBe('#5C5C5C');
  });

  it('uses Jua font family', () => {
    expect(theme.typography.fontFamily).toContain('Jua');
  });

  it('has correct border radius', () => {
    expect(theme.shape.borderRadius).toBe(28);
  });

  it('has 25 shadow levels', () => {
    expect(theme.shadows).toHaveLength(25);
  });

  it('has button component overrides', () => {
    const buttonOverrides = theme.components?.MuiButton?.styleOverrides;
    expect(buttonOverrides).toBeDefined();
  });

  it('has paper component overrides', () => {
    const paperOverrides = theme.components?.MuiPaper?.styleOverrides;
    expect(paperOverrides).toBeDefined();
  });
});

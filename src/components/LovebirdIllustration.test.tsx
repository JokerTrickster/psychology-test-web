import { describe, it, expect } from 'vitest';
import { render } from '../test/test-utils';
import LovebirdIllustration from './LovebirdIllustration';

describe('LovebirdIllustration', () => {
  describe('sitting variant (default)', () => {
    it('renders an SVG element', () => {
      const { container } = render(<LovebirdIllustration />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('applies wiggle class when animated', () => {
      const { container } = render(<LovebirdIllustration animated />);
      expect(container.querySelector('.wiggle')).toBeInTheDocument();
    });

    it('does not apply wiggle class when not animated', () => {
      const { container } = render(<LovebirdIllustration animated={false} />);
      expect(container.querySelector('.wiggle')).not.toBeInTheDocument();
    });
  });

  describe('flying variant', () => {
    it('renders an SVG with wings', () => {
      const { container } = render(<LovebirdIllustration variant="flying" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      // Flying variant has more ellipses for wings
      const ellipses = svg?.querySelectorAll('ellipse');
      expect(ellipses!.length).toBeGreaterThanOrEqual(3);
    });

    it('applies float class when animated', () => {
      const { container } = render(<LovebirdIllustration variant="flying" animated />);
      expect(container.querySelector('.float')).toBeInTheDocument();
    });
  });

  describe('couple variant', () => {
    it('renders two birds and a heart', () => {
      const { container } = render(<LovebirdIllustration variant="couple" />);
      const svgs = container.querySelectorAll('svg');
      // 2 birds + 1 heart = 3 SVGs
      expect(svgs.length).toBe(3);
    });
  });

  describe('colors', () => {
    const colors: Array<'pepe-green' | 'violet-butter' | 'pepe-yellow' | 'yellowface-green' | 'pepe-lime' | 'white'> = [
      'pepe-green',
      'violet-butter',
      'pepe-yellow',
      'yellowface-green',
      'pepe-lime',
      'white',
    ];

    const expectedMainColors: Record<string, string> = {
      'pepe-green': '#7EC850',
      'violet-butter': '#D4B5E8',
      'pepe-yellow': '#FFE84D',
      'yellowface-green': '#8FD6A8',
      'pepe-lime': '#C4E86B',
      'white': '#FFFFFF',
    };

    colors.forEach((color) => {
      it(`renders ${color} with correct fill`, () => {
        const { container } = render(<LovebirdIllustration color={color} />);
        const svg = container.querySelector('svg');
        const body = svg?.querySelector('ellipse');
        expect(body?.getAttribute('fill')).toBe(expectedMainColors[color]);
      });
    });

    it('yellowface-green has yellow head', () => {
      const { container } = render(<LovebirdIllustration color="yellowface-green" />);
      const svg = container.querySelector('svg');
      const head = svg?.querySelector('circle');
      expect(head?.getAttribute('fill')).toBe('#FFE84D');
    });
  });

  describe('size', () => {
    it('accepts numeric size', () => {
      const { container } = render(<LovebirdIllustration size={80} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('accepts responsive size object', () => {
      const { container } = render(
        <LovebirdIllustration size={{ xs: 40, sm: 60, md: 80 }} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('flying variant colors', () => {
    it('yellowface-green flying has yellow head', () => {
      const { container } = render(
        <LovebirdIllustration variant="flying" color="yellowface-green" />
      );
      const svg = container.querySelector('svg');
      const head = svg?.querySelector('circle');
      expect(head?.getAttribute('fill')).toBe('#FFE84D');
    });
  });
});

import { scale, updateMetrics, width } from '../../src/theme';
import * as Theme from '../../src/theme';

describe('Metrics', () => {
  it('updates width live and keeps scale independent of rotation', () => {
    updateMetrics({ width: 402, height: 874 });
    const portraitScale = scale(100);
    expect(Theme.width).toBe(402);

    updateMetrics({ width: 874, height: 402 });
    expect(Theme.width).toBe(874);
    expect(scale(100)).toBe(portraitScale);
  });

  it('exposes width as a live binding through the theme barrel', () => {
    updateMetrics({ width: 500, height: 900 });
    expect(width).toBe(500);
  });
});

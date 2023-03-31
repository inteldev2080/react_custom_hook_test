import { act, renderHook, render, fireEvent } from '@testing-library/react';
import { ViewportProvider, useViewport } from './useViewport';
import MyComponent from '../components/MyComponent';

describe('useViewport', () => {
  it('provides the correct data to child components', () => {
    const { getByText } = render(
      <ViewportProvider>
        <MyComponent />
      </ViewportProvider>
    );

    expect(getByText('Window Width: 1024')).toBeInTheDocument();
  });

  it('returns the correct screen size', () => {
    const { result } = renderHook(() => useViewport(), {
      wrapper: ViewportProvider,
    });

    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });

  it('updates screen size on window resize', () => {
    const { result, rerender } = renderHook(() => useViewport(), {
      wrapper: ViewportProvider,
    });
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);

    act(() => {
      // Simulate window resize
      window.innerWidth = 800;
      window.innerHeight = 600;
      fireEvent(window, new Event('resize'));
    });
    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });
});

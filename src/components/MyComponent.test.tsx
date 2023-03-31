import { act, renderHook, render, fireEvent } from '@testing-library/react';
import { ViewportProvider, useViewport } from '../hooks/useViewport';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('Display the correct data', () => {
    const { getByText } = render(
      <ViewportProvider>
        <MyComponent />
      </ViewportProvider>
    );

    expect(getByText('Window Width: 1024')).toBeInTheDocument();
  });

  it('Switch theme', () => {
    const { getByText, container } = render(
      <ViewportProvider>
        <MyComponent />
      </ViewportProvider>
    );

    const rootEl = container.querySelector('#my-app')!;
    expect(rootEl.className).toContain('dark');

    fireEvent.click(getByText('Toggle Theme'));

    expect(rootEl.className).toContain('light');
  });
});

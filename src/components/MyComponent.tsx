import { FC } from 'react';
import { useViewport } from '../hooks/useViewport';
import '../styles/MyComponent.css';

const MyComponent: FC = () => {
  const { width, height, deviceType, theme, toggleTheme } = useViewport(); // Everything simplified to one line
  return (
    <div className={`App ${theme}`} id='my-app'>
      <h1>MyApp</h1>
      <div>
        <p>Window Width: {width}</p>
        <p>Window Height: {height}</p>
        <p>Device Type: {deviceType}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </div>
  );
};

export default MyComponent;

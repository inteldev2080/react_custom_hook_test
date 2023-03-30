import { FC } from 'react';
import { useViewport } from '../hooks/useViewport';
import logo from '../assets/logo.svg';
import '../styles/MyComponent.css';

const MyComponent: FC = () => {
  const { width, height, deviceType, theme, toggleTheme } = useViewport(); // Everything simplified to one line

  return (
    <div className={`App ${theme}`}>
      <header className='App-header'>
        <div>
          <p>Window Width: {width}</p>
          <p>Window Height: {height}</p>
          <p>Device Type: {deviceType}</p>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Let's start with me!
        </a>
      </header>
    </div>
  );
};

export default MyComponent;

import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getDeviceType } from '../utils';

interface IViewport {
  width: number;
  height: number;
  deviceType: string;
  theme: string;
  toggleTheme: () => void;
}

const ViewportContext = createContext<IViewport>({} as IViewport);

const UPDATE_PER_SECOND = 5;

interface ViewportProviderProps {
  children: React.ReactNode;
}

export const ViewportProvider: FC<ViewportProviderProps> = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [theme, setTheme] = useState('dark');
  const [deviceType, setDeviceType] = useState('');

  const toggleTheme = () => {
    if (theme == 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  let timeoutId: NodeJS.Timeout | null;

  const handleResize = () => {
    if (timeoutId) return;
    timeoutId = setTimeout(() => {
      timeoutId = null;
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 1000 / UPDATE_PER_SECOND);
  };

  useEffect(() => {
    setDeviceType(getDeviceType());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ViewportContext.Provider
      value={{ width, height, deviceType, theme, toggleTheme }}
    >
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = () => {
  return useContext<IViewport>(ViewportContext);
};

import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { getDeviceType, throttle } from '../utils';

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
  const deviceType = useMemo(getDeviceType, []);

  const toggleTheme = useCallback(() => {
    if (theme == 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [theme]);

  const handleResize = throttle(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, 1000 / UPDATE_PER_SECOND);

  useEffect(() => {
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

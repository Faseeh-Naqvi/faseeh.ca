import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteLogger() {
  const location = useLocation();
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[Route]', location.pathname);
  }, [location]);
  return null;
}

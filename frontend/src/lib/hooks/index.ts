  import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
  } from 'react';
  import 'dayjs/locale/en';
  import Cookies from 'js-cookie';
  
  export function useCheckIfIsAuthenticatedEffect(): [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const isTokenCookieSet = Boolean(Cookies.get('token'));
      setIsAuthenticated(isTokenCookieSet);
    }, []);
  
    return [isAuthenticated, setIsAuthenticated];
  }
  

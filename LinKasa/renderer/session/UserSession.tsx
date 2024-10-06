import { Router, useRouter } from 'next/router';
import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext(null);
  
export const getUserFromCookie = () => {
  const decodedCookies = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookies.split(';');
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf('user=') === 0) {
      const serializedUser = cookie.substring('user='.length, cookie.length);
      return JSON.parse(decodeURIComponent(serializedUser));
    }
  }
  return null;
};

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getUserFromCookie();
    console.log('Stored User:', storedUser);

    if (storedUser) {
      console.log('Setting user...');
      setUser(storedUser);
      console.log('User state after setting:', user);
    }
  }, []);
  
  

  const login = (uid : string, name : string , role : string) => {
    const userData = { uid, name, role };
    setUser(userData);
    setUserCookie(userData);
  };
  

  const logout = () => {
    router.push('/auth/Login')
    removeUserCookie();
    setUser(null);
  };

  const setUserCookie = (userData) => {
    document.cookie = `user=${encodeURIComponent(JSON.stringify(userData))}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/;`;
  };

 

  const removeUserCookie = () => {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

import { createContext, useContext } from 'react';
import useUsers from '../hooks/useUsers';

const UsersContext = createContext(null);

export function UsersProvider({ children }) {
  const value = useUsers();
  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export function useUsersContext() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsersContext must be used within a UsersProvider');
  }
  return context;
}

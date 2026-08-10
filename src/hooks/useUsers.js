import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/users';

let nextLocalId = 5000;

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Could not load the roster. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

 
  const addUser = useCallback(async (userData) => {
    const saved = await api.createUser(userData);
    const newUser = { ...userData, ...saved, id: nextLocalId++ };
    setUsers((prev) => [newUser, ...prev]);
    return newUser;
  }, []);

  
  const editUser = useCallback(async (id, userData) => {
    await api.updateUser(id, userData);
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...userData, id } : user))
    );
  }, []);

 
  const removeUser = useCallback(async (id) => {
    await api.deleteUser(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }, []);

  const getUser = useCallback((id) => users.find((u) => u.id === Number(id)), [users]);

  return { users, loading, error, loadUsers, addUser, editUser, removeUser, getUser };
}

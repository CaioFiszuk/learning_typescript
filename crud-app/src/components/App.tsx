import { useState, useEffect } from "react";
import { User } from '../interfaces/types';
import { api } from '../utils/api.ts';

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUsers();
  }, []);

  return (
    <>
     <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default App;

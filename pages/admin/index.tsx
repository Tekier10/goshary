import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";

type User = {
  id: string;
  jmeno: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Funkce pro načtení uživatelů zůstává stejná
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        if (!res.ok) throw new Error('Nepodařilo se načíst data');
        const data = await res.json();
        setUsers(data);
      } catch (error) { console.error(error); } 
      finally { setLoading(false); }
    };
    fetchUsers();
  }, []);

  // --- NOVÁ FUNKCE PRO ZMĚNU ROLE ---
  const handleRoleChange = async (userId: string, newRole: 'USER' | 'ADMIN') => {
    try {
      const res = await fetch('/api/admin/update-user-role', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Chyba při aktualizaci');
      }

      // Aktualizujeme stav lokálně pro okamžitou odezvu v UI
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      
    } catch (error) {
      alert(`Chyba: ${error.message}`);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Panel – Správa uživatelů</title>
      </Head>
      <div style={{ padding: '20px', maxWidth: '900px', margin: '40px auto' }}>
        <h1 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '20px' }}>
          Správa Uživatelů
        </h1>
        
        {loading ? (
          <p>Načítám uživatele...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Jméno</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.jmeno}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {/* --- ZMĚNA ROLE --- */}
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as 'USER' | 'ADMIN')}
                      // Zabráníme adminovi změnit si vlastní roli
                      disabled={user.id === session?.user?.id}
                      style={{ padding: '5px' }}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
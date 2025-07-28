import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState, FormEvent } from "react";

export default function ProfilPage() {
  const { data: session, status, update } = useSession();
  
  // Stavy pro formulář na změnu jména
  const [newName, setNewName] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [nameError, setNameError] = useState('');
  
  // Stavy pro formulář na změnu hesla
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  if (status === "loading") {
    return <p>Načítání...</p>;
  }

  const handleNameSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setNameMessage('');
    setNameError('');
    try {
      const res = await fetch('/api/user/update-name', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setNameMessage(data.message);
      await update({ name: data.user.name });
    } catch (err: any) {
      setNameError(err.message);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordMessage('');
    setPasswordError('');
    try {
      const res = await fetch('/api/user/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPasswordMessage(data.message);
      // Vyčistíme formulář po úspěchu
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setPasswordError(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Můj Profil – GoShary</title>
      </Head>
      <div style={{ padding: '20px', maxWidth: '700px', margin: '40px auto' }}>
        <h1 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '30px' }}>Můj Profil</h1>

        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '30px' }}>
          <p style={{ marginBottom: '10px' }}><strong>Jméno:</strong> {session?.user?.name}</p>
          <p><strong>Email:</strong> {session?.user?.email}</p>
        </div>
        
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.5em', marginBottom: '15px' }}>Změnit jméno</h2>
          <form onSubmit={handleNameSubmit}>
            <input id="newName" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '15px' }} />
            {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
            {nameMessage && <p style={{ color: 'green' }}>{nameMessage}</p>}
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>Uložit nové jméno</button>
          </form>
        </div>

        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.5em', marginBottom: '15px' }}>Změnit heslo</h2>
          <form onSubmit={handlePasswordSubmit}>
            <input id="currentPassword" type="password" placeholder="Současné heslo" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
            <input id="newPassword" type="password" placeholder="Nové heslo" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required style={{ width: '100%', padding: '8px', marginBottom: '15px' }} />
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            {passwordMessage && <p style={{ color: 'green' }}>{passwordMessage}</p>}
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>Uložit nové heslo</button>
          </form>
        </div>

        <div style={{marginTop: "20px"}}>
          <Link href="/" style={{color: "#0070f3"}}>Zpět na hlavní stránku</Link>
        </div>
      </div>
    </>
  );
}
import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function ZapomenuteHesloPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/auth/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Něco se pokazilo.');
      }
      
      setMessage(data.message);

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit}>
        <h2>Obnova zapomenutého hesla</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          Zadejte svůj e-mail a my vám pošleme odkaz pro nastavení nového hesla.
        </p>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
          Odeslat odkaz pro obnovu
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Vzpomněli jste si? <Link href="/prihlasit" style={{ color: '#0070f3' }}>Zpět na přihlášení</Link>
      </p>
    </div>
  );
}

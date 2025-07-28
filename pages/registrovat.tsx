import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function RegistrovatPage() {
  const [name, setName] = useState(''); // Změněno z 'jmeno'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('Heslo musí mít alespoň 6 znaků.');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Odesíláme 'name' místo 'jmeno'
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      setSuccess('Registrace proběhla úspěšně! Budete přesměrován na přihlášení.');
      setTimeout(() => {
        router.push('/prihlasit');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Něco se pokazilo.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit}>
        <h2>Registrace nového účtu</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Jméno</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
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

        {/* Pole pro heslo zůstává stejné */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Heslo</label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}
              aria-label={isPasswordVisible ? 'Skrýt heslo' : 'Zobrazit heslo'}
            >
              {isPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
          Zaregistrovat se
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Máte již účet? <Link href="/prihlasit" style={{ color: '#0070f3' }}>Přihlaste se</Link>
      </p>
    </div>
  );
}
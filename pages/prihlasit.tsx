import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function PrihlasitPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      
      {/* --- VRÁCENÉ TLAČÍTKO PRO PŘIHLÁŠENÍ PŘES GOOGLE --- */}
      <button
        onClick={() => signIn('google', { callbackUrl: '/' }, { prompt: "select_account" })}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#fff',
          color: '#444',
          border: '1px solid #ccc',
          borderRadius: '5px',
          marginBottom: '20px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        Přihlásit se přes Google
      </button>

      <div style={{ textAlign: 'center', marginBottom: '20px', color: '#888', fontWeight: 'bold' }}>
        NEBO
      </div>
      
      <form onSubmit={handleSubmit}>
        <h2 style={{textAlign: 'center', marginBottom: '15px'}}>Přihlášení e-mailem</h2>
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

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
          Přihlásit se
        </button>
      </form>
      <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/registrovat" style={{ color: '#0070f3' }}>
          Vytvořit účet
        </Link>
        <Link href="/zapomenute-heslo" style={{ color: '#0070f3' }}>
          Zapomenuté heslo?
        </Link>
      </div>
    </div>
  );
}
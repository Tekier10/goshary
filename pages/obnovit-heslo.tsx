import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // <-- Import ikonek

export default function ObnovitHesloPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // <-- Stav pro první heslo
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // <-- Stav pro druhé heslo
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Získání tokenu z URL (zůstává stejné)
  useEffect(() => {
    if (router.isReady) {
      const { token: urlToken } = router.query;
      if (urlToken && typeof urlToken === 'string') {
        setToken(urlToken);
      } else {
        setError('Chybí token pro obnovu hesla.');
      }
    }
  }, [router.isReady, router.query]);

  const handleSubmit = async (e: FormEvent) => {
    // ... handleSubmit logika zůstává stejná ...
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Hesla se neshodují.');
      return;
    }
    if (!token) {
      setError('Chybí token pro obnovu hesla.');
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      setSuccess('Heslo úspěšně změněno! Budete přesměrován na přihlášení.');
      setTimeout(() => {
        router.push('/prihlasit');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Něco se pokazilo.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit}>
        <h2>Nastavení nového hesla</h2>
        
        {/* --- POLE PRO NOVÉ HESLO --- */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Nové heslo</label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input id="password" type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
            <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }} aria-label="Zobrazit/skrýt heslo">
              {isPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>

        {/* --- POLE PRO POTVRZENÍ HESLA --- */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmPassword">Potvrďte nové heslo</label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input id="confirmPassword" type={isConfirmPasswordVisible ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
            <button type="button" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }} aria-label="Zobrazit/skrýt potvrzení hesla">
              {isConfirmPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit" disabled={!token || !!success} style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
          Změnit heslo
        </button>
      </form>
    </div>
  );
}
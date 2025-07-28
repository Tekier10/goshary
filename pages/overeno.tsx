import Head from 'next/head';
import Link from 'next/link';

export default function VerifiedPage() {
  return (
    <>
      <Head><title>E-mail ověřen</title></Head>
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1 style={{ fontSize: '2em', color: 'green' }}>E-mail úspěšně ověřen!</h1>
        <p>Nyní se můžete přihlásit ke svému účtu.</p>
        <Link href="/prihlasit" style={{ color: '#0070f3', marginTop: '20px', display: 'inline-block' }}>
          Přejít na přihlášení
        </Link>
      </div>
    </>
  );
}

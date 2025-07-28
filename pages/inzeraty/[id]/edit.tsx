import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
import { prisma } from '../../../lib/prisma';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Typ pro data inzerátu
type InzeratData = {
  id: string;
  titulek: string;
  popis: string;
  typ: string;
  lokalita: string;
  kontakt: string;
};

// 1. Načtení dat na serveru
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { id } = context.params as { id: string };

  const inzerat = await prisma.inzerat.findUnique({
    where: { id },
  });

  // Bezpečnostní kontrola: Uživatel musí být přihlášen a musí být autor (nebo admin)
  if (!session || (inzerat?.autorId !== session.user.id && session.user.role !== 'ADMIN')) {
    return {
      redirect: {
        destination: '/prihlasit', // Nebo na stránku s chybou "Přístup odepřen"
        permanent: false,
      },
    };
  }

  if (!inzerat) {
    return { notFound: true };
  }

  return { props: { inzerat: JSON.parse(JSON.stringify(inzerat)) } };
};

// 2. Komponenta s formulářem
export default function EditInzeratPage({ inzerat }: { inzerat: InzeratData }) {
  const [form, setForm] = useState(inzerat);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`/api/inzeraty/${inzerat.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Chyba při ukládání změn');
      }

      // Po úspěšné úpravě přesměrujeme na stránku "Moje inzeráty"
      router.push('/moje-inzeraty');

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Upravit inzerát – GoShary</title>
      </Head>
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <form onSubmit={handleSubmit}>
          <h1 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '20px' }}>Upravit inzerát</h1>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="titulek">Titulek</label>
            <input id="titulek" name="titulek" type="text" value={form.titulek} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="popis">Popis</label>
            <textarea id="popis" name="popis" value={form.popis} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '100px' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="typ">Kategorie</label>
            <select id="typ" name="typ" value={form.typ} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option>Stroje</option>
              <option>Prostory</option>
              <option>Služby</option>
              <option>Materiál</option>
              <option>Jiné</option>
            </select>
          </div>
          
          {/* ... další pole (lokalita, kontakt) ... */}

          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
            Uložit změny
          </button>
        </form>
      </div>
    </>
  );
}

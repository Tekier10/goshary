// pages/kontakt.tsx

export default function Kontakt() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Kontaktujte nás</h1>

      <p className="mb-4">
        Máte dotaz, zpětnou vazbu nebo nám chcete něco sdělit? Neváhejte nás kontaktovat.
      </p>

      <div className="mb-8">
        <p><strong>Email:</strong> <a href="mailto:info@goshary.cz" className="text-teal-500 underline">info@goshary.cz</a></p>
        <p><strong>Adresa:</strong> GoShary s.r.o., [DOPLŇ ADRESU]</p>
        <p><strong>IČO:</strong> [DOPLŇ]</p>
      </div>

      <form className="bg-gray-50 p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Vaše jméno</label>
          <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Jméno a příjmení" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">E-mail</label>
          <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="vase@email.cz" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Zpráva</label>
          <textarea className="w-full border border-gray-300 rounded px-3 py-2" rows={5} placeholder="Vaše zpráva..."></textarea>
        </div>
        <button
          type="submit"
          disabled
          className="bg-gray-300 text-white px-4 py-2 rounded cursor-not-allowed"
          title="Zatím bez backendu"
        >
          Odeslat (zatím nefunkční)
        </button>
      </form>
    </main>
  );
}

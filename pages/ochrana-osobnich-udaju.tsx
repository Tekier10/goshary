// pages/ochrana-osobnich-udaju.tsx

export default function OchranaUdaju() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Ochrana osobních údajů</h1>
      <p className="mb-4">
        Vaše soukromí je pro nás důležité. Tento dokument vysvětluje, jaké osobní údaje zpracováváme, proč a jak s nimi nakládáme.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Správce osobních údajů</h2>
      <p className="mb-4">
        GoShary s.r.o.  
        <br />
        [Adresa, IČO – doplňte]  
        <br />
        E-mail: info@goshary.cz
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Jaké údaje zpracováváme</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Jméno a příjmení</li>
        <li>E-mailová adresa</li>
        <li>Telefonní číslo</li>
        <li>IP adresa, cookies, analytická data</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Účel a právní základ</h2>
      <p className="mb-4">
        Údaje zpracováváme pro provoz služby, komunikaci se zákazníky, účetní povinnosti a zajištění bezpečnosti. Zpracování vychází z plnění smlouvy, zákonných povinností, oprávněného zájmu nebo vašeho souhlasu.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Doba uchování</h2>
      <p className="mb-4">
        Vaše údaje uchováváme po dobu nezbytně nutnou k naplnění výše uvedených účelů nebo dle zákonných požadavků.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Vaše práva</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Právo na přístup, opravu a výmaz</li>
        <li>Právo na omezení zpracování</li>
        <li>Právo vznést námitku</li>
        <li>Právo na přenositelnost údajů</li>
        <li>Právo podat stížnost u ÚOOÚ (www.uoou.cz)</li>
      </ul>

      <p className="mt-8">V případě dotazů nás kontaktujte na <strong>info@goshary.cz</strong>.</p>
    </main>
  );
}

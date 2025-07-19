// pages/obchodni-podminky.tsx

export default function ObchodniPodminky() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Obchodní podmínky</h1>

      <p className="mb-4">
        Tyto obchodní podmínky upravují podmínky používání webové platformy GoShary.cz,
        provozované společností GoShary s.r.o., IČO: [DOPLŇ], se sídlem [DOPLŇ].
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Úvodní ustanovení</h2>
      <p className="mb-4">
        Používáním platformy GoShary.cz uživatel souhlasí s těmito podmínkami. Tyto podmínky jsou
        závazné pro všechny uživatele webu.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Definice</h2>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>Uživatel:</strong> každá osoba, která navštíví nebo používá GoShary.cz.</li>
        <li><strong>Poskytovatel:</strong> Uživatel, který nabídne sdílení věci, služby či prostoru.</li>
        <li><strong>Zájemce:</strong> Uživatel, který má zájem o nabídku sdílení.</li>
        <li><strong>Platforma:</strong> Webová aplikace GoShary.cz umožňující propojení uživatelů.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Povaha služby</h2>
      <p className="mb-4">
        GoShary.cz je zprostředkovatelská platforma. Neodpovídáme za obsah nabídek ani za jednání mezi
        uživateli. Vztah vzniká přímo mezi poskytovatelem a zájemcem.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Registrace a účet</h2>
      <p className="mb-4">
        Některé funkce mohou vyžadovat registraci. Uživatel je povinen uvádět pravdivé údaje a je odpovědný
        za bezpečnost svého účtu.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Nabídky a poptávky</h2>
      <p className="mb-4">
        GoShary si vyhrazuje právo upravit nebo odstranit nabídky, které jsou nevhodné, nepravdivé
        nebo porušují zákon či dobré mravy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Odpovědnost</h2>
      <p className="mb-4">
        GoShary nenese odpovědnost za škodu způsobenou uživateli jiným uživatelem. Nezaručujeme
        dostupnost platformy 24/7.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Ochrana osobních údajů</h2>
      <p className="mb-4">
        Zásady ochrany osobních údajů jsou uvedeny na stránce{' '}
        <a href="/ochrana-osobnich-udaju" className="text-teal-500 underline">Ochrana osobních údajů</a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Duševní vlastnictví</h2>
      <p className="mb-4">
        Obsah platformy je chráněn autorským právem. Je zakázáno jej kopírovat či šířit bez
        souhlasu provozovatele.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Změny podmínek</h2>
      <p className="mb-4">
        GoShary si vyhrazuje právo tyto podmínky kdykoli změnit. Uživatel bude o změnách informován
        na platformě.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. Závěrečná ustanovení</h2>
      <p className="mb-4">
        Tyto podmínky se řídí právem České republiky a jsou účinné od [DOPLŇ DATUM].
      </p>
    </main>
  );
}

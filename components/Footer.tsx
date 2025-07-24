// components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <p>&copy; {new Date().getFullYear()} GoShary. Všechna práva vyhrazena.</p>
        <div className="flex space-x-4">
          <a href="/ochrana-osobnich-udaju" className="hover:text-white transition">Ochrana údajů</a>
          <a href="/obchodni-podminky" className="hover:text-white transition">Obchodní podmínky</a>
          <a href="/kontakt" className="hover:text-white transition">Kontakt</a>
        </div>
      </div>
    </footer>
  );
}

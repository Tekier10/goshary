// components/Footer.tsx – patička GoShary

export default function Footer() { return ( <footer className="mt-16 border-t pt-6 pb-8 text-center text-sm text-gray-500"> <p>© {new Date().getFullYear()} GoShary.cz – sdílej, co máš navíc</p> <nav className="mt-2 flex justify-center gap-4 text-xs"> <a href="/ochrana-osobnich-udaju" className="hover:underline"> Ochrana údajů </a> <a href="/obchodni-podminky" className="hover:underline"> Podmínky použití </a> <a href="mailto:kontakt@goshary.cz" className="hover:underline"> kontakt@goshary.cz </a> </nav> </footer> ); }

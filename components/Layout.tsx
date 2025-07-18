// components/Layout.tsx – základní rozvržení stránky (Header + Footer)

import { ReactNode } from 'react'; import Header from './Header'; import Footer from './Footer';

interface LayoutProps { children: ReactNode; }

export default function Layout({ children }: LayoutProps) { return ( <div className="flex min-h-screen flex-col bg-white text-gray-800"> <Header /> <main className="flex-1 px-6 py-8">{children}</main>
  
<main className="flex-1 px-6 py-8">
  {children}
  <div className="mt-12 flex justify-center">
    <MascotShary />
  </div>
</main>
  
<Footer /> </div> ); }


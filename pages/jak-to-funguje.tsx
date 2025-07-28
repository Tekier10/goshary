
// pages/jak-to-funguje.tsx

import Image from 'next/image';
import { motion } from 'framer-motion';
import SharyBubble from '../components/SharyBubble';

const scrollVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function JakToFunguje() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800 space-y-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Jak to funguje</h1>

      {/* 🔁 Sdílení */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollVariant}
        className="flex items-start gap-6"
      >
        <Image src="/icons/sharing.svg" alt="Sdílení" width={48} height={48} />
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold">Sdílení místo plýtvání</h2>
          <p>
            GoShary propojuje firmy, které mají <strong>volné kapacity</strong>, s těmi, které je potřebují.
          </p>
          <SharyBubble text="Proč něco kupovat nebo pronajímat draze, když si to můžete sdílet?" />
        </div>
      </motion.section>

      {/* 📩 Poptávka */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollVariant}
        className="flex items-start gap-6"
      >
        <Image src="/icons/request.svg" alt="Poptávka" width={48} height={48} />
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold">Jak zadat poptávku</h2>
          <ol className="list-decimal ml-6 space-y-1">
            <li>Vyber typ, popiš situaci a kontaktuj nás</li>
            <li>My tě spojíme s nabízejícími firmami</li>
          </ol>
          <SharyBubble text="Neboj se zeptat – poptávky jsou anonymní a nezávazné." />
        </div>
      </motion.section>

      {/* 📦 Nabídka */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollVariant}
        className="flex items-start gap-6"
      >
        <Image src="/icons/offer.svg" alt="Nabídka" width={48} height={48} />
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold">Jak nabídnout kapacity</h2>
          <ol className="list-decimal ml-6 space-y-1">
            <li>Popiš, co můžeš sdílet</li>
            <li>Čekej na poptávky a kontakt</li>
          </ol>
          <SharyBubble text="Nenech stát nákladově mrtvé vybavení – může pomoci jiným." />
        </div>
      </motion.section>

      {/* 🤖 Shary */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollVariant}
        className="flex items-start gap-6"
      >
        <Image src="/icons/shary.svg" alt="Shary" width={48} height={48} />
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold">Pomáhá ti Shary</h2>
          <p>
            Na stránkách tě provází náš maskot Shary. Ukáže ti cestu a poradí v každém kroku sdílení.
          </p>
          <SharyBubble text="Já jsem Shary! A tohle celé je můj svět sdílení 💡" />
        </div>
      </motion.section>

      {/* 📞 Kontakt */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollVariant}
        className="flex items-start gap-6"
      >
        <Image src="/icons/help.svg" alt="Kontakt" width={48} height={48} />
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold">Potřebuješ poradit?</h2>
          <p>
            Napiš na{' '}
            <a href="mailto:info@goshary.cz" className="text-teal-600 underline">info@goshary.cz</a>{' '}
            nebo navštiv stránku Kontakt.
          </p>
          <SharyBubble text="Jsme tu pro tebe. Stačí napsat nebo kliknout na Kontakt." />
        </div>
      </motion.section>
    </main>
  );
}

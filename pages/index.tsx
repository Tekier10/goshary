// pages/index.tsx – příběhová homepage s průvodcem Shary

import Head from 'next/head';
import StorySection from '../components/StorySection';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>GoShary – Sdílej co máš navíc</title>
        <meta name="description" content="Platforma pro sdílení firemních kapacit" />
      </Head>

      <section className="relative flex flex-col items-center text-center px-4 py-12 sm:py-20">
       // <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-primary">GoShary</h1>
        <p className="mt-4 max-w-xl text-gray-600 text-lg">
          Tady začíná nová éra sdíleného byznysu. Neplýtvej kapacitami – sdílej je.
        </p>
      </section>

      <section className="pb-16">
        <StorySection
          emoji="🏭"
          title="Sdílej volné stroje"
          text="Máš CNC, které jede jen pár dní v týdnu? Nabídni volnou kapacitu jiným firmám."
          speech="Tahle fréza si zaslouží víc práce!"
        />
        <StorySection
          emoji="📦"
          title="Využij prostory naplno"
          text="Nevyužitý sklad, kancelář nebo hala může jiným pomoct – a tobě přinést příjem."
          speech="Tady by se vešly palety i příležitosti!"
        />
        <StorySection
          emoji="🧠"
          title="Zpřístupni know-how"
          text="Tvůj tým má dovednosti, které jiní potřebují. Nabídni školení, mentoring nebo konzultace."
          speech="Sdílené know-how = rychlejší růst"
        />
        <StorySection
          emoji="👨‍💻"
          title="Sdílej lidi nebo software"
          text="Máte specialisty, kteří mají chvíli volna? Nebo vlastní nástroje, které by využil i někdo jiný?"
          speech="Připojme se chytře – i v software!"
        />
      </section>
    </>
  );
}

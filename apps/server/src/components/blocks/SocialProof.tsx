interface SocialProofContent {
  title?: string;
  logos?: Array<{ url: string; alt: string }>;
}

interface SocialProofProps {
  content: SocialProofContent;
}

export const SocialProof = (props: SocialProofProps) => {
  const { title = "Trusted by industry leaders", logos = [] } = props.content;

  const defaultLogos = [1, 2, 3, 4, 5].map((i) => ({
    url: `https://picsum.photos/seed/logo${i}/120/40`,
    alt: `Logo ${i}`,
  }));

  const displayLogos = logos.length > 0 ? logos : defaultLogos;

  return (
    <section class="bg-gray-50 dark:bg-gray-800 py-12 px-4">
      <div class="max-w-screen-xl mx-auto">
        <p class="text-center text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-8">
          {title}
        </p>
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {displayLogos.map((logo, i) => (
            <img
              key={i}
              src={logo.url}
              alt={logo.alt}
              class="h-8 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

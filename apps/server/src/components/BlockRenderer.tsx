import { Hero } from "./blocks/Hero";
import { Features } from "./blocks/Features";
import { CTA } from "./blocks/CTA";
import { Newsletter } from "./blocks/Newsletter";
import { Text } from "./blocks/Text";
import { Footer } from "./blocks/Footer";
import { Header } from "./blocks/Header";
import { Image } from "./blocks/Image";
import { Spacer } from "./blocks/Spacer";
import { SocialProof } from "./blocks/SocialProof";
import { Pricing } from "./blocks/Pricing";
import { FAQ } from "./blocks/FAQ";
import { Testimonials } from "./blocks/Testimonials";
import { Video } from "./blocks/Video";
import { Gallery } from "./blocks/Gallery";
import { Team } from "./blocks/Team";
import { Stats } from "./blocks/Stats";

const COMPONENTS: Record<string, any> = {
  hero: Hero,
  features: Features,
  cta: CTA,
  newsletter: Newsletter,
  text: Text,
  footer: Footer,
  header: Header,
  image: Image,
  spacer: Spacer,
  "social-proof": SocialProof,
  pricing: Pricing,
  faq: FAQ,
  testimonials: Testimonials,
  video: Video,
  gallery: Gallery,
  team: Team,
  stats: Stats,
};

interface BlockRendererProps {
  blocks: any[];
}

export const BlockRenderer = (props: BlockRendererProps) => {
  const { blocks = [] } = props;

  return (
    <>
      {blocks.map((block) => {
        const Component = COMPONENTS[block.type];
        if (!Component) return null;

        const content = typeof block.content === "string" ? JSON.parse(block.content) : block.content;
        return <Component content={content} />;
      })}
    </>
  );
};

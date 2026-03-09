export { BaseBlock } from './base-block';

export { HeroBlock } from './hero-block';
export { TextBlock } from './text-block';
export { ImageBlock } from './image-block';
export { SpacerBlock } from './spacer-block';
export { FeaturesBlock } from './features-block';
export { CtaBlock } from './cta-block';
export { NewsletterBlock } from './newsletter-block';
export { SocialProofBlock } from './social-proof-block';
export { HeaderBlock } from './header-block';
export { FooterBlock } from './footer-block';
export { PricingBlock } from './pricing-block';
export { FaqBlock } from './faq-block';
export { TestimonialsBlock } from './testimonials-block';
export { VideoBlock } from './video-block';
export { GalleryBlock } from './gallery-block';
export { TeamBlock } from './team-block';
export { StatsBlock } from './stats-block';

import { HeroBlock } from './hero-block';
import { TextBlock } from './text-block';
import { ImageBlock } from './image-block';
import { SpacerBlock } from './spacer-block';
import { FeaturesBlock } from './features-block';
import { CtaBlock } from './cta-block';
import { NewsletterBlock } from './newsletter-block';
import { SocialProofBlock } from './social-proof-block';
import { HeaderBlock } from './header-block';
import { FooterBlock } from './footer-block';
import { PricingBlock } from './pricing-block';
import { FaqBlock } from './faq-block';
import { TestimonialsBlock } from './testimonials-block';
import { VideoBlock } from './video-block';
import { GalleryBlock } from './gallery-block';
import { TeamBlock } from './team-block';
import { StatsBlock } from './stats-block';

export const BLOCK_COMPONENTS = {
  hero: HeroBlock,
  text: TextBlock,
  image: ImageBlock,
  spacer: SpacerBlock,
  features: FeaturesBlock,
  cta: CtaBlock,
  newsletter: NewsletterBlock,
  'social-proof': SocialProofBlock,
  header: HeaderBlock,
  footer: FooterBlock,
  pricing: PricingBlock,
  faq: FaqBlock,
  testimonials: TestimonialsBlock,
  video: VideoBlock,
  gallery: GalleryBlock,
  team: TeamBlock,
  stats: StatsBlock,
} as const;

export type BlockType = keyof typeof BLOCK_COMPONENTS;

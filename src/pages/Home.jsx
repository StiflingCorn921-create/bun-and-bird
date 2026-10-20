import { siteContent } from '../data/siteContent';

export default function Home() {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto w-full">
      <h1 className="text-4xl font-black text-ketchup">{siteContent.home.heroTitle}</h1>
      <p className="mt-4 text-lg text-charcoal-muted">{siteContent.home.heroSubtitle}</p>
    </div>
  );
}

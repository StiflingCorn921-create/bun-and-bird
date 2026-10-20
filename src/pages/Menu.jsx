import { siteContent } from '../data/siteContent';

export default function Menu() {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto w-full">
      <h1 className="text-4xl font-black text-ketchup">{siteContent.menu.title}</h1>
      <p className="mt-4 text-lg text-charcoal-muted">{siteContent.menu.subtitle}</p>
    </div>
  );
}

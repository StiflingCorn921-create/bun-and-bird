import { Link } from 'react-router-dom';
import { siteContent } from '../data/siteContent';
import { combos, allMenuItems } from '../data';
import { MenuCard } from '../components/MenuCard';
import { SectionHeading } from '../components/SectionHeading';
import { Badge } from '../components/Badge';

export default function Home() {
  // Best seller items
  const bestSellers = allMenuItems
    .filter((item) => Array.isArray(item.tags) && item.tags.includes('best seller'))
    .slice(0, 4);

  // Featured combos
  const featuredCombos = combos.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-100/70 to-cream border-b border-charcoal/10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-block">
                <Badge variant="mustard">{siteContent.home.heroBadge}</Badge>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-charcoal tracking-tight leading-tight">
                {siteContent.home.heroTitle}
              </h1>

              <p className="text-base sm:text-xl text-charcoal-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {siteContent.home.heroSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-lg bg-ketchup text-cream hover:bg-ketchup-hover shadow-lg hover:shadow-xl transition-all active:scale-95 text-center"
                >
                  {siteContent.home.ctaOrder}
                </Link>
                <Link
                  to="/menu"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-lg bg-mustard text-charcoal hover:bg-mustard-hover shadow-md hover:shadow-lg transition-all active:scale-95 text-center"
                >
                  {siteContent.home.ctaCombos}
                </Link>
              </div>
            </div>

            {/* Right Hero Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl bg-amber-200/50 border-4 border-mustard/40 flex items-center justify-center shadow-2xl p-6 select-none">
                <div className="text-center space-y-4">
                  <div className="text-8xl sm:text-9xl animate-bounce">
                    {siteContent.brand.logoEmoji}
                  </div>
                  <div className="inline-block bg-charcoal text-cream text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    {siteContent.brand.tagline}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <SectionHeading
            badge={siteContent.home.featuredBadge}
            title={siteContent.home.featuredTitle}
            subtitle={siteContent.home.featuredSubtitle}
          />
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 font-black text-ketchup hover:text-ketchup-hover text-base group self-start md:self-auto"
          >
            <span>{siteContent.home.viewAllDeals}</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Deals & Combos Section */}
      <section className="bg-amber-100/50 border-y border-charcoal/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            centered
            badge={siteContent.home.dealsBadge}
            title={siteContent.home.dealsTitle}
            subtitle={siteContent.home.dealsSubtitle}
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCombos.map((combo) => (
              <MenuCard key={combo.id} item={combo} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          centered
          badge={siteContent.home.whyUsBadge}
          title={siteContent.home.whyUsTitle}
          subtitle={siteContent.home.whyUsSubtitle}
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteContent.home.features.map((feature) => (
            <div
              key={feature.title}
              className="bg-cream-light border-2 border-charcoal/10 rounded-2xl p-6 text-center space-y-3 hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl select-none">{feature.emoji}</div>
              <h3 className="text-lg font-black text-charcoal">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { siteContent } from '../data/siteContent';
import { branches } from '../data';
import { SectionHeading } from '../components/SectionHeading';

export default function Branches() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 w-full">
      <SectionHeading
        badge={siteContent.branches.eyebrow}
        title={siteContent.branches.title}
        subtitle={siteContent.branches.subtitle}
      />

      {/* Horizontal Scrolling Carousel */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth">
        {branches.map((branch, index) => (
          <div
            key={branch.id}
            className="w-[300px] sm:w-[360px] shrink-0 snap-start bg-cream-light border-2 border-charcoal/20 rounded-2xl p-6 flex flex-col justify-between hover:border-ketchup/40 hover:shadow-xl transition-all"
          >
            {/* Branch Details */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-widest text-mustard block">
                  {siteContent.branches.locationPrefix}
                  {index + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-charcoal">
                  {branch.name}
                </h3>
              </div>

              {/* Address */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal block">
                  {siteContent.branches.addressLabel}
                </span>
                <p className="text-sm text-charcoal-muted leading-relaxed">
                  {branch.address}
                </p>
              </div>

              {/* Hours */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal block">
                  {siteContent.branches.hoursLabel}
                </span>
                <p className="text-sm text-charcoal-muted">
                  {branch.hours}
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal block">
                  {siteContent.branches.phoneLabel}
                </span>
                <p className="text-sm font-semibold text-charcoal">
                  {branch.phone}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-charcoal/10">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl font-bold bg-mustard hover:bg-mustard-hover text-charcoal transition-colors shadow-xs"
              >
                {siteContent.branches.orderFromBranchBtn}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Hint */}
      <p className="text-xs font-semibold text-charcoal-muted text-center">
        {siteContent.branches.carouselHint}
      </p>
    </div>
  );
}

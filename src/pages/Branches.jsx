import { Link } from 'react-router-dom';
import { siteContent } from '../data/siteContent';
import { branches } from '../data';
import { SectionHeading } from '../components/SectionHeading';
import { Badge } from '../components/Badge';

export default function Branches() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <SectionHeading
        centered
        title={siteContent.branches.title}
        subtitle={siteContent.branches.subtitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="bg-cream-light border-2 border-charcoal/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-ketchup/30 hover:shadow-xl transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-black text-charcoal">
                  {branch.name}
                </h3>
                <Badge variant="mustard">
                  {siteContent.branches.openBadge}
                </Badge>
              </div>

              {/* Address */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                  {siteContent.branches.addressLabel}
                </span>
                <p className="text-sm sm:text-base text-charcoal leading-relaxed">
                  {branch.address}
                </p>
              </div>

              {/* Hours */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                  {siteContent.branches.hoursLabel}
                </span>
                <p className="text-sm sm:text-base font-semibold text-charcoal">
                  {branch.hours}
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                  {siteContent.branches.phoneLabel}
                </span>
                <p className="text-sm sm:text-base font-bold text-ketchup">
                  {branch.phone}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-charcoal/10">
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
    </div>
  );
}

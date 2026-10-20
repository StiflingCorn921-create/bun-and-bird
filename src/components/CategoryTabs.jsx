import { siteContent } from '../data/siteContent';

export function CategoryTabs({ categories = [], selectedCategory = 'all', onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none select-none">
      <button
        type="button"
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2.5 rounded-xl font-black text-sm whitespace-nowrap transition-all cursor-pointer ${
          selectedCategory === 'all'
            ? 'bg-ketchup text-cream shadow-md scale-105'
            : 'bg-cream-light text-charcoal border border-charcoal/10 hover:border-ketchup/30 hover:bg-mustard/20'
        }`}
      >
        {siteContent.menu.allCategoriesLabel}
      </button>

      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2.5 rounded-xl font-black text-sm whitespace-nowrap transition-all cursor-pointer ${
              isSelected
                ? 'bg-ketchup text-cream shadow-md scale-105'
                : 'bg-cream-light text-charcoal border border-charcoal/10 hover:border-ketchup/30 hover:bg-mustard/20'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

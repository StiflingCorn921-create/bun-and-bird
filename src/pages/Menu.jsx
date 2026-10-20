import { useState, useMemo } from 'react';
import { siteContent } from '../data/siteContent';
import { categories, allMenuItems } from '../data';
import { MenuCard } from '../components/MenuCard';
import { CategoryTabs } from '../components/CategoryTabs';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';
import { SectionHeading } from '../components/SectionHeading';

const TAG_OPTIONS = ['all', 'best seller', 'spicy', 'new', 'vegetarian-friendly'];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return allMenuItems.filter((item) => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
        return false;
      }

      // 2. Search Query (uses MenuItem.matches method!)
      if (searchQuery.trim() && !item.matches(searchQuery)) {
        return false;
      }

      // 3. Tag Filter
      if (selectedTag !== 'all') {
        if (!Array.isArray(item.tags) || !item.tags.includes(selectedTag)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'priceAsc') {
        return a.price - b.price;
      }
      if (sortOption === 'priceDesc') {
        return b.price - a.price;
      }
      if (sortOption === 'nameAsc') {
        return a.name.localeCompare(b.name);
      }
      return 0; // default featured order
    });
  }, [selectedCategory, searchQuery, selectedTag, sortOption]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedTag('all');
    setSortOption('default');
  };

  const resultsCountText =
    filteredItems.length === 1
      ? siteContent.menu.resultsCountSingle
      : siteContent.menu.resultsCountPlural.replace('{count}', filteredItems.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Page Title */}
      <SectionHeading
        title={siteContent.menu.title}
        subtitle={siteContent.menu.subtitle}
      />

      {/* Search and Sort Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Bar */}
        <div className="md:col-span-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />
        </div>

        {/* Sort Select */}
        <div className="md:col-span-4 flex items-center justify-end gap-2">
          <label htmlFor="menu-sort" className="text-xs sm:text-sm font-bold text-charcoal-muted whitespace-nowrap">
            {siteContent.menu.sortLabel}
          </label>
          <select
            id="menu-sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full md:w-auto px-4 py-3 rounded-2xl bg-cream-light border-2 border-charcoal/10 font-bold text-sm text-charcoal focus:border-ketchup focus:outline-none focus:ring-2 focus:ring-ketchup/20 cursor-pointer"
          >
            <option value="default">{siteContent.menu.sortOptions.default}</option>
            <option value="priceAsc">{siteContent.menu.sortOptions.priceAsc}</option>
            <option value="priceDesc">{siteContent.menu.sortOptions.priceDesc}</option>
            <option value="nameAsc">{siteContent.menu.sortOptions.nameAsc}</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-y border-charcoal/10 py-3">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Tag Filter Chips & Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        {/* Tag chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {TAG_OPTIONS.map((tag) => {
            const isSelected = selectedTag === tag;
            const label = siteContent.menu.tagLabels[tag] || tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-mustard text-charcoal shadow-xs scale-105'
                    : 'bg-cream-light text-charcoal/70 border border-charcoal/10 hover:border-charcoal/30'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <span className="text-xs sm:text-sm font-semibold text-charcoal-muted">
          {resultsCountText}
        </span>
      </div>

      {/* Menu Grid or Empty State */}
      {filteredItems.length === 0 ? (
        <EmptyState
          emoji="🍔"
          title={siteContent.menu.emptyTitle}
          subtitle={siteContent.menu.emptySubtitle}
          actionLabel={siteContent.menu.resetFiltersBtn}
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

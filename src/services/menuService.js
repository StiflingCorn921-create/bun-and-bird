export class MenuService {
  searchAndFilter({
    items = [],
    query = '',
    categoryId = 'all',
    activeTag = null,
    sortBy = 'featured',
  }) {
    let result = [...items];

    if (categoryId && categoryId !== 'all') {
      result = result.filter((item) => item.categoryId === categoryId);
    }

    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(q);
        const descMatch = item.description?.toLowerCase().includes(q);
        const tagMatch =
          Array.isArray(item.tags) && item.tags.some((t) => t.toLowerCase().includes(q));
        return nameMatch || descMatch || tagMatch;
      });
    }

    if (activeTag) {
      result = result.filter(
        (item) => Array.isArray(item.tags) && item.tags.includes(activeTag)
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'alpha-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }
}

export const menuService = new MenuService();

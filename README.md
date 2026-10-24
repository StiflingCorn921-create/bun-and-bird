# Bun & Bird 🍔🍗

**Bun & Bird** is a modern, responsive, front-end only fast food ordering web application designed for a premium burger and fried chicken dining experience. Built for a Midterm Practical Exam, the application strictly adheres to clean OOP principles, reactive immutable state management, and semantic Tailwind CSS styling.

---

## 🌟 Features

- **Multi-Page Routing (React Router v7):**
  - **Home (`/`):** Dynamic hero with call-to-action buttons, best-seller featured items, combo deals and bundles section, and "Why Foodies Crave Bun & Bird" feature strip.
  - **Menu (`/menu`):** Interactive category filter tabs (Burgers, Chicken, Combos, Sides, Drinks, Desserts, and All Items), real-time search with case-insensitive `MenuItem.matches()`, tag filter chips (Best Seller, Spicy, New, Veggie), sorting (Featured, Price Low-to-High, Price High-to-Low, Alphabetical), live results count, and empty-state handling.
  - **Item Details (`/menu/:id`):** Large emoji hero tile, item details, dynamic add-on checkboxes that calculate prices in real time, quantity selector, add-to-cart action with instant feedback, combo package savings breakdown for `Combo` instances, and custom not-found state for bad IDs.
  - **Cart & Checkout (`/cart`):** Full cart line items with add-ons summary, quantity adjustments, item removal, promo code engine with validation feedback (`BUNBIRD10`, `SAVE50`, `FREESHIP`), store pickup vs. doorstep delivery toggle (updating delivery fees dynamically), branch fulfillment selector, customer contact & delivery address validation, and instant order placement with a live 3-step order tracker (`Preparing` → `Ready` → `Completed`) simulation.
  - **Branches (`/branches`):** Responsive grid of fictional Bun & Bird Metro Manila locations showing operating hours, phone numbers, complete addresses, and order shortcuts.
  - **404 Not Found (`*`):** Fast-food themed fallback page with direct navigation back to home and menu.

- **Strict Separation of Concerns & Architecture:**
  - **No Hardcoded UI Text:** Every visible string (headings, paragraphs, buttons, placeholders, form labels, errors, aria attributes, currency symbols) is stored in `src/data/siteContent.js`.
  - **Real ES6 Object-Oriented Models:** Implements `Category`, `MenuItem`, `Combo` (extends `MenuItem`), `AddOn`, `CartItem`, `Cart`, `Promo`, `Branch`, and `Order` in `src/models/`.
  - **State Management:** React Context (`CartContext`) utilizing immutable Cart operations.
  - **Pure Tailwind CSS v4:** Styled using utility classes and `@theme` palette (`#d62828` ketchup, `#f7b32b` mustard, `#fff4e0` cream, `#1f1b16` charcoal) defined in `src/index.css`. No external UI libraries or icon packages.
  - **Responsive & Accessible:** Mobile-first layout tested across 375px, 768px, and 1280px viewport widths with visible focus rings and zero horizontal overflow.

---

## 📁 Folder Structure

```
bun-and-bird/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── CartContext.jsx
    ├── models/
    │   ├── index.js
    │   ├── Category.js
    │   ├── MenuItem.js
    │   ├── Combo.js
    │   ├── AddOn.js
    │   ├── CartItem.js
    │   ├── Cart.js
    │   ├── Promo.js
    │   ├── Branch.js
    │   └── Order.js
    ├── data/
    │   ├── index.js
    │   ├── categories.js
    │   ├── addOns.js
    │   ├── menuItems.js
    │   ├── combos.js
    │   ├── promos.js
    │   ├── branches.js
    │   └── siteContent.js
    ├── components/
    │   ├── Layout.jsx
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── Button.jsx
    │   ├── Badge.jsx
    │   ├── MenuCard.jsx
    │   ├── CategoryTabs.jsx
    │   ├── SearchBar.jsx
    │   ├── QuantitySelector.jsx
    │   ├── SectionHeading.jsx
    │   └── EmptyState.jsx
    └── pages/
        ├── Home.jsx
        ├── Menu.jsx
        ├── ItemDetails.jsx
        ├── CartPage.jsx
        ├── Branches.jsx
        └── NotFound.jsx
```

---

## 🚀 Installation & Running

### Prerequisites
- Node.js (v18 or higher recommended; developed and tested on Node v26)
- npm (v9+)

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Open your browser at the displayed local URL (usually `http://localhost:5173/`).

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🏷️ Test Promo Codes
During checkout on the `/cart` page, test any of the following voucher codes:
- `BUNBIRD10` — 10% discount on food subtotal
- `SAVE50` — ₱50 fixed discount
- `FREESHIP` — Free delivery on doorstep orders


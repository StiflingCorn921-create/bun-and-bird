# Bun & Bird - Fast Food Ordering Web Application

A front-end fast food ordering web application developed for a Midterm Practical Exam. The application simulates a real-world digital ordering platform for **Bun & Bird**, a burger and fried chicken concept with locations across Metro Manila and Metro Cebu.

---

## Tech Stack

- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4 (single unified stylesheet in `src/index.css`)
- **State & Storage:** React Context API + LocalStorage persistence

---

## Architecture & Code Organization

The project follows a clean separation between data models, business services, and UI components:

```
src/
├── models/         # Pure data models (MenuItem, Combo, CartItem, Cart, Order, Branch, User)
├── services/       # Business logic layer (cartService, orderService, authService, menuService)
├── context/        # Global state providers (CartContext with auto-save, AuthContext)
├── data/           # Application data sources, menu items, branches, and UI copy
├── components/     # Reusable UI components (FoodImage, Header, Footer, MenuCard, etc.)
└── pages/          # Application views (Home, Menu, ItemDetails, CartPage, Branches, NotFound)
```

### Models vs. Services
- **Models (`src/models/`):** Pure entity classes containing constructors, properties, and basic computed getters.
- **Services (`src/services/`):** Centralized business operations including cart calculations, promo code validation, localStorage read/write persistence, delivery service area coverage checks, and order generation.

---

## Core Features

1. **Menu Catalog (10 Core Items):**
   - 8 individual items (Burgers, Fried Chicken, Wings, Loaded Fries) and 2 value combos.
   - Designed for image assets in `public/images/` with fallback placeholders to prevent broken image states.
   - Category filtering, real-time search, and tag filters (Best Seller, Spicy, New, Veggie).

2. **Item Customization:**
   - Real-time price updates for add-ons (extra cheese, bacon, dips, sides).
   - Dynamic quantity adjustments.

3. **Persistent Shopping Cart:**
   - Active cart items, quantities, add-ons, and promo discounts are preserved across browser refreshes via `localStorage`.

4. **User Account & Checkout Flow:**
   - User authentication (Sign In / Quick Sign Up) required before placing an order.
   - Pre-fills customer contact information upon login.
   - Choice between **Store Pickup** (free) and **Doorstep Delivery** (₱49 fee).

5. **Delivery Area Validation:**
   - Enforces logical delivery coverage around serviced branch hubs (Taguig/BGC, Quezon City, Ayala Center Cebu, and SM Seaside SRP).
   - Warns users if their selected delivery destination falls outside the serviceable radius.

6. **Order Placement & Status Tracker:**
   - Multiple payment options: Cash on Delivery, GCash/Maya, or Card Terminal on arrival.
   - Interactive live status tracker simulating kitchen progression: `Preparing` → `Ready` → `Completed`.

7. **Branches Showcase:**
   - Horizontal scrolling carousel displaying location details, operating hours, and contact numbers.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Run

1. Clone or extract the project directory:
   ```bash
   cd bun-and-bird
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

4. Build for production:
   ```bash
   npm run build
   ```

---

## Test Promo Codes

The checkout page supports the following test vouchers:
- `BUNBIRD10` — 10% discount on food subtotal
- `SAVE50` — ₱50 off order total
- `FREESHIP` — Free delivery on doorstep orders

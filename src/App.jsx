import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ItemDetails from './pages/ItemDetails';
import CartPage from './pages/CartPage';
import Branches from './pages/Branches';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="menu/:id" element={<ItemDetails />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="branches" element={<Branches />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

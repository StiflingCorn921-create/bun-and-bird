import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout({ itemCount = 0 }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal font-sans selection:bg-mustard selection:text-charcoal">
      <Header itemCount={itemCount} />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

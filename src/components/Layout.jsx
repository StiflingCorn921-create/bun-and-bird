import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { AuthModal } from './AuthModal';

export function Layout({ itemCount }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal font-sans selection:bg-mustard selection:text-charcoal overflow-x-hidden">
      <Header itemCount={itemCount} />
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}

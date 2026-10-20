import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { siteContent } from './data/siteContent';

export default function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-cream text-charcoal font-sans flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-ketchup tracking-tight">
            {siteContent.brand.name}
          </h1>
          <p className="mt-2 text-lg text-charcoal-muted">
            {siteContent.brand.tagline}
          </p>
        </div>
      </main>
    </BrowserRouter>
  );
}

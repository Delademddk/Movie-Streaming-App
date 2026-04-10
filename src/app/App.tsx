import { useState } from 'react';
import NavBar from '@/components/NavBar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import Footer from '@/components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'search'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
  };

  return (
    <div className="min-h-screen ">
      <NavBar onSearch={handleSearch} />

      {currentView === 'home' ? (
        <HomePage />
      ) : (
        <SearchPage query={searchQuery} />
      )}
      <Footer />
    </div>
  );
}

import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import Footer from "@/components/Footer";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MoviesPage from "./pages/MoviesPage";
import TVShowsPage from "./pages/TVShowsPage";
import WatchPage from "./pages/WatchPage";

export default function App() {
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";

  return (
    <div className="min-h-screen ">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv-shows" element={<TVShowsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
      </Routes>

      {!isSearchPage && <Footer />}
    </div>
  );
}

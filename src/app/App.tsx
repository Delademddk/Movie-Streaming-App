import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import Footer from "@/components/Footer";
import MovieDetailsPage from "./pages/MovieDetailsPage";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery === "") {
      navigate("/search");
      return;
    }

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const isSearchPage = location.pathname === "/search";

  return (
    <div className="min-h-screen ">
      <NavBar onSearch={handleSearch} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
      </Routes>

      {!isSearchPage && <Footer />}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import Logo from "../assets/Logo.svg";
import UserAvatar from "./UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryFromUrl =
    new URLSearchParams(location.search).get("query") || "";

  const [searchValue, setSearchValue] = useState(queryFromUrl);
  const debouncedSearchValue = useDebounce(searchValue, 400);
  const isSearchPage = location.pathname === "/search";

  useEffect(() => {
    setSearchValue((currentSearchValue) =>
      queryFromUrl === currentSearchValue ? currentSearchValue : queryFromUrl
    );
  }, [queryFromUrl]);

  useEffect(() => {
    if (!isSearchPage) return;

    const params = new URLSearchParams(location.search);
    const currentQuery = queryFromUrl;
    const nextQuery = debouncedSearchValue.trim();

    if (nextQuery === "") {
      if (currentQuery === "" && debouncedSearchValue === "") return;

      navigate("/search?query=&type=movie&page=1", { replace: true });
      return;
    }

    if (nextQuery === currentQuery) return;

    params.delete("q");
    params.set("query", nextQuery);
    params.set("type", params.get("type") ?? "movie");
    params.set("page", "1");

    navigate(`/search?${params.toString()}`, { replace: true });
  }, [debouncedSearchValue, isSearchPage, navigate]);

  const handleSearch = () => {
    const trimmed = searchValue.trim();

    navigate(
      `/search?query=${encodeURIComponent(trimmed)}&type=movie&page=1`
    );
  };

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSearchPage) {
      handleSearch();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1E293B] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4 ">
      <div className="flex items-center min-w-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="md:hidden text-gray-400 transition-colors mr-3">
              <Menu className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-fit min-w-35 max-w-45 transition-colors bg-[#1E293B] text-[#94A3B8] text-sm pb-2 rounded-xs"
            align="end"
            sideOffset={8}
          >
            <DropdownMenuItem className="hover:text-[#0D59F2] cursor-pointer">
              Home
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:text-[#0D59F2] cursor-pointer">
              Movies
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:text-[#0D59F2] cursor-pointer">
              TV Shows
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:text-[#0D59F2] cursor-pointer">
              My List
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link to="/" className="flex items-center">
          <img className="w-5 h-4 md:w-6 md:h-5 mr-2" src={Logo} alt="Logo" />
          <h2 className="text-white text-[16px] max-sm:text-[15px] lg:text-[20px] font-bold whitespace-nowrap">
            Movie Explorer
          </h2>
        </Link>

        <div className="hidden md:flex items-center text-xs max-md:text-xs lg:text-[14px] gap-3 md:gap-4 lg:gap-6 px-3 md:px-4 lg:px-8 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500"
                : "cursor-pointer hover:text-white transition-colors text-[#94A3B8]"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500"
                : "cursor-pointer hover:text-white transition-colors text-[#94A3B8]"
            }
          >
            Movies
          </NavLink>
          <NavLink
            to="/tv-shows"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500"
                : "cursor-pointer hover:text-white transition-colors text-[#94A3B8]"
            }
          >
            TV shows
          </NavLink>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative flex items-center">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 lg:h-4.5 lg:w-4.5 text-gray-500" />
            <Input
              value={searchValue}
              onChange={(e) => handleSearchValueChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-7 md:pl-8 rounded-[8px] w-[clamp(140px,32vw,448px)] bg-[#2B3444] border-[#2B3444] border-2 focus-visible:border-[#0C8CE9] text-xs md:text-sm"
              placeholder="Search movies..."
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="sm:hidden text-gray-400 hover:text-white cursor-pointer transition-colors">
                <Search className="w-6 h-6 mr-1 p-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="sm:hidden w-screen mt-0.5 p-0 border-none bg-transparent shadow-none rounded-none"
              sideOffset={0}
              align="start"
              side="bottom"
            >
              <div className="w-full backdrop-blur-md px-4 py-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    value={searchValue}
                    onChange={(e) => handleSearchValueChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="pl-8 w-full rounded-[8px] bg-[#2B3444]/90 border-[#2B3444]/90 border-2 focus-visible:border-[#0C8CE9] text-sm"
                    placeholder="Search movies..."
                  />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <UserAvatar />
      </div>
    </header>
  );
}

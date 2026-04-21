import { useState, useEffect } from 'react';
import { ChevronDown, Funnel } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  onFiltersChange: (filters: {
    genre: string;
    year: string;
    rating: string;
    sort: string;
  }) => void;
}

export default function FilterBar({ onFiltersChange }: FilterBarProps) {
  const [genre, setGenre] = useState('All Genres');
  const [year, setYear] = useState('2024');
  const [rating, setRating] = useState('8.0+');
  const [sort, setSort] = useState('Popularity');

  const genres = ['All Genres', 'Action', 'Sci-Fi', 'Drama', 'Adventure', 'Crime', 'Thriller'];
  const years = ['All Years', '2024', '2023', '2022', '2021', '2020', '2019'];
  const ratings = ['All Ratings', '8.0+', '7.5+', '7.0+', '6.5+', '6.0+'];
  const sorts = ['Popularity', 'Rating', 'Newest First', 'Oldest First'];

  // Notify parent component whenever filters change
  useEffect(() => {
    onFiltersChange({ genre, year, rating, sort });
  }, [genre, year, rating, sort, onFiltersChange]);

  return (
    <div className="p-4 border rounded-[12px] border-zinc-800 bg-[#171D29] ">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                <Funnel/>
                {genre}
                <ChevronDown className="ml h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-40 bg-zinc-900/90  text-[#b7b6b6] border-zinc-700">
              {genres.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setGenre(option)}
                  className="cursor-pointer hover:text-white"
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Year */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-[8px] bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white px-4 py-2">
                {year === 'All Years' ? 'All Years' : `Year ${year}`}
                <ChevronDown className="ml h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-40 bg-zinc-900/90  text-[#b7b6b6] border-zinc-700">
              {years.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setYear(option)}
                  className="cursor-pointer "
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-[8px] bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white px-4 py-2">
                {rating === 'All Ratings' ? 'All Ratings' : `Rating ${rating}`}
                <ChevronDown className="ml h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-40 bg-zinc-900/90  text-[#b7b6b6] border-zinc-700 ">
              {ratings.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setRating(option)}
                  className="cursor-pointer "
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex items-center'>

        <p className='text-[#94A3B8]'>Sort by :</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button  className="rounded-none flex items-center gap-2 hover:text-white cursor-pointer text-[#b7b6b6] px-4 py-2">
               {sort}
              <ChevronDown className="ml h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40 bg-zinc-900/90  text-[#b7b6b6] border-zinc-700">
            {sorts.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setSort(option)}
                className="cursor-pointer  hover:text-white"
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
// 'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterSidebarProps {
  onApply: (filters: {
    genres: string[];
    yearRange: string;
    minRating: number;
  }) => void;
}

export default function FilterSidebar({ onApply }: FilterSidebarProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['Sci-Fi', 'Drama']);
  const [yearRange, setYearRange] = useState('2010-2019');
  const [minRating, setMinRating] = useState([8.0]);

  const genresList = ['Sci-Fi', 'Action', 'Drama', 'Adventure'];

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleApply = () => {
    onApply({
      genres: selectedGenres,
      yearRange,
      minRating: minRating[0],
    });
  };

  const handleClear = () => {
    setSelectedGenres([]);
    setYearRange('All Years');
    setMinRating([0]);
    onApply({ genres: [], yearRange: 'All Years', minRating: 0 });
  };

  return (
    <div className="w-72  p-6 flex flex-col h-fit">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-blue-500 text-xl">⚙️</span>
        <h2 className="text-white font-semibold text-lg">Filters</h2>
      </div>

      {/* GENRE */}
      <div className="mb-8">
        <h3 className="text-white text-sm font-medium mb-3">GENRE</h3>
        <div className="space-y-3">
          {genresList.map((genre) => (
            <div key={genre} className="flex items-center gap-3">
              <Checkbox
                id={genre}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={() => handleGenreChange(genre)}
              />
              <label
                htmlFor={genre}
                className="text-white text-sm cursor-pointer"
              >
                {genre}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* RELEASE YEAR */}
      <div className="mb-8">
        <h3 className="text-white text-sm font-medium mb-3">RELEASE YEAR</h3>
        <Select value={yearRange} onValueChange={setYearRange}>
          <SelectTrigger className="bg-zinc-900 border-zinc-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            <SelectItem value="All Years">All Years</SelectItem>
            <SelectItem value="2010-2019">2010 - 2019</SelectItem>
            <SelectItem value="2020-2024">2020 - 2024</SelectItem>
            <SelectItem value="2000-2009">2000 - 2009</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* MINIMUM RATING */}
      <div className="mb-8">
        <h3 className="text-white text-sm font-medium mb-3">MINIMUM RATING</h3>
        <div className="px-2">
          <Slider
            value={minRating}
            onValueChange={setMinRating}
            max={10}
            step={0.1}
            className="mb-3"
          />
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">{minRating[0].toFixed(1)}</span>
            </div>
            <span className="text-zinc-500">10.0</span>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <Button onClick={handleApply} className="w-full bg-blue-600 hover:bg-blue-700 mb-3">
        Apply Changes
      </Button>

      <button
        onClick={handleClear}
        className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}
export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genre: string;
};

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    vote_average: 8.8,
    release_date: "2010-07-16",
    genre: "Sci-Fi",
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    vote_average: 9.0,
    release_date: "2008-07-18",
    genre: "Action",
  },
  {
    id: 3,
    title: "Arrival",
    poster_path: "/x2FJsf1ELKfuqDl8Ip7nGxU3x2y.jpg",
    vote_average: 7.6,
    release_date: "2016-11-11",
    genre: "Drama",
  },
  {
    id: 4,
    title: "Dune: Part Two",
    poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    vote_average: 8.7,
    release_date: "2024-03-01",
    genre: "Adventure",
  },
  {
    id: 5,
    title: "Blade Runner 2049",
    poster_path: "/gajHSz3p6n0f8o6qZ8Z7pZ7pZ7pZ.jpg", // real path
    vote_average: 8.0,
    release_date: "2017-10-06",
    genre: "Sci-Fi",
  },
  {
    id: 6,
    title: "The Revenant",
    poster_path: "/jiW0e9h4z3x7f3e3f3e3f3e3f3e.jpg",
    vote_average: 7.8,
    release_date: "2015-12-25",
    genre: "Action",
  },
  // Add more if you want (we'll use these 6 for now)
];
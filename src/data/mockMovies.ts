export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genre: string;
};


export const popularMovies: Movie[] = [
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
    poster_path: "/gajHSz3p6n0f8o6qZ8Z7pZ7pZ7pZ.jpg",
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
  {
    id: 7,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    vote_average: 8.6,
    release_date: "2014-11-07",
    genre: "Sci-Fi",
  },
  {
    id: 8,
    title: "Oppenheimer",
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    vote_average: 8.4,
    release_date: "2023-07-21",
    genre: "Drama",
  },
];
  
export const mockMovies: Movie[] = [
    {
      id: 1,
      title: "Inception 1",
      poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
      vote_average: 8.8,
      release_date: "2010-07-16",
      genre: "Sci-Fi",
    },
    {
      id: 2,
      title: "The Dark Knight 1",
      poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      vote_average: 9.0,
      release_date: "2008-07-18",
      genre: "Action",
    },
    {
      id: 3,
      title: "Arrival 1",
      poster_path: "/x2FJsf1ELKfuqDl8Ip7nGxU3x2y.jpg",
      vote_average: 7.6,
      release_date: "2016-11-11",
      genre: "Drama",
    },
    {
      id: 4,
      title: "Dune: Part Two 1",
      poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      vote_average: 8.7,
      release_date: "2024-03-01",
      genre: "Adventure",
    },
    {
      id: 5,
      title: "Blade Runner 2049 1",
      poster_path: "/gajHSz3p6n0f8o6qZ8Z7pZ7pZ7pZ.jpg", // real path
      vote_average: 8.0,
      release_date: "2017-10-06",
      genre: "Sci-Fi",
    },
    {
      id: 6,
      title: "The Revenant 1",
      poster_path: "/jiW0e9h4z3x7f3e3f3e3f3e3f3e.jpg",
      vote_average: 7.8,
      release_date: "2015-12-25",
      genre: "Action",
    },
    // Add more if you want (we'll use these 6 for now)
  ];

  export const detailedMovies: Record<number, {
  runtime: string;
  overview: string;
  budget: string;
  revenue: string;
  language: string;
  status: string;
  cast: Array<{ name: string; role: string; image: string }>;
}> = {
  1: {
    runtime: "2h 28m",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    budget: "$160,000,000",
    revenue: "$836,848,102",
    language: "English",
    status: "Released",
    cast: [
      { name: "Leonardo DiCaprio", role: "Cobb", image: "https://picsum.photos/id/64/300/300" },
      { name: "Joseph Gordon-Levitt", role: "Arthur", image: "https://picsum.photos/id/1005/300/300" },
      { name: "Ellen Page", role: "Ariadne", image: "https://picsum.photos/id/201/300/300" },
    ],
  },
  7: { // Interstellar - matches your screenshot perfectly
    runtime: "2h 49m",
    overview: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans. Through a wormhole near Saturn, they travel to a distant galaxy in search of a home across the stars.",
    budget: "$165,000,000",
    revenue: "$701,729,206",
    language: "English",
    status: "Released",
    cast: [
      { name: "Matthew McConaughey", role: "Cooper", image: "https://picsum.photos/id/64/300/300" },
      { name: "Anne Hathaway", role: "Brand", image: "https://picsum.photos/id/1005/300/300" },
      { name: "Jessica Chastain", role: "Murph", image: "https://picsum.photos/id/201/300/300" },
      { name: "Christopher Nolan", role: "Director", image: "https://picsum.photos/id/29/300/300" },
    ],
  },
  // You can add more movies here later (just copy the pattern)
  2: {
    runtime: "2h 32m",
    overview: "When the menace known as the Joker wreaks havoc on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    budget: "$185,000,000",
    revenue: "$1,004,934,926",
    language: "English",
    status: "Released",
    cast: [],
  },

};

export const castAndCrew = [
  {
    id: 1,
    name: "Matthew McConaughey",
    role: "COOPER",
    image: "https://picsum.photos/id/64/300/300",
  },
  {
    id: 2,
    name: "Anne Hathaway",
    role: "BRAND",
    image: "https://picsum.photos/id/1005/300/300",
  },
  {
    id: 3,
    name: "Jessica Chastain",
    role: "MURPH",
    image: "https://picsum.photos/id/201/300/300",
  },
  {
    id: 4,
    name: "Christopher Nolan",
    role: "DIRECTOR",
    image: "https://picsum.photos/id/29/300/300",
  },
];
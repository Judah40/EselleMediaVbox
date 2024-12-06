import { Movie } from "@/app/components/cards/cards.types";

export const movies: Movie[] = [
    {
      id: 1,
      title: "Movie 1",
      match: 98,
      duration: "2h 15m",
      genres: ["Action", "Adventure"],
    },
    {
      id: 2,
      title: "Movie 2",
      match: 95,
      duration: "1h 55m",
      genres: ["Drama", "Thriller"],
    },
    {
      id: 3,
      title: "Movie 3",
      match: 92,
      duration: "2h 5m",
      genres: ["Comedy", "Romance"],
    },
    {
      id: 4,
      title: "Movie 4",
      match: 96,
      duration: "2h 30m",
      genres: ["Sci-Fi", "Action"],
    },
    {
      id: 5,
      title: "Movie 5",
      match: 91,
      duration: "1h 45m",
      genres: ["Horror", "Mystery"],
    },
    {
      id: 6,
      title: "Movie 6",
      match: 94,
      duration: "2h 10m",
      genres: ["Drama", "Biography"],
    },
  ];





  interface MovieNew {
    title: string;
    rating: number;
    genre: string;
    poster: string;
  }
  
 export const movie: MovieNew[] = [
    {
      title: "The Gray Man",
      rating: 4.2,
      genre: "Fantasy | Action",
      poster: "/flash-background.jpeg",
    },
    {
      title: "Money Heist Part 4",
      rating: 4.2,
      genre: "Fantasy | Drama",
      poster: "/poison-background.jpeg",
    },
    {
      title: "Lucifer",
      rating: 4.2,
      genre: "Fantasy | Action",
      poster: "/rainy-night-background.jpeg",
    },
    {
      title: "Ant-Man",
      rating: 4.2,
      genre: "Fantasy | Action",
      poster: "/flash-background.jpeg",
    },
    
    {
      title: "The Gray Man",
      rating: 4.2,
      genre: "Fantasy | Action",
      poster: "/flash-background.jpeg",
    },
    {
      title: "Money Heist Part 4",
      rating: 4.2,
      genre: "Fantasy | Drama",
      poster: "/poison-background.jpeg",
    },
    {
      title: "Lucifer",
      rating: 4.2,
      genre: "Fantasy | Action",
      poster: "/rainy-night-background.jpeg",
    },
    {
      title: "Ant-Man",
      rating: 4.2,
      genre: "Fantasy | Action",
      poster: "/flash-background.jpeg",
    },
    
    // Add more movies as needed...
  ];
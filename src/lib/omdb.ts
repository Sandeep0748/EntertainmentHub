const OMDB_API_KEY = '9585f415';
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

export interface OMDbItem {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: 'movie' | 'series';
  imdbRating?: string;
  Runtime?: string;
  Genre?: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Released?: string;
  totalSeasons?: string;
}

// Curated popular movie IMDb IDs for trending
const popularMovieIds = [
  'tt15398776', // Oppenheimer
  'tt1517268',  // Barbie
  'tt1160419',  // Dune 2
  'tt9362722',  // Spider-Man: Across
  'tt6718170',  // The Super Mario Bros
  'tt14998742', // Napoleo
  'tt5090568',  // Killers of Flower Moon
  'tt15239678', // Wonka
  'tt9603212',  // Mission Impossible 7
  'tt10366206', // John Wick 4
  'tt0468569',  // The Dark Knight
  'tt0111161',  // Shawshank Redemption
  'tt0068646',  // The Godfather
  'tt0137523',  // Fight Club
  'tt0120737',  // LOTR Fellowship
  'tt0109830',  // Forrest Gump
  'tt0167260',  // LOTR Return of King
  'tt0110912',  // Pulp Fiction
];

// Curated popular TV series IMDb IDs
const popularTVIds = [
  'tt5491994',  // Planet Earth II
  'tt0944947',  // Game of Thrones
  'tt0903747',  // Breaking Bad
  'tt4574334',  // Stranger Things
  'tt7366338',  // Chernobyl
  'tt0306414',  // The Wire
  'tt2861424',  // Rick and Morty
  'tt0413573',  // Grey's Anatomy
  'tt2442560',  // Peaky Blinders
  'tt8111088',  // The Mandalorian
  'tt2356777',  // True Detective
  'tt5180504',  // The Witcher
  'tt7335184',  // You
  'tt14688458', // Shogun
  'tt1190634',  // The Boys
  'tt3581920',  // The Last of Us
  'tt5753856',  // Dark
  'tt0455275',  // Prison Break
];

async function fetchFromOMDb(params: Record<string, string>): Promise<any> {
  const url = new URL(OMDB_BASE_URL);
  url.searchParams.append('apikey', OMDB_API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());
  const data = await response.json();
  
  if (data.Error) {
    console.warn('OMDb API error:', data.Error);
    return null;
  }
  
  return data;
}

export async function fetchMovieById(imdbId: string): Promise<OMDbItem | null> {
  return fetchFromOMDb({ i: imdbId, plot: 'full' });
}

export async function fetchTVById(imdbId: string): Promise<OMDbItem | null> {
  return fetchFromOMDb({ i: imdbId, plot: 'full' });
}

export async function searchMovies(query: string): Promise<OMDbItem[]> {
  const data = await fetchFromOMDb({ s: query, type: 'movie' });
  return data?.Search || [];
}

export async function searchTVShows(query: string): Promise<OMDbItem[]> {
  const data = await fetchFromOMDb({ s: query, type: 'series' });
  return data?.Search || [];
}

export async function searchMulti(query: string): Promise<OMDbItem[]> {
  const [movies, tv] = await Promise.all([
    searchMovies(query),
    searchTVShows(query),
  ]);
  return [...movies, ...tv];
}

export async function fetchTrendingMovies(): Promise<OMDbItem[]> {
  const results = await Promise.all(
    popularMovieIds.map(id => fetchMovieById(id))
  );
  return results.filter((item): item is OMDbItem => item !== null);
}

export async function fetchPopularMovies(): Promise<OMDbItem[]> {
  return fetchTrendingMovies();
}

export async function fetchTrendingTV(): Promise<OMDbItem[]> {
  const results = await Promise.all(
    popularTVIds.map(id => fetchTVById(id))
  );
  return results.filter((item): item is OMDbItem => item !== null);
}

export async function fetchPopularTV(): Promise<OMDbItem[]> {
  return fetchTrendingTV();
}

// Helper to get poster URL (OMDb returns full URL or "N/A")
export function getPosterUrl(poster: string | undefined): string | null {
  if (!poster || poster === 'N/A') return null;
  return poster;
}

// Helper to parse rating
export function parseRating(rating: string | undefined): number {
  if (!rating || rating === 'N/A') return 0;
  return parseFloat(rating);
}

import { useEffect, useState } from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { MediaCard } from '@/components/ui/MediaCard';
import { MediaGrid } from '@/components/ui/MediaGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GridSkeleton } from '@/components/ui/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTrending as setTrendingMovies, setLoading as setMoviesLoading } from '@/store/slices/moviesSlice';
import { setTrending as setTrendingTV, setLoading as setTVLoading } from '@/store/slices/tvSlice';
import { fetchTrendingMovies, fetchTrendingTV, searchMulti, parseRating, OMDbItem } from '@/lib/omdb';
import { Film } from 'lucide-react';

const Home = () => {
  const dispatch = useAppDispatch();
  const { trending: trendingMovies, loading: moviesLoading } = useAppSelector((state) => state.movies);
  const { trending: trendingTV, loading: tvLoading } = useAppSelector((state) => state.tv);
  const [searchResults, setSearchResults] = useState<OMDbItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      dispatch(setMoviesLoading(true));
      dispatch(setTVLoading(true));

      try {
        const [movies, tv] = await Promise.all([
          fetchTrendingMovies(),
          fetchTrendingTV(),
        ]);
        dispatch(setTrendingMovies(movies));
        dispatch(setTrendingTV(tv));
      } catch (error) {
        console.error('Failed to load trending content:', error);
      } finally {
        dispatch(setMoviesLoading(false));
        dispatch(setTVLoading(false));
      }
    };

    loadData();
  }, [dispatch]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchMulti(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const isLoading = moviesLoading || tvLoading;

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="relative -mx-4 -mt-8 lg:-mx-8">
        <div className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="container relative flex h-full max-w-7xl flex-col items-start justify-center px-4 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
              Entertainment<span className="text-primary">Hub</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Discover trending movies and TV series. Bookmark your favorites and never miss what's hot.
            </p>
            <div className="mt-8 w-full max-w-2xl">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <section>
          <SectionHeader
            title={`Search Results for "${searchQuery}"`}
            subtitle={`${searchResults.length} results found`}
          />
          {isSearching ? (
            <GridSkeleton count={8} />
          ) : searchResults.length > 0 ? (
            <MediaGrid>
              {searchResults.map((item) => (
                <MediaCard
                  key={item.imdbID}
                  id={item.imdbID}
                  title={item.Title}
                  poster={item.Poster}
                  year={item.Year}
                  rating={parseRating(item.imdbRating)}
                  type={item.Type}
                />
              ))}
            </MediaGrid>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-secondary p-4">
                <Film className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-lg text-muted-foreground">No results found</p>
            </div>
          )}
        </section>
      )}

      {/* Trending Movies */}
      {!searchQuery && (
        <>
          <section>
            <SectionHeader
              title="Trending Movies"
              subtitle="Most popular movies this week"
            />
            {isLoading ? (
              <GridSkeleton count={6} />
            ) : (
              <MediaGrid>
                {trendingMovies.slice(0, 12).map((movie: any) => (
                  <MediaCard
                    key={movie.imdbID}
                    id={movie.imdbID}
                    title={movie.Title}
                    poster={movie.Poster}
                    year={movie.Year}
                    rating={parseRating(movie.imdbRating)}
                    type="movie"
                  />
                ))}
              </MediaGrid>
            )}
          </section>

          {/* Trending TV */}
          <section>
            <SectionHeader
              title="Trending TV Series"
              subtitle="Most watched series this week"
            />
            {isLoading ? (
              <GridSkeleton count={6} />
            ) : (
              <MediaGrid>
                {trendingTV.slice(0, 12).map((show: any) => (
                  <MediaCard
                    key={show.imdbID}
                    id={show.imdbID}
                    title={show.Title}
                    poster={show.Poster}
                    year={show.Year}
                    rating={parseRating(show.imdbRating)}
                    type="series"
                  />
                ))}
              </MediaGrid>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Home;

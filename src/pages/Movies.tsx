import { useEffect } from 'react';
import { MediaCard } from '@/components/ui/MediaCard';
import { MediaGrid } from '@/components/ui/MediaGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GridSkeleton } from '@/components/ui/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPopular, setLoading } from '@/store/slices/moviesSlice';
import { fetchPopularMovies, parseRating } from '@/lib/omdb';

const Movies = () => {
  const dispatch = useAppDispatch();
  const { popular, loading } = useAppSelector((state) => state.movies);

  useEffect(() => {
    const loadMovies = async () => {
      dispatch(setLoading(true));
      try {
        const movies = await fetchPopularMovies();
        dispatch(setPopular(movies));
      } catch (error) {
        console.error('Failed to load movies:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadMovies();
  }, [dispatch]);

  return (
    <div className="animate-fade-in">
      <SectionHeader
        title="Movies"
        subtitle="Browse popular movies from around the world"
      />
      
      {loading ? (
        <GridSkeleton count={18} />
      ) : (
        <MediaGrid>
          {popular.map((movie: any) => (
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
    </div>
  );
};

export default Movies;

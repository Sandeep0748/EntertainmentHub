import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, Calendar, Clock, Star, Film, Users, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { TrailerModal } from '@/components/ui/TrailerModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addBookmark, removeBookmark } from '@/store/slices/bookmarksSlice';
import { fetchMovieById, getPosterUrl, parseRating, OMDbItem } from '@/lib/omdb';
import { cn } from '@/lib/utils';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.bookmarks.items);
  const [movie, setMovie] = useState<OMDbItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  const isBookmarked = movie && bookmarks.some(
    (item) => item.imdbId === movie.imdbID && item.type === 'movie'
  );

  useEffect(() => {
    const loadMovie = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await fetchMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error('Failed to load movie:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const handleBookmark = () => {
    if (!movie) return;

    if (isBookmarked) {
      dispatch(removeBookmark({ imdbId: movie.imdbID, type: 'movie' }));
    } else {
      dispatch(
        addBookmark({
          id: `movie-${movie.imdbID}`,
          imdbId: movie.imdbID,
          type: 'movie',
          title: movie.Title,
          poster: movie.Poster,
          year: movie.Year,
        })
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <Film className="mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Movie not found</h2>
        <Link to="/movies" className="mt-4 text-primary hover:underline">
          Browse movies
        </Link>
      </div>
    );
  }

  const posterUrl = getPosterUrl(movie.Poster);
  const rating = parseRating(movie.imdbRating);

  return (
    <div className="animate-fade-in">
      {/* Back button */}
      <Link
        to="/movies"
        className="mb-6 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Movies
      </Link>

      {/* Hero section */}
      <div className="relative -mx-4 overflow-hidden rounded-2xl bg-secondary/30 lg:-mx-8">
        <div className="relative flex flex-col gap-8 p-6 md:flex-row lg:p-8">
          {/* Poster */}
          <div className="mx-auto w-full max-w-[300px] flex-shrink-0 md:mx-0 md:w-64 lg:w-72">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.Title}
                className="w-full rounded-xl shadow-card"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center rounded-xl bg-secondary">
                <Film className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
              {movie.Title}
            </h1>

            {/* Meta info */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              {rating > 0 && (
                <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-primary">
                  <Star className="h-4 w-4 fill-current" />
                  {rating.toFixed(1)}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {movie.Released || movie.Year}
              </span>
              {movie.Runtime && movie.Runtime !== 'N/A' && (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {movie.Runtime}
                </span>
              )}
            </div>

            {/* Genres */}
            {movie.Genre && movie.Genre !== 'N/A' && (
              <div className="mt-4 flex flex-wrap gap-2">
                {movie.Genre.split(', ').map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-secondary px-3 py-1 text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Director & Cast */}
            {movie.Director && movie.Director !== 'N/A' && (
              <div className="mt-4">
                <span className="text-muted-foreground">Director: </span>
                <span className="font-medium">{movie.Director}</span>
              </div>
            )}
            {movie.Actors && movie.Actors !== 'N/A' && (
              <div className="mt-2 flex items-start gap-2">
                <Users className="mt-1 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{movie.Actors}</span>
              </div>
            )}

            {/* Overview */}
            <div className="mt-6">
              <h3 className="mb-2 font-semibold">Overview</h3>
              <p className="leading-relaxed text-muted-foreground">
                {movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : 'No overview available.'}
              </p>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={() => setShowTrailer(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Play className="mr-2 h-5 w-5 fill-current" />
                Watch Trailer
              </Button>
              <Button
                onClick={handleBookmark}
                size="lg"
                className={cn(
                  isBookmarked && 'bg-primary/20 text-primary hover:bg-primary/30'
                )}
                variant={isBookmarked ? 'outline' : 'secondary'}
              >
                <Bookmark className={cn('mr-2 h-5 w-5', isBookmarked && 'fill-current')} />
                {isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Trailer Modal */}
      {movie && (
        <TrailerModal
          isOpen={showTrailer}
          onClose={() => setShowTrailer(false)}
          title={movie.Title}
          year={movie.Year}
        />
      )}
    </div>
  );
};

export default MovieDetails;

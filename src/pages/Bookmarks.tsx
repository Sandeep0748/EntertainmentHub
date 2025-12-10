import { MediaCard } from '@/components/ui/MediaCard';
import { MediaGrid } from '@/components/ui/MediaGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useAppSelector } from '@/store/hooks';
import { Bookmark, Film, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
  const bookmarks = useAppSelector((state) => state.bookmarks.items);

  const movieBookmarks = bookmarks.filter((item) => item.type === 'movie');
  const tvBookmarks = bookmarks.filter((item) => item.type === 'series');

  if (bookmarks.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center animate-fade-in">
        <div className="mb-6 rounded-full bg-secondary p-6">
          <Bookmark className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold">No bookmarks yet</h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          Start exploring movies and TV series, then bookmark your favorites to find them here.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Film className="h-5 w-5" />
            Browse Movies
          </Link>
          <Link
            to="/tv"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-medium transition-colors hover:bg-secondary/80"
          >
            <Tv className="h-5 w-5" />
            Browse TV Series
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in">
      <SectionHeader
        title="Your Bookmarks"
        subtitle={`${bookmarks.length} item${bookmarks.length !== 1 ? 's' : ''} saved`}
      />

      {movieBookmarks.length > 0 && (
        <section>
          <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
            <Film className="h-5 w-5 text-primary" />
            Movies ({movieBookmarks.length})
          </h3>
          <MediaGrid>
            {movieBookmarks.map((movie) => (
              <MediaCard
                key={movie.id}
                id={movie.imdbId}
                title={movie.title}
                poster={movie.poster}
                year={movie.year}
                type="movie"
              />
            ))}
          </MediaGrid>
        </section>
      )}

      {tvBookmarks.length > 0 && (
        <section>
          <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
            <Tv className="h-5 w-5 text-primary" />
            TV Series ({tvBookmarks.length})
          </h3>
          <MediaGrid>
            {tvBookmarks.map((show) => (
              <MediaCard
                key={show.id}
                id={show.imdbId}
                title={show.title}
                poster={show.poster}
                year={show.year}
                type="series"
              />
            ))}
          </MediaGrid>
        </section>
      )}
    </div>
  );
};

export default Bookmarks;

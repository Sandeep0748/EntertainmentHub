import { Link } from 'react-router-dom';
import { Bookmark, Film, Tv, Calendar, Star, Play } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addBookmark, removeBookmark } from '@/store/slices/bookmarksSlice';
import { getPosterUrl, parseRating } from '@/lib/omdb';
import { cn } from '@/lib/utils';

interface MediaCardProps {
  id: string;
  title: string;
  poster: string | null;
  year: string;
  rating?: number | string;
  type: 'movie' | 'series';
}

export function MediaCard({ id, title, poster, year, rating, type }: MediaCardProps) {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.bookmarks.items);
  
  const isBookmarked = bookmarks.some(
    (item) => item.imdbId === id && item.type === type
  );

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isBookmarked) {
      dispatch(removeBookmark({ imdbId: id, type }));
    } else {
      dispatch(
        addBookmark({
          id: `${type}-${id}`,
          imdbId: id,
          type,
          title,
          poster,
          year,
        })
      );
    }
  };

  const imageUrl = getPosterUrl(poster || '');
  const detailPath = type === 'movie' ? `/movie/${id}` : `/tv/${id}`;
  const numericRating = typeof rating === 'string' ? parseRating(rating) : rating;

  return (
    <Link to={detailPath} className="group relative block animate-fade-in">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-secondary shadow-card transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            {type === 'movie' ? (
              <Film className="h-12 w-12 text-muted-foreground" />
            ) : (
              <Tv className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-card opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-110">
            <Play className="h-6 w-6 fill-current" />
          </div>
        </div>

        {/* Bookmark button */}
        <button
          onClick={handleBookmarkClick}
          className={cn(
            'absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200',
            isBookmarked
              ? 'bg-primary text-primary-foreground'
              : 'bg-background/50 text-foreground hover:bg-primary hover:text-primary-foreground'
          )}
        >
          <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
        </button>

        {/* Type badge */}
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-background/50 px-2 py-1 text-xs backdrop-blur-md">
          {type === 'movie' ? (
            <Film className="h-3 w-3" />
          ) : (
            <Tv className="h-3 w-3" />
          )}
          <span className="capitalize">{type === 'series' ? 'TV' : type}</span>
        </div>

        {/* Info overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="line-clamp-2 font-semibold text-foreground">{title}</h3>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {year || 'N/A'}
            </span>
            {numericRating !== undefined && numericRating > 0 && (
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                {numericRating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Title below card for mobile */}
      <div className="mt-3 lg:hidden">
        <h3 className="line-clamp-1 text-sm font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground">{year || 'N/A'}</p>
      </div>
    </Link>
  );
}

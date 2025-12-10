import { useEffect } from 'react';
import { MediaCard } from '@/components/ui/MediaCard';
import { MediaGrid } from '@/components/ui/MediaGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GridSkeleton } from '@/components/ui/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPopular, setLoading } from '@/store/slices/tvSlice';
import { fetchPopularTV, parseRating } from '@/lib/omdb';

const TVSeries = () => {
  const dispatch = useAppDispatch();
  const { popular, loading } = useAppSelector((state) => state.tv);

  useEffect(() => {
    const loadTV = async () => {
      dispatch(setLoading(true));
      try {
        const shows = await fetchPopularTV();
        dispatch(setPopular(shows));
      } catch (error) {
        console.error('Failed to load TV series:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadTV();
  }, [dispatch]);

  return (
    <div className="animate-fade-in">
      <SectionHeader
        title="TV Series"
        subtitle="Discover popular TV series and shows"
      />
      
      {loading ? (
        <GridSkeleton count={18} />
      ) : (
        <MediaGrid>
          {popular.map((show: any) => (
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
    </div>
  );
};

export default TVSeries;

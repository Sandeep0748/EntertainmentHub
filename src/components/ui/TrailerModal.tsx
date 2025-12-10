import { X, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  year?: string;
}

export function TrailerModal({ isOpen, onClose, title, year }: TrailerModalProps) {
  // Create YouTube search query for trailer
  const searchQuery = encodeURIComponent(`${title} ${year || ''} official trailer`);
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
  
  // Use YouTube embed with search - direct video search embed
  const embedUrl = `https://www.youtube-nocookie.com/embed?listType=search&list=${searchQuery}&autoplay=1`;

  const handleWatchOnYouTube = () => {
    window.open(youtubeSearchUrl, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-border">
        <DialogTitle className="sr-only">{title} Trailer</DialogTitle>
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>
          
          {/* Video container with fallback */}
          <div className="aspect-video w-full bg-secondary flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground mb-6">
                Watch the official trailer on YouTube
              </p>
            </div>
            
            <Button 
              onClick={handleWatchOnYouTube}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Watch on YouTube
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
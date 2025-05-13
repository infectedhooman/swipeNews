
import { Button } from '@/components/ui/button';
import { SearchX, BookOpen } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-results' | 'empty';
  onRefresh?: () => void;
}

const EmptyState = ({ type, onRefresh }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-64">
      {type === 'no-results' ? (
        <>
          <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-4">
            Try searching for something else or refresh to see top headlines.
          </p>
        </>
      ) : (
        <>
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No articles yet</h3>
          <p className="text-muted-foreground mb-4">
            Search for news or refresh to see top headlines.
          </p>
        </>
      )}
      
      {onRefresh && (
        <Button onClick={onRefresh}>
          Refresh
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

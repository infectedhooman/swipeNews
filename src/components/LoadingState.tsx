
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const LoadingState = () => {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg">
      <Skeleton className="w-full h-64" />
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        
        <Skeleton className="h-7 w-full mb-2" />
        <Skeleton className="h-7 w-3/4 mb-4" />
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        <div className="flex justify-between mt-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;


import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface HeaderProps {
  savedCount: number;
  onShowSaved: () => void;
}

const Header = ({ savedCount, onShowSaved }: HeaderProps) => {
  return (
    <header className="w-full flex justify-between items-center py-4 px-6 mb-4">
      <h1 className="text-2xl font-bold">NewsSwipe</h1>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onShowSaved}
        className="flex items-center space-x-1"
      >
        <Heart className="h-4 w-4" />
        <span>Saved ({savedCount})</span>
      </Button>
    </header>
  );
};

export default Header;

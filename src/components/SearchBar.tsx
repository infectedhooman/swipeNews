
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md mx-auto mb-8"
    >
      <div className="relative flex items-center">
        <Input
          type="search"
          placeholder="Search for news..."
          className="pr-10 h-12 rounded-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button 
          type="submit"
          variant="ghost" 
          size="icon"
          className="absolute right-1"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { generateSummary, Summary } from '@/services/llmService';
import { Loader2, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ArticleSummaryProps {
  article: {
    title: string;
    content: string;
  };
}

const ArticleSummary = ({ article }: ArticleSummaryProps) => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async (type: 'bullets' | 'short') => {
    setLoading(true);
    try {
      const result = await generateSummary({
        articleContent: article.content || article.title,
        summaryType: type,
      });
      setSummary(result);
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "Summary generation failed",
        description: "We couldn't generate a summary at this time.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex space-x-2 mb-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleGenerateSummary('short')}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
          TL;DR
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleGenerateSummary('bullets')}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
          Key Points
        </Button>
      </div>

      {summary && (
        <Card className="p-3 bg-primary/5 mt-2">
          {summary.type === 'short' ? (
            <p className="text-sm">{summary.content as string}</p>
          ) : (
            <ul className="text-sm list-disc pl-5 space-y-1">
              {(summary.content as string[]).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
};

export default ArticleSummary;

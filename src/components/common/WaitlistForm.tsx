
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface WaitlistFormProps {
  className?: string;
  buttonText?: string;
  placeholderText?: string;
  buttonFullWidth?: boolean;
}

const WaitlistForm = ({ 
  className, 
  buttonText = "Join Waitlist", 
  placeholderText = "Enter your email",
  buttonFullWidth = false
}: WaitlistFormProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
      toast.success("You've been added to our waitlist!", {
        description: "We'll notify you when early access is available.",
        position: "top-center",
      });
    }, 1000);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "flex flex-col sm:flex-row gap-3 w-full", 
        className
      )}
    >
      <div className="relative flex-grow">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholderText}
          required
          disabled={loading || submitted}
          className="w-full h-12 px-4 placeholder:text-muted-foreground/70 border-2 focus:border-jobfix-500 focus:ring-jobfix-300/20 transition-all duration-200 dark:bg-jobfix-700 dark:border-jobfix-600"
          style={{ WebkitAppearance: 'none' }}
        />
      </div>
      <Button
        type="submit"
        size={buttonFullWidth ? "default" : "lg"}
        disabled={loading || submitted}
        className={cn(
          "h-12 bg-jobfix-800 hover:bg-jobfix-700 text-white transition-all duration-200",
          buttonFullWidth ? "w-full" : "sm:w-auto"
        )}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : buttonText}
      </Button>
    </form>
  );
};

export default WaitlistForm;

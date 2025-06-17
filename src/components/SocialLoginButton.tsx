import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button'; // Using shadcn Button as base
import { LucideProps } from 'lucide-react'; // For icon type

// Define specific social providers you might support, can be extended
type SocialProvider = 'google' | 'facebook' | 'github' | 'apple';

interface SocialLoginButtonProps extends ButtonProps {
  provider: SocialProvider;
  onClick: () => void;
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>; // Optional Lucide icon component
  isLoading?: boolean; // To show loading state
}

const providerDetails: Record<SocialProvider, { name: string; defaultIcon?: string /* Placeholder for actual icon handling */ }> = {
  google: { name: 'Google', defaultIcon: 'GoogleIconPlaceholder' }, // Replace with actual icon components if available
  facebook: { name: 'Facebook', defaultIcon: 'FacebookIconPlaceholder' },
  github: { name: 'GitHub', defaultIcon: 'GithubIconPlaceholder' },
  apple: { name: 'Apple', defaultIcon: 'AppleIconPlaceholder' },
};

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onClick,
  icon: IconComponent,
  isLoading = false,
  children, // To allow custom text like "Sign in with Google"
  ...props // Spread other ButtonProps like variant, size, className
}) => {
  const details = providerDetails[provider];
  console.log("Rendering SocialLoginButton for provider:", provider);

  return (
    <Button
      variant="outline" // Default variant, can be overridden by props
      className="w-full flex items-center justify-center gap-2"
      onClick={onClick}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        IconComponent && <IconComponent className="h-5 w-5" />
      )}
      <span>{children || `Sign in with ${details.name}`}</span>
    </Button>
  );
};

export default SocialLoginButton;
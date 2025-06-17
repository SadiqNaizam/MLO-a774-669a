import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation

interface AuthPageLayoutProps {
  children: React.ReactNode;
  title: string;
  // Optional: A link to navigate to if the user already has an account or needs to sign up
  footerLinkPath?: string;
  footerLinkText?: string;
  footerText?: string; // e.g. "Don't have an account?"
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({
  children,
  title,
  footerLinkPath,
  footerLinkText,
  footerText,
}) => {
  console.log("Rendering AuthPageLayout with title:", title);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Optional: Logo or App Name */}
        <div className="text-center">
          <Link to="/" className="text-3xl font-bold text-green-600 hover:text-green-700">
            {/* Replace with your App Name or Logo Component */}
            AppLogo
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
          {children}
        </div>

        {footerText && footerLinkPath && footerLinkText && (
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {footerText}{' '}
            <Link to={footerLinkPath} className="font-medium text-green-600 hover:text-green-500">
              {footerLinkText}
            </Link>
          </p>
        )}

        <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          <br />
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          {' · '}
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPageLayout;
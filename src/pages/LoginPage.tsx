import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AuthPageLayout from '@/components/layout/AuthPageLayout';
import SocialLoginButton from '@/components/SocialLoginButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, Lock, LogIn, AlertCircle, ChromeIcon } from 'lucide-react'; // Using ChromeIcon as a placeholder for Google

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "user@example.com", // Default credential
      password: "password123",   // Default credential
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log('Login form submitted:', data);
    setIsLoading(true);
    setError(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (data.email === "user@example.com" && data.password === "password123") {
      console.log('Login successful');
      // Redirect to a dashboard or home page
      navigate('/dashboard'); // Assuming a /dashboard route exists
    } else {
      setError("Invalid email or password. Please try again.");
    }
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'github' | 'apple') => {
    console.log(`Attempting ${provider} login`);
    setIsLoading(true);
    // Simulate social login flow
    setTimeout(() => {
      // setError(`Social login with ${provider} is not yet implemented.`);
      console.log(`${provider} login successful (simulated)`);
      navigate('/dashboard'); // Assuming a /dashboard route exists
      setIsLoading(false);
    }, 1500);
  };

  console.log('LoginPage loaded');

  return (
    <AuthPageLayout
      title="Welcome Back!"
      footerText="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkPath="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <FormControl>
                    <Input id="email" type="email" placeholder="you@example.com" {...field} className="pl-10" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Link to="/forgot-password" className="text-sm font-medium text-green-600 hover:text-green-500">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <FormControl>
                    <Input id="password" type="password" placeholder="••••••••" {...field} className="pl-10" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox id="rememberMe" checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <Label htmlFor="rememberMe" className="font-normal">Remember me</Label>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <LogIn className="mr-2 h-4 w-4" />
            )}
            Sign In
          </Button>
        </form>
      </Form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">Or continue with</span>
        </div>
      </div>
      <div className="space-y-3">
        <SocialLoginButton
            provider="google"
            onClick={() => handleSocialLogin('google')}
            icon={ChromeIcon} // Using ChromeIcon as a placeholder for Google
            isLoading={isLoading}
            disabled={isLoading}
        >
            Sign in with Google
        </SocialLoginButton>
        {/* Add other social login buttons as needed */}
        {/* Example:
        <SocialLoginButton provider="github" onClick={() => handleSocialLogin('github')} icon={GithubIcon} isLoading={isLoading} disabled={isLoading}>
            Sign in with GitHub
        </SocialLoginButton>
        */}
      </div>
    </AuthPageLayout>
  );
};

export default LoginPage;
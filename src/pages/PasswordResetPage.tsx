import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AuthPageLayout from '@/components/layout/AuthPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Lock, KeyRound, AlertCircle, CheckCircle } from 'lucide-react';

const passwordResetSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match.",
  path: ["confirmNewPassword"],
});

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

const PasswordResetPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (resetToken) {
      setToken(resetToken);
      console.log('Password reset token found:', resetToken);
      // Here you might want to validate the token with a backend
    } else {
      setMessage({ type: 'error', text: 'Invalid or missing password reset token. Please request a new reset link.' });
    }
  }, [searchParams]);


  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: PasswordResetFormValues) => {
    if (!token) {
      setMessage({ type: 'error', text: 'Cannot reset password without a valid token.' });
      return;
    }
    console.log('Password reset form submitted:', { ...data, token });
    setIsLoading(true);
    setMessage(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success
    setMessage({ type: 'success', text: "Your password has been reset successfully! You can now log in with your new password." });
    setIsLoading(false);
    setTimeout(() => navigate('/login'), 3000); // Redirect to login after a delay

    // To simulate an error (e.g., token expired):
    // setMessage({ type: 'error', text: "Failed to reset password. The link may have expired or been used already." });
    // setIsLoading(false);
  };
  
  console.log('PasswordResetPage loaded');

  return (
    <AuthPageLayout title="Set a New Password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {message && (
            <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className={message.type === 'success' ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300' : ''}>
               {message.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
              <AlertTitle>{message.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
          {!token && !message && ( // Show this specific message if token is missing and no other message is set
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Invalid Link</AlertTitle>
              <AlertDescription>This password reset link is invalid or has expired. Please request a new one.</AlertDescription>
            </Alert>
          )}
          {token && ( // Only show form if token exists
            <>
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="newPassword">New Password</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <FormControl>
                        <Input id="newPassword" type="password" placeholder="••••••••" {...field} className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmNewPassword">Confirm New Password</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <FormControl>
                        <Input id="confirmNewPassword" type="password" placeholder="••••••••" {...field} className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading || !token || !!(message && message.type === 'success')}>
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <KeyRound className="mr-2 h-4 w-4" />
                )}
                Reset Password
              </Button>
            </>
          )}
        </form>
      </Form>
    </AuthPageLayout>
  );
};

export default PasswordResetPage;
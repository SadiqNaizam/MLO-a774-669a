import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Assuming a generic Layout component for authenticated routes
// import AppLayout from "./components/layout/AppLayout"; 

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import NotFound from "./pages/NotFound"; // Must Include

// Placeholder for a dashboard page or any authenticated-only page
const DashboardPage = () => {
  console.log("DashboardPage loaded");
  return (
    // <AppLayout> // If you have a main app layout for authenticated users
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        <img src="https://images.unsplash.com/photo-1560415755-bd80d06eda60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTc5fDB8MXxzZWFyY2h8N3x8d2VsY29tZSUyMGRhc2hib2FyZHxlbnwwfHx8fDE3MTgxMzEwMDZ8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Welcome graphic" className="mt-4 rounded-lg shadow-md" />

      </div>
    // </AppLayout>
  );
};

// Placeholder for other pages like Privacy Policy & Terms of Service mentioned in AuthPageLayout
const PrivacyPolicyPage = () => {
  console.log("PrivacyPolicyPage loaded");
  return <div className="p-10"><h1>Privacy Policy</h1><p>Details about your privacy policy...</p><img src="https://images.unsplash.com/photo-1556740714-a8395b3bf301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTc5fDB8MXxzZWFyY2h8Mnx8cHJpdmFjeSUyMHBvbGljeXxlbnwwfHx8fDE3MTgxMzExMDF8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Privacy document icon" className="mt-4 rounded-lg shadow-md"/></div>;
};
const TermsOfServicePage = () => {
  console.log("TermsOfServicePage loaded");
  return <div className="p-10"><h1>Terms of Service</h1><p>Details about your terms of service...</p><img src="https://images.unsplash.com/photo-1589998059171-988d887df646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTc5fDB8MXxzZWFyY2h8NHx8ZG9jdW1lbnR8ZW58MHx8fHwxNzE4MTMxMTI4fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Terms document icon" className="mt-4 rounded-lg shadow-md"/></div>;
};


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />

          {/* Assuming '/' redirects to login if not authenticated, or to dashboard if authenticated.
              For simplicity, let's make login the default for now, or a placeholder Homepage.
              If you have a Homepage component, you can use it for '/'
          */}
          <Route path="/" element={<LoginPage />} /> 
          {/* Or: import Homepage from "./pages/Homepage"; <Route path="/" element={<Homepage />} /> */}


          {/* Authenticated Routes (example) */}
          {/* This would typically be wrapped in a component that checks for authentication */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Other static pages linked from AuthPageLayout footer */}
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
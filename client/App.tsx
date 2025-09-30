import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import History from "./pages/History";
import Queue from "./pages/Queue";
import DssRecommendations from "./pages/DssRecommendations";
import Profile from "./pages/Profile";
import DigitalPatta from "./pages/DigitalPatta";
<<<<<<< HEAD
import ProjectBrief from "./pages/ProjectBrief";
=======
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppProvider } from "@/context/AppContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/dss" element={<DssRecommendations />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/patta" element={<DigitalPatta />} />
<<<<<<< HEAD
            <Route path="/project-brief" element={<ProjectBrief />} />
=======
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

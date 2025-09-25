import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import SRS from "./pages/SRS";
import Decks from "./pages/Decks";
import DeckPreview from "./pages/DeckPreview";
import DeckStudy from "./pages/DeckStudy";
import Rewards from "./pages/Rewards";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="srs" element={<SRS />} />
              <Route path="decks" element={<Decks />} />
              <Route path="deck/:deckId/preview" element={<DeckPreview />} />
              <Route path="deck/:deckId/study" element={<DeckStudy />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="forum" element={<Forum />} />
              <Route path="profile" element={<Profile />} />
              <Route path="about" element={<About />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

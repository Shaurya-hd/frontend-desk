import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import { Toaster } from "@/components/ui/sonner";
import { LeadProvider } from "@/components/site/LeadProvider";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import Home from "@/pages/Home";
import Platform from "@/pages/Platform";

const ScrollReset = () => {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (!hash) lenis?.scrollTo(0, { immediate: true });
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
};

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.085, smoothWheel: true }}>
      <BrowserRouter>
        <LeadProvider>
          <div className="grain min-h-screen bg-paper text-ink">
            <ScrollReset />
            <Nav />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/platform" element={<Platform />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-right" toastOptions={{ className: "!rounded-none !border-ink !font-sans" }} />
        </LeadProvider>
      </BrowserRouter>
    </ReactLenis>
  );
}

export default App;

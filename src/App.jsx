import { useState, lazy, Suspense, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Loader from './components/Loader';
import LoadingHome from './components/LoadingHome';
import Portfolio from './pages/Portfolio';
const Contact = lazy(() => import('./pages/Contact'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Pricing = lazy(() => import('./pages/Pricing'));
import Lenis from 'lenis';

function App() {
  const [showLoader, setShowLoader] = useState(false);
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setShowLoader(true);
    }
  }, [location.pathname]);

  const handleLoaderFinish = () => {
    setShowLoader(false);
  };

  useEffect(() => {
    if (!lenisRef.current) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });
      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
    return () => {
      lenisRef.current && lenisRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location]);

  if (showLoader) {
    return <Loader onFinish={handleLoaderFinish} />;
  }

  return (
    <Suspense fallback={<LoadingHome />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      <Outlet />
    </Suspense>
  );
}

export default App;

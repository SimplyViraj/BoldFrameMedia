import { useState, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loader from './components/Loader';
import LoadingHome from './components/LoadingHome';
import Portfolio from './pages/Portfolio';
const Contact = lazy(() => import('./pages/Contact'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
function App() {
  const [showLoader, setShowLoader] = useState(false);
  const location = useLocation();

  useEffect(() => 
  {
    if (location.pathname === '/') {
      setShowLoader(true);
    }
  }, [location.pathname]);

  const handleLoaderFinish = () => {
    setShowLoader(false);
  };

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
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Suspense>
  );
}

export default App;

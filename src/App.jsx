import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ScrollToTop from './components/ScrollToTop';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Galleries from './pages/Galleries';
import GalleryView from './pages/GalleryView';
import Featured from './pages/Featured';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminGalleryCreate from './admin/AdminGalleryCreate';
import AdminGalleryEdit from './admin/AdminGalleryEdit';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <AuthProvider>
      <Analytics />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="min-h-screen bg-cream">
              <Navigation />
              <Home />
              <Footer />
            </div>
          } />
          <Route path="/about" element={
            <div className="min-h-screen bg-cream">
              <Navigation />
              <About />
              <Footer />
            </div>
          } />
          <Route path="/galleries" element={
            <div className="min-h-screen bg-cream">
              <Navigation />
              <Galleries />
              <Footer />
            </div>
          } />
          <Route path="/galleries/:galleryId" element={
            <div className="min-h-screen bg-cream">
              <Navigation />
              <GalleryView />
              <Footer />
            </div>
          } />
          <Route path="/featured" element={
            <div className="min-h-screen bg-cream">
              <Navigation />
              <Featured />
              <Footer />
            </div>
          } />
          <Route path="/pricing" element={
            <div className="min-h-screen bg-cream">
              <Navigation />
              <Pricing />
              <Footer />
            </div>
          } />
          <Route path="/contact" element={
            <div className="min-h-screen bg-cream">
              <Navigation />
              <Contact />
              <Footer />
            </div>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="galleries/new" element={<AdminGalleryCreate />} />
            <Route path="galleries/:id" element={<AdminGalleryEdit />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
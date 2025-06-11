import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LanguageSelector from './components/LanguageSelector';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ShopPage from './pages/ShopPage';
import ClassesPage from './pages/ClassesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <div className="min-h-screen bg-white">
              <LanguageSelector />
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogPostPage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/classes" element={<ClassesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </DataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
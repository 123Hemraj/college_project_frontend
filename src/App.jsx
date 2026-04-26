import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import './index.css';

export const API_BASE = '/api';

function Layout({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    fetch(`${API_BASE}/session`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.logged_in) {
          setLoggedIn(true);
          setUserName(data.user_name);
        }
      })
      .catch(err => console.error("Session check failed", err));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/logout`, { method: 'POST', credentials: 'include' });
      setLoggedIn(false);
      setUserName('');
      window.location.href = '/login';
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="grid-bg"></div>
      <div className="orb orb-1" style={{ width: '600px', height: '600px', background: 'var(--accent-secondary)', top: '-200px', left: '-200px' }}></div>
      <div className="orb orb-2" style={{ width: '500px', height: '500px', background: 'var(--accent-primary)', bottom: '-100px', right: '-100px' }}></div>

      <nav>
        <Link to="/" className="logo">Deep<span>Fake</span></Link>

        {/* Hamburger Button */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Nav Menu */}
        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/docs">Documentation</Link>
          </div>
          <div className="nav-auth">
            {loggedIn ? (
              <>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>{userName}</span>
                <button onClick={handleLogout} className="btn-login" style={{ textDecoration: 'none', display: 'inline-block', backgroundColor: 'transparent' }}>Log Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">Log In</Link>
                <Link to="/register" className="btn-signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-container">
      <style>{`
        .footer-container {
          margin-top: auto;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border-top: 1px solid var(--border-color);
          padding: 4rem 5% 2rem;
          position: relative;
          z-index: 50;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-brand .logo {
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: -1px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text-main);
          margin-bottom: 1rem;
        }
        
        .footer-brand .logo span { 
          color: var(--accent-primary); 
        }

        .footer-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 300px;
        }

        .footer-heading {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--text-main);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .footer-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .footer-links a:hover {
          color: var(--accent-primary);
          transform: translateX(4px);
        }

        .footer-devs {
          background: rgba(112, 0, 255, 0.03);
          border: 1px solid rgba(112, 0, 255, 0.1);
          padding: 1.5rem;
          border-radius: 12px;
        }

        .dev-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .dev-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--text-main);
          font-size: 0.95rem;
        }

        .dev-icon {
          color: var(--accent-secondary);
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>

      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" className="logo">Deep<span>Fake</span></Link>
          <p className="footer-desc">
            Advanced spatial-temporal AI engine designed to protect digital authenticity and combat synthetic media manipulation.
          </p>
        </div>

        <div>
          <h4 className="footer-heading">Platform</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Scanner Dashboard</Link></li>
            <li><Link to="/docs">Documentation</Link></li>
            <li><Link to="/login">Sign In</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-links">
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#ethics">AI Ethics</a></li>
          </ul>
        </div>

        <div className="footer-devs">
          <h4 className="footer-heading" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--danger)' }}>♥</span> Core Developers
          </h4>
          <div className="dev-list">
            <div className="dev-item">
              <span className="dev-icon">↳</span> Hemraj
            </div>
            <div className="dev-item">
              <span className="dev-icon">↳</span> Mohit
            </div>
            <div className="dev-item">
              <span className="dev-icon">↳</span> Ritikraj
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>&copy; {new Date().getFullYear()} DeepFake Detection System. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span>TensorFlow Pipeline</span>
          <span>•</span>
          <span>Xception-LSTM</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

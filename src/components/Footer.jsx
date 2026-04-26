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
          gap: 0.75rem;
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
          color: #000;
          font-size: 1rem;
        }

        .dev-github-link {
          color: var(--text-main);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .dev-github-link:hover {
          color: var(--accent-primary);
          transform: translateX(4px);
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
            <span></span> Developers
          </h4>
          <div className="dev-list">
            <div className="dev-item">
             
              <a 
                href="https://github.com/123Hemraj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="dev-github-link"
              >
                <svg className="dev-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
                </svg>
                Hemraj
              </a>
            </div>
            <div className="dev-item">
            
              <a 
                href="https://github.com/Mohit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="dev-github-link"
              >
                <svg className="dev-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
                </svg>
                Mohit
              </a>
            </div>
            <div className="dev-item">
              
              <a 
                href="https://github.com/Ritikraj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="dev-github-link"
              >
                <svg className="dev-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
                </svg>
                Ritikraj
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>&copy; {new Date().getFullYear()} DeepFake Detection System. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
         
        </div>
      </div>
    </footer>
  );
}
export default Footer;
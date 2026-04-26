import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE } from '../App';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      
      const data = await res.json();
      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="auth-container-wrapper">
      <style>{`
        .auth-container-wrapper {
            min-height: calc(100vh - 100px);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .auth-container {
            width: 100%;
            max-width: 440px;
            padding: 2.5rem;
            background: #ffffff;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
            z-index: 10;
            animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        .auth-logo {
            font-size: 1.5rem;
            font-weight: 900;
            letter-spacing: -1px;
            margin-bottom: 0.25rem;
        }
        .auth-logo span { color: var(--accent-primary); }

        .auth-title {
            font-size: 1.8rem;
            font-weight: 800;
            letter-spacing: -0.5px;
            margin: 1.25rem 0 0.4rem;
        }

        .auth-sub {
            color: var(--text-muted);
            font-size: 0.95rem;
            margin-bottom: 2rem;
        }

        .form-group {
            margin-bottom: 1.15rem;
        }

        .form-group label {
            display: block;
            font-size: 0.82rem;
            font-weight: 600;
            color: var(--text-muted);
            margin-bottom: 0.4rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .form-group input {
            width: 100%;
            padding: 0.85rem 1rem;
            border: 1.5px solid #e2e8f0;
            border-radius: 10px;
            font-size: 0.95rem;
            color: var(--text-main);
            background: #f8fafc;
            transition: border-color 0.2s, box-shadow 0.2s;
            outline: none;
        }

        .form-group input:focus {
            border-color: var(--accent-primary);
            box-shadow: 0 0 0 3px rgba(112, 0, 255, 0.08);
            background: #fff;
        }

        .form-submit {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            margin-top: 0.5rem;
            transition: all 0.2s;
        }

        .form-submit:hover {
            opacity: 0.88;
            transform: translateY(-1px);
        }

        .auth-switch {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 0.9rem;
            color: var(--text-muted);
        }

        .auth-switch a {
            color: var(--accent-primary);
            font-weight: 700;
            text-decoration: none;
        }
        .auth-switch a:hover { text-decoration: underline; }
      `}</style>

      <div className="auth-container">
        <div className="auth-logo">Deep<span>Fake</span></div>
        <div className="auth-title">Welcome back</div>
        <div className="auth-sub">Log in to access the detection dashboard.</div>

        {error && <div style={{ color: 'var(--danger)', background: 'var(--danger-bg)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="form-submit">Log In &rarr;</button>
        </form>

        <div className="auth-switch">
          Don't have an account? <Link to="/register">Sign up free</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

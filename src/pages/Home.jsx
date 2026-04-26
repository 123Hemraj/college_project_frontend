import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Check the video authenticity";

  useEffect(() => {
    let index = 0;
    let timer;

    const type = () => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
        timer = setTimeout(type, 150 + Math.random() * 100);
      }
    };

    timer = setTimeout(type, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <style>{`
        .hero {
            min-height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 0 20px;
            position: relative;
            z-index: 10;
        }

        h1 {
            font-size: 4.5rem;
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            max-width: 900px;
        }

        .typewriter-container {
            display: inline-block;
            position: relative;
        }

        .typewriter-text {
            border-right: 3px solid var(--accent-primary);
            white-space: nowrap;
            overflow: hidden;
            display: inline-block;
            vertical-align: bottom;
            animation: blink 0.75s step-end infinite;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        @keyframes blink {
            from, to { border-color: transparent; }
            50% { border-color: var(--accent-primary); }
        }

        .subtitle {
            font-size: 1.2rem;
            color: var(--text-muted);
            max-width: 600px;
            margin-bottom: 3rem;
        }

        .cta-btn {
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            color: white;
            text-decoration: none;
            padding: 1rem 3rem;
            border-radius: 50px;
            font-weight: 800;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(112, 0, 255, 0.4);
            display: inline-block;
            position: relative;
            overflow: hidden;
        }

        .cta-btn::after {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transition: left 0.6s ease;
        }

        .cta-btn:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 15px 40px rgba(0, 240, 255, 0.5);
        }

        .cta-btn:hover::after { left: 100%; }

        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: 4rem 5%;
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.6);
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: 20px;
            padding: 2.5rem;
            backdrop-filter: blur(10px);
            transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-10px);
            border-color: var(--border-glow);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
        }

        .feature-icon {
            width: 60px;
            height: 60px;
            background: rgba(112, 0, 255, 0.05);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: var(--accent-primary);
            margin-bottom: 1.5rem;
        }

        .feature-card h3 {
            font-size: 1.3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            letter-spacing: -0.5px;
        }

        .feature-card p {
            color: var(--text-muted);
            font-size: 0.95rem;
        }
      `}</style>
      <section className="hero">
        <h1>
          <div className="typewriter-container">
            <span className="typewriter-text" style={{ borderRight: typedText.length === fullText.length ? 'none' : '' }}>
              {typedText}
            </span>
          </div>
        </h1>
        <p className="subtitle">
          Advanced AI scanning to detect digital manipulations and verify the authenticity of your videos with pinpoint accuracy.
        </p>
        <Link to="/dashboard" className="cta-btn">Initialize Deep Scan Dashboard</Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M8 11h6" />
              <path d="M11 8v6" />
            </svg>
          </div>
          <h3>Frame Detail Scanner</h3>
          <p>Our AI scans every individual frame for subtle visual glitches and digital artifacts that are invisible to the human eye.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20" />
              <path d="m17 7-5-5-5 5" />
              <path d="m17 17-5 5-5-5" />
            </svg>
          </div>
          <h3>Motion Consistency Check</h3>
          <p>The system analyzes the flow of movement between frames to ensure everything looks natural and follows the laws of physics.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h3>Instant Result Report</h3>
          <p>Get a precise authenticity score in seconds, helping you distinguish between real human interaction and synthetic media.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
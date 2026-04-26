import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../App';

function Dashboard() {
  const navigate = useNavigate();
  const [videoSrc, setVideoSrc] = useState(null);
  const [fileObj, setFileObj] = useState(null);
  const [fileName, setFileName] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [step, setStep] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('scanner');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('deepfake_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const gaugeChartRef = useRef(null);
  const temporalChartRef = useRef(null);
  let gaugeChartInst = null;
  let temporalChartInst = null;

  useEffect(() => {
    localStorage.setItem('deepfake_history', JSON.stringify(history.slice(0, 10)));
  }, [history]);

  useEffect(() => {
    // Check auth
    fetch(`${API_BASE}/session`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (!data.logged_in) {
          navigate('/login');
        }
      })
      .catch(() => navigate('/login'));
  }, [navigate]);

  useEffect(() => {
    if (result && gaugeChartRef.current && temporalChartRef.current) {
      gaugeChartInst = new Chart(gaugeChartRef.current, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [result.fake_prob, result.real_prob],
            backgroundColor: [result.label === 'FAKE' ? '#ef4444' : '#f1f5f9', result.label === 'REAL' ? '#10b981' : '#f1f5f9'],
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
            cutout: '80%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } }
        }
      });

      temporalChartInst = new Chart(temporalChartRef.current, {
        type: 'line',
        data: {
          labels: Array.from({length: 15}, (_, i) => i + 1),
          datasets: [{
            label: 'Spatial Score',
            data: Array(15).fill().map(() => Math.random() * 100), // Mock temporal variance chart
            borderColor: '#0f172a',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            fill: true,
            backgroundColor: 'rgba(15,23,42,0.05)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { display: false, min: 0, max: 100 },
            x: { display: false }
          }
        }
      });
    }

    return () => {
      if (gaugeChartInst) gaugeChartInst.destroy();
      if (temporalChartInst) temporalChartInst.destroy();
    };
  }, [result]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setFileObj(file);
      setFileName(file.name);
      setStep(1);
      setResult(null);
      setError('');
    }
  };

  const handleRemove = () => {
    setVideoSrc(null);
    setFileObj(null);
    setFileName('');
    setStep(1);
    setResult(null);
    setError('');
  };

  const handleAnalyze = async () => {
    if (!fileObj) return;
    setAnalyzing(true);
    setStep(2);
    setError('');
    
    // Simulate steps UI while uploading
    setTimeout(() => setStep(3), 1500);
    setTimeout(() => setStep(4), 3000);

    const formData = new FormData();
    formData.append('video', fileObj);

    try {
      const res = await fetch(`${API_BASE}/dashboard`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      const data = await res.json();
      
      setAnalyzing(false);
      if (res.ok && data.status === 'success') {
        setStep(5);
        setResult(data);
        setHistory(prev => {
          const newEntry = {
            id: Date.now(),
            filename: fileObj.name,
            date: new Date().toLocaleString(),
            label: data.label,
            fake_prob: data.fake_prob,
            real_prob: data.real_prob
          };
          return [newEntry, ...prev].slice(0, 10);
        });
      } else {
        setStep(1);
        setError(data.message || 'Analysis failed. Make sure backend has loaded models.');
      }
    } catch (err) {
      setAnalyzing(false);
      setStep(1);
      setError('Network error checking API.');
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Dashboard</h3>
        <button 
          onClick={() => setActiveTab('scanner')}
          style={{
            padding: '0.8rem 1rem',
            textAlign: 'left',
            background: activeTab === 'scanner' ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === 'scanner' ? '#fff' : 'var(--text-muted)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'all 0.2s'
          }}>
          <span style={{ marginRight: '8px' }}>🎥</span> DeepFake Scanner
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          style={{
            padding: '0.8rem 1rem',
            textAlign: 'left',
            background: activeTab === 'history' ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === 'history' ? '#fff' : 'var(--text-muted)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'all 0.2s'
          }}>
          <span style={{ marginRight: '8px' }}>🕒</span> Recent History
        </button>
      </aside>

      <div className="dashboard-main">
        {activeTab === 'scanner' && (
          <div className="dashboard-wrapper">
            <style>{`
              .dashboard-container {
                  display: flex;
                  min-height: calc(100vh - 80px);
                  max-width: 1400px;
                  margin: 0 auto;
                  padding: 2rem 5%;
                  gap: 2rem;
              }

              .dashboard-sidebar {
                  width: 250px;
                  flex-shrink: 0;
                  display: flex;
                  flex-direction: column;
                  gap: 0.5rem;
              }

              .dashboard-main {
                  flex: 1;
                  min-width: 0;
              }

              .dashboard-wrapper {
                  display: flex;
                  width: 100%;
                  gap: 2rem;
              }

        .media-section {
            flex: 1.5;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .section-header h2 {
            font-size: 1.5rem;
            font-weight: 600;
            letter-spacing: -1px;
            margin-bottom: 0.25rem;
        }

        .section-header p {
            color: var(--text-muted);
            font-size: 0.95rem;
            line-height: 1.5;
        }

        .upload-container {
            flex: 1;
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
            transition: border-color 0.3s;
            min-height: 350px;
            max-height: 450px;
        }

        .upload-container:hover {
            border-color: var(--border-hover);
        }

        .drop-zone {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
        }

        .upload-ico {
            width: 48px;
            height: 48px;
            margin-bottom: 1.5rem;
            opacity: 0.5;
        }

        .drop-title {
            font-weight: 500;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
        }

        .drop-desc {
            color: var(--text-muted);
            font-size: 0.85rem;
        }

        #file-input {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        .video-player-wrapper {
            width: 100%;
            height: 100%;
            background: #000;
            position: relative;
            z-index: 20;
            max-height: 450px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        video {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .remove-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.2s;
            z-index: 30;
        }

        .remove-btn:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .scanning-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.4);
            backdrop-filter: blur(2px);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            z-index: 25;
            color: #fff;
            gap: 15px;
        }

        .scan-line {
            width: 100%;
            height: 2px;
            background: rgba(255,255,255,0.5);
            position: absolute;
            top: 0;
            box-shadow: 0 0 15px #fff;
            animation: scan 2s linear infinite;
        }

        @keyframes scan {
            0% { top: 0; }
            50% { top: 100%; }
            100% { top: 0; }
        }

        .analysis-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .analysis-panel {
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1.5rem 2.5rem;
            display: flex;
            flex-direction: column;
        }

        .panel-title {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--text-muted);
            margin-bottom: 1.5rem;
            font-weight: 600;
        }

        .status-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            flex: 0;
        }

        .status-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            opacity: 0.3;
            transition: opacity 0.3s;
        }

        .status-item.active { opacity: 1; }
        .status-item.done .status-indicator {
            background: var(--text-main);
            border-color: var(--text-main);
        }

        .status-indicator {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid var(--text-muted);
            position: relative;
        }

        .status-item.active.processing .status-indicator::after {
            content: '';
            position: absolute;
            top: -4px; left: -4px; right: -4px; bottom: -4px;
            border: 2px solid transparent;
            border-top-color: var(--text-main);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        .status-text {
            font-size: 0.95rem;
            font-weight: 500;
        }

        .status-sub {
            font-size: 0.8rem;
            color: var(--text-muted);
            margin-top: 4px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .analyze-btn {
            background: var(--text-main);
            color: white;
            border: none;
            padding: 1.2rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: all 0.2s;
            margin-top: auto;
        }

        .analyze-btn:disabled {
            background: var(--border-hover);
            color: var(--text-muted);
            cursor: not-allowed;
        }

        .analyze-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .analytics-grid {
            margin-top: 1rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            animation: fade-in 0.8s ease forwards;
        }

        .analytics-card {
            background: linear-gradient(135deg, var(--bg-surface) 0%, #ffffff 100%);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1rem;
            position: relative;
            transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .analytics-card:hover {
            border-color: var(--border-hover);
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .card-header {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-muted);
            margin-bottom: 1rem;
            display: flex;
            justify-content: space-between;
            font-weight: 600;
        }

        .gauge-container {
            position: relative;
            height: 140px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .gauge-value {
            position: absolute;
            font-size: 1.5rem;
            font-weight: 700;
            bottom: 15%;
        }

        .chart-container {
            height: 140px;
            width: 100%;
        }

        .verdict-box {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 1.5rem 0;
            border-top: 1px solid var(--border-color);
            margin-top: 1rem;
            animation: fade-in 0.5s ease forwards;
        }

        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .verdict-label {
            font-size: 0.8rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 1rem;
        }

        .verdict-result {
            font-size: 2.5rem;
            font-weight: 800;
            letter-spacing: -1px;
            text-transform: uppercase;
        }

        .verdict-result.real {
            color: var(--success);
            text-shadow: 0 0 30px var(--success-bg);
        }

        .verdict-result.fake {
            color: var(--danger);
            text-shadow: 0 0 30px var(--danger-bg);
        }

        @media (max-width: 1024px) {
            .dashboard-container {
                flex-direction: column;
                padding: 1rem 5%;
            }
            .dashboard-sidebar {
                width: 100%;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                gap: 1rem;
            }
            .dashboard-sidebar h3 {
                margin: 0;
                width: 100%;
            }
            .dashboard-sidebar button {
                flex: 1;
                min-width: 150px;
                text-align: center;
            }
            .dashboard-wrapper {
                flex-direction: column;
            }
            .media-section {
                flex: none;
                width: 100%;
            }
            .analysis-section {
                flex: none;
                width: 100%;
            }
            .video-player-wrapper {
                min-height: 250px;
            }
        }
      `}</style>

      <div className="media-section">
        <div className="section-header">
          <h2>Media Scanner</h2>
          <p>Upload a video to begin analysis. Our system will extract and scan frames to detect synthetic manipulations.</p>
        </div>
        <div className="upload-container">
          {!videoSrc ? (
            <div className="drop-zone">
              <svg className="upload-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <div className="drop-title">Select or physical drop</div>
              <div className="drop-desc">MP4, MOV, AVI formats supported</div>
              <input type="file" id="file-input" accept="video/*" onChange={handleFileChange} />
            </div>
          ) : (
            <div className="video-player-wrapper">
              <button className="remove-btn" onClick={handleRemove}>Clear Media</button>
              {analyzing && (
                <div className="scanning-overlay">
                  <div className="scan-line"></div>
                  <div className="brand" style={{ fontWeight: 700, letterSpacing: '2px' }}>ANALYZING TEMPORAL FLOW...</div>
                </div>
              )}
              <video src={videoSrc} controls autoPlay muted loop></video>
            </div>
          )}
        </div>
      </div>

      <div className="analysis-section">
        <div className="analysis-panel">
          <div className="panel-title">Analysis Progress</div>
          <ul className="status-list">
            <li className={`status-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''} ${step === 1 && analyzing ? 'processing' : ''}`}>
              <div className="status-indicator"></div>
              <div>
                <div className="status-text">Ready for Video</div>
                <div className="status-sub">{fileName || 'Waiting for upload'}</div>
              </div>
            </li>
            <li className={`status-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''} ${step === 2 && analyzing ? 'processing' : ''}`}>
              <div className="status-indicator"></div>
              <div>
                <div className="status-text">Preparing Frames</div>
                <div className="status-sub">Extracting sequence</div>
              </div>
            </li>
            <li className={`status-item ${step >= 3 ? 'active' : ''} ${step > 3 ? 'done' : ''} ${step === 3 && analyzing ? 'processing' : ''}`}>
              <div className="status-indicator"></div>
              <div>
                <div className="status-text">Scanning Faces</div>
                <div className="status-sub">Analyzing spatial features</div>
              </div>
            </li>
            <li className={`status-item ${step >= 4 ? 'active' : ''} ${step > 4 ? 'done' : ''} ${step === 4 && analyzing ? 'processing' : ''}`}>
              <div className="status-indicator"></div>
              <div>
                <div className="status-text">Checking Motion</div>
                <div className="status-sub">Verifying temporal naturalness</div>
              </div>
            </li>
          </ul>

          {result && (
            <>
              <div className="verdict-box">
                <div className="verdict-label">Final Classification</div>
                <div className={`verdict-result ${result.label.toLowerCase()}`}>{result.label}</div>
                
                <div style={{ width: '100%', marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
                    <span>Authenticity ({result.real_prob}%)</span>
                    <span>Synthetic ({result.fake_prob}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ height: '100%', background: 'var(--success)', width: `${result.real_prob}%`, transition: 'width 1.5s' }}></div>
                    <div style={{ height: '100%', background: 'var(--danger)', width: `${result.fake_prob}%`, transition: 'width 1.5s' }}></div>
                  </div>
                </div>
              </div>

              <div className="analytics-grid">
                <div className="analytics-card">
                  <div className="card-header">
                    <span>Diagnostic Gauge</span>
                    <span>LOW RISK</span>
                  </div>
                  <div className="gauge-container">
                    <canvas ref={gaugeChartRef}></canvas>
                    <div className="gauge-value">{result.fake_prob}%</div>
                  </div>
                </div>
                <div className="analytics-card">
                  <div className="card-header">
                    <span>Temporal Variance</span>
                  </div>
                  <div className="chart-container">
                    <canvas ref={temporalChartRef}></canvas>
                  </div>
                </div>
              </div>
            </>
          )}

          {error && (
            <div style={{ color: 'var(--danger)', background: 'var(--danger-bg)', padding: '1rem', borderRadius: '8px', marginTop: '1rem', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>
              {error}
            </div>
          )}

          {!result && (
            <button className="analyze-btn" onClick={handleAnalyze} disabled={!videoSrc || analyzing}>
              Run Diagnostics
            </button>
          )}
        </div>
      </div>

      {result && result.frames && (
        <div className="dashboard-panel" style={{ gridColumn: '1 / -1', marginTop: '1.5rem' }}>
          <div className="panel-header">
            <h2 className="panel-title">Extracted Frame Sequence (N=15)</h2>
          </div>
          <div className="panel-body">
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Uniformly sampled frames fed into the Xception CNN feature extractor.
            </p>
            <div className="frames-grid">
              {result.frames.map((src, i) => (
                <img key={i} src={`http://127.0.0.1:5000${src}`} alt={`Frame ${i+1}`} loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )}

        {activeTab === 'history' && (
          <div className="dashboard-panel">
            <div className="panel-header">
              <h2 className="panel-title">Recent Analyses</h2>
            </div>
            <div className="panel-body" style={{ overflowX: 'auto' }}>
              {history.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '1rem' }}>Date</th>
                      <th style={{ padding: '1rem' }}>Filename</th>
                      <th style={{ padding: '1rem' }}>Result</th>
                      <th style={{ padding: '1rem' }}>Real Probability</th>
                      <th style={{ padding: '1rem' }}>Fake Probability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map(item => (
                      <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{item.date}</td>
                        <td style={{ padding: '1rem', fontWeight: 500 }}>{item.filename}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            background: item.label === 'FAKE' ? 'var(--danger-bg)' : 'var(--success-bg)',
                            color: item.label === 'FAKE' ? 'var(--danger)' : 'var(--success)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontWeight: 700,
                            fontSize: '0.8rem'
                          }}>
                            {item.label}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>{item.real_prob}%</td>
                        <td style={{ padding: '1rem' }}>{item.fake_prob}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📭</div>
                  <p>No history found. Your recent scans will appear here.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

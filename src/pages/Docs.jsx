import React, { useEffect } from 'react';

function Docs() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.sidebar-links a');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="docs-wrapper">
      <style>{`
        .docs-wrapper {
            display: flex;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
            padding: 3rem 1.5rem;
            gap: 4rem;
        }

        .sidebar {
            flex: 0 0 250px;
            position: sticky;
            top: 100px;
            height: max-content;
        }

        .sidebar-title {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--text-muted);
            margin-bottom: 1.5rem;
            font-weight: 700;
        }

        .sidebar-links {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .sidebar-links a {
            text-decoration: none;
            color: var(--text-main);
            font-size: 0.95rem;
            opacity: 0.6;
            transition: all 0.2s;
            display: block;
            padding-left: 0;
            border-left: 2px solid transparent;
        }

        .sidebar-links a:hover {
            opacity: 1;
            padding-left: 8px;
            color: var(--accent-primary);
        }

        .sidebar-links a.active {
            opacity: 1;
            font-weight: 600;
            color: var(--accent-primary);
            border-left-color: var(--accent-primary);
            padding-left: 10px;
        }

        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4rem;
        }

        .content-section p {
            color: #334155;
            line-height: 1.8;
            font-size: 1.05rem;
            margin-bottom: 1.5rem;
        }

        .content-section h1 {
            font-size: 3rem;
            font-weight: 700;
            letter-spacing: -1.5px;
            margin-bottom: 1.5rem;
        }

        .content-section h2 {
            font-size: 2rem;
            font-weight: 600;
            letter-spacing: -1px;
            margin-bottom: 1.2rem;
            padding-bottom: 0.8rem;
            border-bottom: 1px solid var(--border-color);
        }

        .diagram-box {
            background: rgba(255, 255, 255, 0.5);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 2.5rem;
            margin: 2rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 1.5rem;
        }

        .step-block {
            background: #ffffff;
            border: 1px dashed var(--border-hover);
            padding: 1.5rem;
            border-radius: 8px;
            width: 100%;
            text-align: center;
            font-weight: 600;
            letter-spacing: -0.5px;
        }

        .arrow-down {
            color: var(--text-muted);
            font-size: 1.5rem;
        }

        .code-snippet {
            background: #f1f5f9;
            padding: 1.5rem;
            border-radius: 8px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.9rem;
            color: #1e293b;
            overflow-x: auto;
            border: 1px solid var(--border-color);
            margin-bottom: 1.5rem;
        }

        @media (max-width: 900px) {
            .docs-wrapper {
                flex-direction: column;
                gap: 2rem;
            }
            .sidebar {
                flex: none;
                position: static;
            }
            .sidebar-links {
                flex-direction: row;
                flex-wrap: wrap;
            }
        }
      `}</style>
      <aside className="sidebar">
        <div className="sidebar-title">Methodology Contents</div>
        <ul className="sidebar-links">
          <li><a href="#abstract" className="active">Abstract</a></li>
          <li><a href="#overview">Systems Overview</a></li>
          <li><a href="#upload-pipeline">Media Upload Pipeline</a></li>
          <li><a href="#preprocessing">Frame Normalization</a></li>
          <li><a href="#xception">Xception Spatial Core</a></li>
          <li><a href="#lstm">LSTM Temporal Coherence</a></li>
          <li><a href="#classification">Final Classification</a></li>
          <li><a href="#tech-stack">Technology & Dataset</a></li>
        </ul>
      </aside>
      
      <main className="content">
        <section className="content-section" id="abstract">
          <h1>Abstract</h1>
          <p>The <strong>Fake Video Detection System</strong> is an AI-powered application designed to identify manipulated or deepfake videos. The system analyzes uploaded video frames using deep learning models — including <strong>CNN</strong>, <strong>LSTM</strong>, and <strong>Transformer-based architectures</strong> — to classify videos as either real or fake.</p>
          <p>As the spread of synthetic media grows at an unprecedented scale, this system serves as a critical tool to reduce misinformation, prevent identity fraud, and combat digital manipulation. By leveraging state-of-the-art neural networks trained on large-scale deepfake datasets, DeepFake provides fast, reliable, and human-readable authenticity verdicts directly in your browser.</p>
          <div className="diagram-box" style={{flexDirection: 'row', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-around', padding: '1.5rem'}}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>🎥</div>
              <div style={{fontWeight: 600, fontSize: '0.9rem'}}>Video Input</div>
              <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>MP4 / MOV / AVI</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', color: 'var(--text-muted)', fontSize: '1.5rem'}}>→</div>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>🧠</div>
              <div style={{fontWeight: 600, fontSize: '0.9rem'}}>AI Analysis</div>
              <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>CNN + LSTM Model</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', color: 'var(--text-muted)', fontSize: '1.5rem'}}>→</div>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>✅</div>
              <div style={{fontWeight: 600, fontSize: '0.9rem'}}>Verdict</div>
              <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Real or Fake</div>
            </div>
          </div>
        </section>

        <section className="content-section" id="overview">
          <h2>Systems Overview</h2>
          <p>The DeepFake system architecture was engineered to detect synthetic media artifacts, specifically addressing AI-generated deepfakes. Because modern Generative Adversarial Networks (GANs) and Auto-Encoders generate spatially flawless single frames, attempting to identify deepfakes via single images alone is highly unreliable.</p>
          <p>To combat this, our methodology employs a <strong>Hybrid Spatial-Temporal Neural Network</strong> — combining a CNN-based feature extractor with an LSTM sequence analyzer. This approach not only detects pixel-level inconsistencies but primarily identifies unnatural motion patterns and temporal physics violations across frames.</p>
        </section>

        <section className="content-section" id="upload-pipeline">
          <h2>1. Media Upload Pipeline</h2>
          <p>The entire detection sequence begins with the user providing via drag-and-drop a raw video source (supported formats include MP4, MOV, and AVI). The Flask backend asynchronously buffers this multi-part payload directly into a secure memory space, ensuring immediate handling without permanently storing user-sensitive media files.</p>
          <p>Once accepted, the internal pipeline triggers OpenCV to initialize a heavily optimized VideoCapture stream, parsing the media container and stripping out embedded audio to strictly evaluate raw visual pixel data.</p>
        </section>

        <section className="content-section" id="preprocessing">
          <h2>2. Frame Extraction & Spatial Normalization</h2>
          <p>Because user videos vary drastically in framerate, aspect ratios, length, and color profiles, standardizing the payload sequentially is the absolute most critical pre-processing step.</p>
          <p>DeepFake extracts exactly <strong>15 distinct frames</strong> from the uploaded video. It samples uniformly across the entire duration (e.g., pulling a frame every Nth tick) to build a wide chronological timeline. During sequence construction, multiple normalization sweeps are applied to every single frame:</p>
          <ul style={{color: '#334155', marginLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: 1.8}}>
            <li><strong>Color Space Correction:</strong> Automatically drops Alpha transparency channels forcing uniform BGR/RGB matrices.</li>
            <li><strong>Spatial Rescaling:</strong> Bilinear geometry resizing locks every image perfectly to <code>224 x 224</code> pixels.</li>
            <li><strong>Tensor Normalization:</strong> Pixel brightness values are mathematically squashed from 0-255 down to a floating point range of <code>[0.0, 1.0]</code> to maximize neural gradient stability.</li>
            <li><strong>Sequence Padding:</strong> If a video is extremely short (under 15 frames), zero-matrice padding is applied to sustain sequence flow structure constraints without introducing fake motion artifacts.</li>
          </ul>
          
          <div className="code-snippet">
            Processed Output Tensor = (BatchSize: 1, SequenceLength: 15, Height: 224, Width: 224, Channels: 3)
          </div>
        </section>

        <section className="content-section" id="xception">
          <h2>3. Xception Spatial Core</h2>
          <p>The first stage of our neural pipeline applies the <strong>Xception architecture</strong> (Extreme Inception) identically to each of the 15 extracted frames using a <code>TimeDistributed</code> layer wrapper. Xception relies exclusively on depthwise separable convolutions which drastically reduces the structural footprint while maintaining maximum feature mapping fidelity.</p>
          <p>The Xception base extracts high-level spatial maps (identifying skin textures, GAN artifacts, blurred edges around synthetic faces). Crucially, the fully connected top-layers of Xception are entirely removed. It acts exclusively as a visual feature extractor translating raw pixels into a flattened, multi-dimensional feature vector.</p>
        </section>

        <section className="content-section" id="lstm">
          <h2>4. LSTM Temporal Coherence Processing</h2>
          <p>The output of the Xception feature map (which now represents 15 sequential "understandings" of the scene) is fed consecutively into a Long Short-Term Memory <strong>(LSTM) recurrent neural network</strong> structure initialized with 128 internal units.</p>
          
          <div className="diagram-box">
            <div className="step-block">Frame [1..15] Vectors from Xception</div>
            <div className="arrow-down">↓</div>
            <div className="step-block">[ LSTM Cell State Tracking ]</div>
            <div className="arrow-down">↓</div>
            <div className="step-block">Aggregated Temporal Understanding</div>
          </div>

          <p>The LSTM tracks the evolution of these features over time. Biological inconsistencies—such as unnatural pulse rates, erratic lip-syncing mapped to audio (if processed jointly), or missing physiological constraints that deepfake systems struggle to maintain across extended spans of time—are picked up as massive anomalies inside the LSTM hidden states.</p>
        </section>

        <section className="content-section" id="classification">
          <h2>5. Final Classification</h2>
          <p>A rigorous Dropout metric evaluates the LSTM output (to prevent model overfitting against training noise), and compresses it through a standard 64-neuron Dense array applying aggressive <em>ReLU</em> activation to squash non-critical features.</p>
          <p>Finally, the tensor bridges into a binary Softmax layer. Softmax calculates two distinct probabilistic confidence distributions: The probability that the provided sequential media aligns with organic, unedited physics (<strong>REAL</strong>), and the probability that it was injected with synthetic manipulations (<strong>FAKE</strong>). A mathematically rigid threshold of <code>0.5</code> enforces the decision rendered on the scanner Dashboard.</p>
        </section>

        <section className="content-section" id="tech-stack">
          <h2>6. Technology & Dataset Foundation</h2>
          <p>The DeepFake engine is grounded by an industry-standard deepfake dataset and relies on a robust combination of enterprise-grade Python libraries designed for high-performance visual processing.</p>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem'}}>
            <div className="step-block" style={{textAlign: 'left'}}>
              <h3 style={{color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.2rem'}}>FaceForensics++ Dataset</h3>
              <p style={{fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-muted)'}}>The primary ground-truth data foundation. This extensive dataset contains thousands of synthesized videos created using four distinct manipulation methods (Deepfakes, Face2Face, FaceSwap, and NeuralTextures), providing the Xception-LSTM model with a massively diverse training ground to learn manipulation artifacts.</p>
            </div>
            <div className="step-block" style={{textAlign: 'left'}}>
              <h3 style={{color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.2rem'}}>TensorFlow & Keras 3</h3>
              <p style={{fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-muted)'}}>Powers the entire Neural Network inference engine. TensorFlow handles graph compilation, layer weights extraction, and heavy parallel tensor mathematics via vectorized operations.</p>
            </div>
            <div className="step-block" style={{textAlign: 'left'}}>
              <h3 style={{color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.2rem'}}>OpenCV (cv2)</h3>
              <p style={{fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-muted)'}}>Serves as the primary media pipeline. OpenCV interfaces flawlessly with FFMPEG bindings to rapidly parse incoming video files, manipulate color spaces (converting BGRA configurations to uniform BGR mapping), and execute extreme-performance biliniar resizing operations.</p>
            </div>
            <div className="step-block" style={{textAlign: 'left'}}>
              <h3 style={{color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.2rem'}}>NumPy</h3>
              <p style={{fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-muted)'}}>Handles core structural multidimensional tracking. Serves as the numerical bridge between OpenCV pixel matrices and the final (1, 15, 224, 224, 3) 5D batch shape expected by the model.</p>
            </div>
            <div className="step-block" style={{textAlign: 'left'}}>
              <h3 style={{color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.2rem'}}>Flask & Flask-Werkzeug</h3>
              <p style={{fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-muted)'}}>Deploys the RESTful ecosystem and handles rigorous routing mechanisms. The backend rapidly buffers multipart/form-data video payloads into local filesystem caches for inspection.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Docs;

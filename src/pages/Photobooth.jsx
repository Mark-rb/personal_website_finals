import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Photobooth.css';

const Photobooth = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [photostrip, setPhotostrip] = useState(null);
  const [isGeneratingPhotostrip, setIsGeneratingPhotostrip] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('none');
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const stripCanvasRef = useRef(null);

  const PHOTO_COUNT = 4;
  const COUNTDOWN_TIME = 3;
  const TARGET_WIDTH = 640; // Target width for consistency
  const TARGET_HEIGHT = 480; // Target height for consistency
  const ASPECT_RATIO = TARGET_WIDTH / TARGET_HEIGHT;

  const FILTERS = {
    none: 'None',
    grayscale: 'Grayscale',
    sepia: 'Sepia',
    warm: 'Warm',
    cool: 'Cool',
    vintage: 'Vintage',
    dramatic: 'Dramatic',
    bright: 'Bright',
  };

  const FILTER_STYLES = {
    none: '',
    grayscale: 'grayscale(1)',
    sepia: 'sepia(0.8)',
    warm: 'sepia(0.4) saturate(1.6) hue-rotate(-10deg)',
    cool: 'saturate(1.2) hue-rotate(10deg)',
    vintage: 'sepia(0.4) contrast(1.2) saturate(1.2) brightness(1.1)',
    dramatic: 'contrast(1.4) saturate(1.4) brightness(0.9)',
    bright: 'brightness(1.2) contrast(1.1) saturate(1.2)',
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          width: { ideal: TARGET_WIDTH },
          height: { ideal: TARGET_HEIGHT },
          aspectRatio: { ideal: ASPECT_RATIO }
        },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Wait for video metadata to load to get actual dimensions
        videoRef.current.onloadedmetadata = () => {
          const videoWidth = videoRef.current.videoWidth;
          const videoHeight = videoRef.current.videoHeight;
          setVideoDimensions({ width: videoWidth, height: videoHeight });
        };
        
        setIsStreaming(true);
        setError(null);
      }
    } catch (err) {
      setError('Unable to access camera. Please make sure you have granted camera permissions.');
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsStreaming(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas to target dimensions
      canvas.width = TARGET_WIDTH;
      canvas.height = TARGET_HEIGHT;

      // Calculate scaling to maintain aspect ratio
      const videoAspect = video.videoWidth / video.videoHeight;
      let drawWidth = TARGET_WIDTH;
      let drawHeight = TARGET_HEIGHT;
      let offsetX = 0;
      let offsetY = 0;

      if (videoAspect > ASPECT_RATIO) {
        // Video is wider than target
        drawWidth = drawHeight * videoAspect;
        offsetX = -(drawWidth - TARGET_WIDTH) / 2;
      } else {
        // Video is taller than target
        drawHeight = drawWidth / videoAspect;
        offsetY = -(drawHeight - TARGET_HEIGHT) / 2;
      }
      
      // Save the current context state
      context.save();
      
      // Scale horizontally by -1 to flip back
      context.scale(-1, 1);
      
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the video frame with proper scaling and centering
      context.filter = FILTER_STYLES[currentFilter];
      context.drawImage(
        video,
        -TARGET_WIDTH - offsetX, // Adjust for the flip
        offsetY,
        drawWidth,
        drawHeight
      );
      
      // Restore the context state
      context.restore();

      return canvas.toDataURL('image/png');
    }
    return null;
  };

  const startPhotoSequence = async () => {
    setIsCapturing(true);
    setCapturedPhotos([]);
    setPhotostrip(null);
    setError(null);
    let photosLeft = PHOTO_COUNT;

    const captureWithCountdown = () => {
      return new Promise((resolve) => {
        let count = COUNTDOWN_TIME;
        setCountdown(count);

        const countdownInterval = setInterval(() => {
          count--;
          setCountdown(count);

          if (count === 0) {
            clearInterval(countdownInterval);
            const photo = takePhoto();
            setCountdown(null);
            resolve(photo);
          }
        }, 1000);
      });
    };

    try {
      while (photosLeft > 0) {
        const photo = await captureWithCountdown();
        if (!photo) {
          throw new Error('Failed to capture photo');
        }
        setCapturedPhotos(prev => [...prev, photo]);
        photosLeft--;

        if (photosLeft > 0) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    } catch (err) {
      console.error('Error during photo sequence:', err);
      setError('Failed to capture photos. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  const createPhotostrip = async () => {
    if (!stripCanvasRef.current || capturedPhotos.length !== PHOTO_COUNT) return;
    
    console.log('Starting photostrip generation...');
    setIsGeneratingPhotostrip(true);
    setPhotostrip(null);
    
    const canvas = stripCanvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Fixed dimensions for the photostrip
    const photoWidth = TARGET_WIDTH;
    const photoHeight = TARGET_HEIGHT;
    const padding = 20;
    const borderWidth = 2;

    // Set canvas dimensions
    canvas.width = photoWidth + (padding * 2);
    canvas.height = (photoHeight * PHOTO_COUNT) + (padding * (PHOTO_COUNT + 1));
    
    // Clear canvas and set background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    try {
      console.log('Loading and drawing images...');
      const images = await Promise.all(
        capturedPhotos.map(
          (photo) =>
            new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = () => reject(new Error('Failed to load image'));
              img.src = photo;
            })
        )
      );

      console.log('Drawing images to canvas...');
      images.forEach((img, index) => {
        const y = padding + (index * (photoHeight + padding));
        
        // Draw white border
        ctx.fillStyle = 'white';
        ctx.fillRect(
          padding - borderWidth,
          y - borderWidth,
          photoWidth + (borderWidth * 2),
          photoHeight + (borderWidth * 2)
        );
        
        // Draw the image
        ctx.drawImage(img, padding, y, photoWidth, photoHeight);
      });

      console.log('Generating final photostrip...');
      const stripData = canvas.toDataURL('image/png');
      setPhotostrip(stripData);
      console.log('Photostrip generation complete!');
    } catch (err) {
      console.error('Error generating photostrip:', err);
      setError('Failed to generate photostrip. Please try again.');
    } finally {
      setIsGeneratingPhotostrip(false);
    }
  };

  const downloadPhotostrip = () => {
    if (!photostrip) {
      console.log('No photostrip available for download');
      return;
    }

    try {
      console.log('Initiating download...');
      const link = document.createElement('a');
      link.href = photostrip;
      link.download = `photostrip-${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('Download initiated successfully');
    } catch (err) {
      console.error('Error downloading photostrip:', err);
      setError('Failed to download photostrip. Please try again.');
    }
  };

  const resetPhotobooth = () => {
    setCapturedPhotos([]);
    setPhotostrip(null);
    setShowPreview(false);
    setError(null);
    setIsGeneratingPhotostrip(false);
  };

  useEffect(() => {
    if (capturedPhotos.length === PHOTO_COUNT) {
      console.log('Photos complete, triggering photostrip generation...');
      createPhotostrip();
    }
  }, [capturedPhotos]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="photobooth-container">
      <motion.h1 
        className="page-title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Photobooth
      </motion.h1>

      <div className="photobooth-content">
        <motion.div 
          className="camera-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="video-container">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={isStreaming ? 'active' : ''}
              style={{ 
                filter: FILTER_STYLES[currentFilter],
                transform: 'scaleX(-1)' // Keep the preview mirrored
              }}
            />
            {!isStreaming && !error && (
              <div className="start-prompt">
                <button onClick={startCamera} className="start-button">
                  Start Camera
                </button>
              </div>
            )}
            {countdown !== null && (
              <div className="countdown-overlay">
                <div className="countdown">{countdown}</div>
              </div>
            )}
          </div>

          {isStreaming && !isCapturing && (
            <>
              <div className="filter-controls">
                <h3>Filters</h3>
                <div className="filter-options">
                  {Object.entries(FILTERS).map(([key, label]) => (
                    <motion.button
                      key={key}
                      className={`filter-button ${currentFilter === key ? 'active' : ''}`}
                      onClick={() => setCurrentFilter(key)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {label}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="controls">
                <button 
                  onClick={startPhotoSequence} 
                  className="capture-button"
                  disabled={isCapturing}
                >
                  Take Photos ({PHOTO_COUNT} shots)
                </button>
                <button onClick={stopCamera} className="stop-button">
                  Stop Camera
                </button>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <canvas ref={stripCanvasRef} style={{ display: 'none' }} />
        </motion.div>

        <motion.div 
          className="preview-panel"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Live Preview</h2>
          <div className="preview-grid">
            <AnimatePresence mode="popLayout">
              {capturedPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  className="preview-photo"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <img 
                    src={photo} 
                    alt={`Preview ${index + 1}`}
                    style={{ transform: 'none' }} // Remove flip from preview thumbnails
                  />
                  <div className="photo-number">{index + 1}</div>
                </motion.div>
              ))}
              {Array.from({ length: PHOTO_COUNT - capturedPhotos.length }).map((_, index) => (
                <motion.div
                  key={`empty-${index}`}
                  className="preview-photo empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="empty-slot">{capturedPhotos.length + index + 1}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {capturedPhotos.length === PHOTO_COUNT && (
            <motion.div 
              className="download-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isGeneratingPhotostrip ? (
                <div className="generating-message">
                  <p>Generating photostrip...</p>
                  <div className="loading-spinner"></div>
                </div>
              ) : error ? (
                <div className="error-message">
                  <p>{error}</p>
                  <button onClick={() => createPhotostrip()} className="retry-button">
                    Retry Generation
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={downloadPhotostrip} 
                    className="download-button"
                    disabled={!photostrip}
                  >
                    {photostrip ? 'Download Photostrip' : 'Preparing Download...'}
                  </button>
                  <button onClick={resetPhotobooth} className="retry-button">
                    Take New Photos
                  </button>
                </>
              )}
            </motion.div>
          )}
          {capturedPhotos.length === 0 && (
            <div className="instructions-mini">
              <p>Click "Take Photos" to start your photo session!</p>
              <p className="note">You'll get {PHOTO_COUNT} photos with {COUNTDOWN_TIME}-second countdown each.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Photobooth; 
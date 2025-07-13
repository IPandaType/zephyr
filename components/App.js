const { useState, useEffect, useRef } = React;

function App() {
  const [arMessage, setArMessage] = useState('Point your camera at the target image...');
  const [showControls, setShowControls] = useState(true);
  const sceneRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize AR scene after component mounts
    const initializeAR = () => {
      // Listen for camera events
      window.addEventListener('camera-init', () => {
        setArMessage('Camera ready! Point at the target image.');
        setTimeout(() => setShowControls(false), 5000);
      });

      window.addEventListener('camera-error', () => {
        setArMessage('Camera access denied. Please allow camera access.');
      });

      // Listen for AR target found/lost events
      const targetEntity = document.querySelector('[mindar-image-target]');
      if (targetEntity) {
        targetEntity.addEventListener('targetFound', () => {
          console.log('🎯 Target found! Model should be visible now.');
          setArMessage('🎯 Target found! Look for the baby animation!');
          setShowControls(true);
        });

        targetEntity.addEventListener('targetLost', () => {
          console.log('❌ Target lost. Point camera back at the image.');
          setArMessage('❌ Target lost. Point camera at the image again.');
          setShowControls(true);
        });
      }

      // Enhanced video loading and smooth playback
      const babyVideo = document.querySelector('#baby-video');
      if (babyVideo) {
        babyVideo.addEventListener('loadeddata', () => {
          setArMessage('Video animation loaded! Point camera at target.');
          babyVideo.currentTime = 0;
          babyVideo.playbackRate = 1.0;
        });

        babyVideo.addEventListener('error', () => {
          setArMessage('Video failed to load.');
        });

        babyVideo.addEventListener('canplay', () => {
          babyVideo.play();
        });

        babyVideo.addEventListener('ended', () => {
          babyVideo.currentTime = 0;
          babyVideo.play();
        });

        babyVideo.addEventListener('pause', () => {
          if (!babyVideo.ended) {
            babyVideo.play();
          }
        });
      }
    };

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(initializeAR, 1000);
  }, []);

  const scaleAnimation = (newScale) => {
    const animationPlane = document.querySelector('#baby-animation-plane');
    if (animationPlane) {
      animationPlane.setAttribute('width', newScale);
      animationPlane.setAttribute('height', newScale);
      setArMessage(`Animation scaled to ${newScale}. Point camera at target.`);
    }
  };

  return React.createElement('div', { className: 'App' },
    React.createElement(ARControls, { 
      arMessage, 
      showControls, 
      onScaleAnimation: scaleAnimation 
    }),
    React.createElement(ARScene, { 
      sceneRef, 
      videoRef 
    })
  );
}

const { useState, useEffect, useRef } = React;

// Enhanced: Improved stability and smooth tracking - v1.2

function App() {
  const [arMessage, setArMessage] = useState('🎮 AR Treasure Hunt! Find the left hand 🤚 for raccoon, right hand ✋ for bear!');
  const [showControls, setShowControls] = useState(true);
  const [foundCharacters, setFoundCharacters] = useState({ bear: false, raccoon: false, baby: false });
  const sceneRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize AR scene after component mounts
    const initializeAR = () => {
      console.log('🚀 Initializing AR...');

      // Check if video element exists and set up video event listeners
      const babyVideo = document.querySelector('#baby-video');
      console.log('📹 Video element found:', !!babyVideo);
      if (babyVideo) {
        console.log('📹 Video src:', babyVideo.src);

        // Enhanced video loading and smooth playback
        babyVideo.addEventListener('loadeddata', () => {
          setArMessage('Video animation loaded! Point camera at target.');
          babyVideo.currentTime = 0;
          babyVideo.playbackRate = 1.0;

          // Optimize video for smooth playback
          if (babyVideo.requestVideoFrameCallback) {
            babyVideo.requestVideoFrameCallback(() => {
              console.log('📹 Video frame callback ready');
            });
          }
        });

        babyVideo.addEventListener('error', () => {
          setArMessage('Video failed to load.');
        });

        babyVideo.addEventListener('canplay', () => {
          // Ensure smooth playback
          babyVideo.play().then(() => {
            console.log('📹 Video playing smoothly');
          }).catch(e => {
            console.log('📹 Video play issue:', e);
          });
        });

        babyVideo.addEventListener('ended', () => {
          babyVideo.currentTime = 0;
          babyVideo.play();
        });

        babyVideo.addEventListener('pause', () => {
          if (!babyVideo.ended) {
            setTimeout(() => {
              babyVideo.play();
            }, 50); // Small delay to prevent rapid pause/play cycles
          }
        });

        // Prevent video stuttering
        babyVideo.addEventListener('waiting', () => {
          console.log('📹 Video buffering...');
        });

        babyVideo.addEventListener('playing', () => {
          console.log('📹 Video resumed playing');
        });
      }

      // Listen for camera events
      window.addEventListener('camera-init', () => {
        setArMessage('🎮 AR Treasure Hunt! Find the left hand 🤚 for raccoon, right hand ✋ for bear!');
        setTimeout(() => setShowControls(false), 5000);
      });

      window.addEventListener('camera-error', () => {
        setArMessage('Camera access denied. Please allow camera access.');
      });

      // Listen for AR target events from all scenes
      setTimeout(() => {
        // Baby scene target events
        const babyTargets = document.querySelectorAll('#baby-scene [mindar-image-target]');
        babyTargets.forEach(target => {
          target.addEventListener('targetFound', () => {
            console.log('👶 Baby target found!');
            setArMessage('👶 SURPRISE! Mark your calendars! My debut is January 2026 📅👣');
            setFoundCharacters(prev => ({ ...prev, baby: true }));
            setShowControls(true);
          });

          target.addEventListener('targetLost', () => {
            console.log('👶 Baby target lost');
            setArMessage('🎮 Keep searching for hand targets!');
            setShowControls(true);
          });
        });

        // Raccoon scene target events
        const raccoonTargets = document.querySelectorAll('#raccoon-scene [mindar-image-target]');
        raccoonTargets.forEach(target => {
          target.addEventListener('targetFound', () => {
            console.log('🦝 Raccoon target found!');
            setArMessage('🦝 You found the Raccoon! Look for the right hand ✋ to find the bear!');
            setFoundCharacters(prev => ({ ...prev, raccoon: true }));
            setShowControls(true);
          });

          target.addEventListener('targetLost', () => {
            console.log('🦝 Raccoon target lost');
            setArMessage('🎮 Keep searching for hand targets!');
            setShowControls(true);
          });
        });

        // Bear scene target events
        const bearTargets = document.querySelectorAll('#bear-scene [mindar-image-target]');
        bearTargets.forEach(target => {
          target.addEventListener('targetFound', () => {
            console.log('🐻 Bear target found!');
            setArMessage('🐻 You found the Bear! Look for the left hand 🤚 to find the raccoon!');
            setFoundCharacters(prev => ({ ...prev, bear: true }));
            setShowControls(true);
          });

          target.addEventListener('targetLost', () => {
            console.log('🐻 Bear target lost');
            setArMessage('🎮 Keep searching for hand targets!');
            setShowControls(true);
          });
        });
      }, 3000);


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

  console.log('🔍 Checking StyledComponents:', window.StyledComponents);
  const { AppContainer } = window.StyledComponents || {};
  console.log('🔍 AppContainer:', AppContainer);

  // Fallback if StyledComponents not loaded
  if (!AppContainer) {
    console.error('❌ StyledComponents not loaded properly, using fallback');
    return React.createElement('div', {
      style: { width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }
    },
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

  return React.createElement(AppContainer, null,
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

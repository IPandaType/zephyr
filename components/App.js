const { useState, useEffect, useRef } = React;

// Enhanced: Improved stability and smooth tracking - v1.2

function App() {
  const [arMessage, setArMessage] = useState('🎮 AR Treasure Hunt! Look around for the hidden bear 🐻 and raccoon 🦝!');
  const [showControls, setShowControls] = useState(true);
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

      // Listen for camera events and inject characters after AR is ready
      window.addEventListener('camera-init', () => {
        setArMessage('🎮 AR Treasure Hunt! Look around for the hidden bear 🐻 and raccoon 🦝!');
        setTimeout(() => setShowControls(false), 5000);

        // Dynamically inject characters after camera is ready
        setTimeout(() => {
          console.log('📷 Camera ready - injecting characters...');
          injectCharacters();
        }, 3000);
      });

      // Function to dynamically add characters to the scene
      const injectCharacters = () => {
        const scene = document.querySelector('a-scene');
        if (!scene) {
          console.log('❌ Scene not found');
          return;
        }

        console.log('🎯 Injecting characters into scene...');

        // Create test box
        const testBox = document.createElement('a-box');
        testBox.setAttribute('position', '0 1 -2');
        testBox.setAttribute('scale', '0.3 0.3 0.3');
        testBox.setAttribute('color', 'yellow');
        testBox.setAttribute('visible', 'true');
        testBox.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 3000; loop: true');
        scene.appendChild(testBox);

        // Create raccoon
        const raccoonEntity = document.createElement('a-entity');
        raccoonEntity.setAttribute('position', '2 0 -3');
        raccoonEntity.setAttribute('visible', 'true');

        const raccoonModel = document.createElement('a-gltf-model');
        raccoonModel.setAttribute('src', '#raccoonModel');
        raccoonModel.setAttribute('scale', '0.2 0.2 0.2');
        raccoonModel.setAttribute('rotation', '0 45 0');
        raccoonModel.setAttribute('animation-mixer', '');
        raccoonModel.setAttribute('animation', 'property: rotation; to: 0 405 0; dur: 10000; loop: true');
        raccoonEntity.appendChild(raccoonModel);
        scene.appendChild(raccoonEntity);

        // Create bear
        const bearEntity = document.createElement('a-entity');
        bearEntity.setAttribute('position', '-2 0 -3');
        bearEntity.setAttribute('visible', 'true');

        const bearModel = document.createElement('a-gltf-model');
        bearModel.setAttribute('src', '#bearModel');
        bearModel.setAttribute('scale', '0.2 0.2 0.2');
        bearModel.setAttribute('rotation', '0 -45 0');
        bearModel.setAttribute('animation-mixer', '');
        bearModel.setAttribute('animation', 'property: rotation; to: 0 -405 0; dur: 8000; loop: true');
        bearEntity.appendChild(bearModel);
        scene.appendChild(bearEntity);

        console.log('✅ Characters injected successfully!');
      };

      window.addEventListener('camera-error', () => {
        setArMessage('Camera access denied. Please allow camera access.');
      });

      // Wait for AR to initialize, then ensure characters are visible
      setTimeout(() => {
        const raccoonModels = document.querySelectorAll('[src="#raccoonModel"]');
        const bearModels = document.querySelectorAll('[src="#bearModel"]');
        console.log('🦝 Raccoon models found:', raccoonModels.length);
        console.log('🐻 Bear models found:', bearModels.length);

        // Force visibility of all character models
        raccoonModels.forEach((model, index) => {
          console.log(`🦝 Making raccoon ${index} visible`);
          model.setAttribute('visible', 'true');
          model.parentElement.setAttribute('visible', 'true');

          model.addEventListener('model-loaded', () => {
            console.log(`🦝 Raccoon ${index} model loaded successfully!`);
            model.setAttribute('visible', 'true');
          });
        });

        bearModels.forEach((model, index) => {
          console.log(`🐻 Making bear ${index} visible`);
          model.setAttribute('visible', 'true');
          model.parentElement.setAttribute('visible', 'true');

          model.addEventListener('model-loaded', () => {
            console.log(`🐻 Bear ${index} model loaded successfully!`);
            model.setAttribute('visible', 'true');
          });
        });
      }, 5000);

      // Listen for AR target found/lost events
      const targetEntity = document.querySelector('[mindar-image-target]');
      if (targetEntity) {
        targetEntity.addEventListener('targetFound', () => {
          console.log('🎯 Target found! Baby animation should be visible now.');
          setArMessage('👶 SURPRISE! Mark your calendars! My debut is January 2026 📅👣');
          setShowControls(true);
        });

        targetEntity.addEventListener('targetLost', () => {
          console.log('❌ Target lost.');
          setArMessage('🎮 Keep looking around for the hidden bear 🐻 and raccoon 🦝!');
          setShowControls(true);
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

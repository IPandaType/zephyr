const { useState, useEffect, useRef } = React;

// Enhanced: Improved stability and smooth tracking - v1.2

function App() {
  const [arMessage, setArMessage] = useState('Look for animated characters...');
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
          setArMessage('Look around to find animated characters!!');
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
        setArMessage('Camera ready! Look for animated characters');
        // Don't hide controls automatically - let target events control them
      });

      window.addEventListener('camera-error', () => {
        setArMessage('Camera access denied. Please allow camera access.');
      });

      // Listen for AR target events - only baby target
      const targetEntity = document.querySelector('[mindar-image-target]');
      if (targetEntity) {
        targetEntity.addEventListener('targetFound', () => {
          console.log('🎯 Baby target found!');
          setArMessage('👶 SURPRISE! Mark your calendars! My debut is January 2026 📅👣');
          setShowControls(true);

          // AGGRESSIVE video play approach - force it to work!
          setTimeout(() => {
            const video = document.querySelector('#baby-video');
            if (video) {
              console.log('📹 FORCING baby video to play...');

              // Force all video properties for autoplay
              video.muted = true;
              video.volume = 0;
              video.currentTime = 0;
              video.autoplay = true;
              video.loop = true;

              // Multiple play attempts
              const forcePlay = () => {
                video.play().then(() => {
                  console.log('📹 SUCCESS: Baby video is playing!');
                }).catch((error) => {
                  console.log('📹 Play attempt failed, retrying...', error);
                  setTimeout(forcePlay, 500); // Keep trying every 500ms
                });
              };

              // Start forcing play
              forcePlay();

              // Also try on any user interaction
              const playOnInteraction = () => {
                video.play().then(() => {
                  console.log('📹 Video playing after user interaction');
                }).catch(e => console.log('📹 Still failed after interaction:', e));
              };

              document.addEventListener('click', playOnInteraction);
              document.addEventListener('touchstart', playOnInteraction);

            } else {
              console.log('❌ Video element not found');
            }
          }, 200);
        });

        targetEntity.addEventListener('targetLost', () => {
          console.log('❌ Baby target lost');
          // Keep the surprise message visible - don't change it when target is lost
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
      setArMessage(`Scaled to ${newScale}`);
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

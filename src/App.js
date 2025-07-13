import React, { useEffect, useState, useRef } from 'react';
import './App.css';

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

  const positionAnimation = (x, y, z) => {
    const animationPlane = document.querySelector('#baby-animation-plane');
    if (animationPlane) {
      animationPlane.setAttribute('position', `${x} ${y} ${z}`);
      setArMessage(`Animation positioned at Y: ${y}. Point camera at target.`);
    }
  };

  const adjustTilt = (angle) => {
    const animationPlane = document.querySelector('#baby-animation-plane');
    if (animationPlane) {
      animationPlane.setAttribute('rotation', `${angle} 0 0`);
      setArMessage(`Tilt adjusted to ${angle} degrees. Point camera at target.`);
    }
  };

  return (
    <div className="App">
      {/* AR Controls */}
      <div className={`ar-controls ${showControls ? 'visible' : ''}`}>
        <span className="ar-message">{arMessage}</span>
        <div className="control-buttons">
          <button onClick={() => scaleAnimation(0.8)} className="control-btn">Small</button>
          <button onClick={() => scaleAnimation(1.0)} className="control-btn">Medium</button>
          <button onClick={() => scaleAnimation(1.25)} className="control-btn">Large</button>
          <button onClick={() => scaleAnimation(1.50)} className="control-btn">Extra Large</button>
        </div>
      </div>

      {/* A-Frame AR Scene */}
      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: targets.mind; autoStart: true;"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: true"
      >
        <a-assets>
          <video
            id="baby-video"
            ref={videoRef}
            src="baby.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            style={{ objectFit: 'cover' }}
          />
          <img id="target-image" src="bayko.jpeg" alt="AR Target" />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-plane
            id="baby-animation-plane"
            src="#baby-video"
            position="0 -0.3 0"
            width="1.0"
            height="1.0"
            rotation="-15 0 0"
            material="transparent: true; shader: flat"
          ></a-plane>
        </a-entity>
      </a-scene>
    </div>
  );
}

export default App;

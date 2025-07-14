function ARScene({ sceneRef, videoRef }) {
  const { ARSceneWrapper } = window.StyledComponents || {};

  const fallbackWrapperStyle = {
    width: '100vw',
    height: '100vh',
    position: 'relative'
  };

  // Multi-target scene with optimized smooth tracking
  const sceneElement = React.createElement('a-scene', {
    ref: sceneRef,
    'mindar-image': 'imageTargetSrc: assets/targets.mind; uiError:no; uiLoading:no; uiScanning:no; autoStart: true; filterMinCF: 0.001; filterBeta: 0.01; warmupTolerance: 2; missTolerance: 10; showStats: false',
    'color-space': 'sRGB',
    renderer: 'colorManagement: true, physicallyCorrectLights, antialias: true, precision: highp, alpha: true',
    'vr-mode-ui': 'enabled: false',
    'device-orientation-permission-ui': 'enabled: false'
  },
    React.createElement(ARAssets, { videoRef }),
    React.createElement(ARCamera),
    React.createElement(BabyTarget)
  );

  if (!ARSceneWrapper) {
    return React.createElement('div', { style: fallbackWrapperStyle }, sceneElement);
  }

  return React.createElement(ARSceneWrapper, null, sceneElement);
}


function ARAssets({ videoRef }) {
  return React.createElement('a-assets', null,
    React.createElement('video', {
      id: 'baby-video',
      ref: videoRef,
      src: 'assets/baby.mp4',
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      preload: 'auto',
      crossOrigin: 'anonymous',
      style: { objectFit: 'cover', display: 'none' },
      'webkit-playsinline': 'true',
      'playsinline': 'true',
      'data-object-fit': 'cover',
      controls: false,
      defaultMuted: true,
      volume: 0,
      onCanPlay: () => {
        const video = document.querySelector('#baby-video');
        if (video) {
          video.play().catch(e => console.log('Auto-play prevented:', e));
        }
      }
    }),
    React.createElement('img', {
      id: 'baby-target-image',
      src: 'assets/bayko.jpeg',
      alt: 'Baby AR Target',
      crossOrigin: 'anonymous'
    }),
    React.createElement('img', {
      id: 'lefthand-target-image',
      src: 'assets/lefthand.jpeg',
      alt: 'Left Hand AR Target',
      crossOrigin: 'anonymous'
    }),
    React.createElement('img', {
      id: 'righthand-target-image',
      src: 'assets/righthand.jpeg',
      alt: 'Right Hand AR Target',
      crossOrigin: 'anonymous'
    }),
    // Only baby video assets needed
  );
}

function ARCamera() {
  return React.createElement('a-camera', {
    position: '0 0 0',
    'look-controls': 'enabled: false'
  });
}

function BabyTarget() {
  return React.createElement('a-entity', null,
    // Only Target 0: Baby video (bayko.jpeg)
    React.createElement('a-entity', { 'mindar-image-target': 'targetIndex: 0' },
      React.createElement(VideoPlane)
    )
  );
}





function VideoPlane() {
  return React.createElement('a-plane', {
    id: 'baby-animation-plane',
    src: '#baby-video',
    position: '0 -0.3 0',
    width: '1.0',
    height: '1.0',
    rotation: '-15 0 0',
    material: 'transparent: true; shader: flat; alphaTest: 0.1; side: double',
    'geometry': 'primitive: plane; width: 1; height: 1; segmentsWidth: 1; segmentsHeight: 1',
    'smooth-transform': 'enabled: true; factor: 0.8',
    'shadow': 'receive: true',
    'animation__fadeIn': 'property: material.opacity; from: 0; to: 1; dur: 500; startEvents: targetFound',
    'animation__play': 'property: rotation; dur: 1; startEvents: targetFound'
  });
}

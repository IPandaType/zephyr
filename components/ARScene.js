function ARScene({ sceneRef, videoRef }) {
  const { ARSceneWrapper } = window.StyledComponents || {};

  const fallbackWrapperStyle = {
    width: '100vw',
    height: '100vh',
    position: 'relative'
  };

  const sceneElement = React.createElement('a-scene', {
    ref: sceneRef,
    'mindar-image': 'imageTargetSrc: targets.mind; autoStart: true;',
    'color-space': 'sRGB',
    renderer: 'colorManagement: true, physicallyCorrectLights',
    'vr-mode-ui': 'enabled: false',
    'device-orientation-permission-ui': 'enabled: true'
  },
    React.createElement(ARAssets, { videoRef }),
    React.createElement(ARCamera),
    React.createElement(ARTarget)
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
      src: 'baby.mp4',
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      preload: 'auto',
      crossOrigin: 'anonymous',
      style: { objectFit: 'cover' }
    }),
    React.createElement('img', { 
      id: 'target-image', 
      src: 'bayko.jpeg', 
      alt: 'AR Target' 
    })
  );
}

function ARCamera() {
  return React.createElement('a-camera', { 
    position: '0 0 0', 
    'look-controls': 'enabled: false' 
  });
}

function ARTarget() {
  return React.createElement('a-entity', { 
    'mindar-image-target': 'targetIndex: 0' 
  },
    React.createElement(VideoPlane)
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
    material: 'transparent: true; shader: flat'
  });
}

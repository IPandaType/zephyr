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
    'mindar-image': 'imageTargetSrc: assets/targets.mind; autoStart: true; filterMinCF: 0.001; filterBeta: 0.01; warmupTolerance: 2; missTolerance: 10; showStats: false',
    'color-space': 'sRGB',
    renderer: 'colorManagement: true, physicallyCorrectLights, antialias: true, precision: highp, alpha: true',
    'vr-mode-ui': 'enabled: false',
    'device-orientation-permission-ui': 'enabled: false'
  },
    React.createElement(ARAssets, { videoRef }),
    React.createElement(ARCamera),
    React.createElement(MultiTargets)
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
      style: { objectFit: 'cover' },
      'webkit-playsinline': 'true',
      'playsinline': 'true',
      'data-object-fit': 'cover'
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
    // 3D Character Models
    React.createElement('a-asset-item', {
      id: 'bearModel',
      src: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/bear/scene.gltf'
    }),
    React.createElement('a-asset-item', {
      id: 'raccoonModel',
      src: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/raccoon/scene.gltf'
    })
  );
}

function ARCamera() {
  return React.createElement('a-camera', {
    position: '0 0 0',
    'look-controls': 'enabled: false'
  });
}

function MultiTargets() {
  return React.createElement('a-entity', null,
    // Target 0: Baby video (bayko.jpeg)
    React.createElement('a-entity', { 'mindar-image-target': 'targetIndex: 0' },
      React.createElement(VideoPlane)
    ),

    // Target 1: Raccoon (lefthand.jpeg) - optimized for smooth tracking
    React.createElement('a-entity', {
      'mindar-image-target': 'targetIndex: 1',
      'smooth-tracking': 'enabled: true'
    },
      React.createElement('a-gltf-model', {
        rotation: '0 0 0',
        position: '0 -0.25 0',
        scale: '0.05 0.05 0.05',
        src: '#raccoonModel',
        'animation-mixer': 'clip: *; loop: repeat; crossFadeDuration: 0.3',
        'shadow': 'cast: true; receive: true',
        'smooth-transform': 'enabled: true'
      })
    ),

    // Target 2: Bear (righthand.jpeg) - optimized for smooth tracking
    React.createElement('a-entity', {
      'mindar-image-target': 'targetIndex: 2',
      'smooth-tracking': 'enabled: true'
    },
      React.createElement('a-gltf-model', {
        rotation: '0 0 0',
        position: '0 -0.25 0',
        scale: '0.05 0.05 0.05',
        src: '#bearModel',
        'animation-mixer': 'clip: *; loop: repeat; crossFadeDuration: 0.3',
        'shadow': 'cast: true; receive: true',
        'smooth-transform': 'enabled: true'
      })
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
    'shadow': 'receive: true'
  });
}

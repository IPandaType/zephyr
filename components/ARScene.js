function ARScene({ sceneRef, videoRef }) {
  const { ARSceneWrapper } = window.StyledComponents || {};

  const fallbackWrapperStyle = {
    width: '100vw',
    height: '100vh',
    position: 'relative'
  };

  // We'll create separate scenes for each target type
  const babySceneElement = React.createElement('a-scene', {
    ref: sceneRef,
    'mindar-image': 'imageTargetSrc: assets/targets.mind; autoStart: true; filterMinCF: 0.0001; filterBeta: 0.001; warmupTolerance: 5; missTolerance: 5',
    'color-space': 'sRGB',
    renderer: 'colorManagement: true, physicallyCorrectLights, antialias: true, precision: highp',
    'vr-mode-ui': 'enabled: false',
    'device-orientation-permission-ui': 'enabled: true',
    id: 'baby-scene'
  },
    React.createElement(ARAssets, { videoRef }),
    React.createElement(ARCamera),
    React.createElement(BabyTarget)
  );

  if (!ARSceneWrapper) {
    return React.createElement('div', { style: fallbackWrapperStyle },
      babySceneElement,
      React.createElement(RaccoonScene),
      React.createElement(BearScene)
    );
  }

  return React.createElement(ARSceneWrapper, null,
    babySceneElement,
    React.createElement(RaccoonScene),
    React.createElement(BearScene)
  );
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

function BabyTarget() {
  return React.createElement('a-entity', { 'mindar-image-target': 'targetIndex: 0' },
    React.createElement(VideoPlane)
  );
}

function RaccoonScene() {
  return React.createElement('a-scene', {
    'mindar-image': 'imageTargetSrc: assets/lefthand.mind; autoStart: true; filterMinCF: 0.0001; filterBeta: 0.001; warmupTolerance: 5; missTolerance: 5',
    'color-space': 'sRGB',
    renderer: 'colorManagement: true, physicallyCorrectLights, antialias: true, precision: highp',
    'vr-mode-ui': 'enabled: false',
    'device-orientation-permission-ui': 'enabled: true',
    embedded: true,
    id: 'raccoon-scene',
    style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }
  },
    React.createElement('a-assets', null,
      React.createElement('a-asset-item', {
        id: 'raccoonModel2',
        src: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/raccoon/scene.gltf'
      })
    ),
    React.createElement('a-camera', {
      position: '0 0 0',
      'look-controls': 'enabled: false'
    }),
    React.createElement('a-entity', { 'mindar-image-target': 'targetIndex: 0' },
      React.createElement('a-gltf-model', {
        rotation: '0 0 0',
        position: '0 -0.25 0',
        scale: '0.05 0.05 0.05',
        src: '#raccoonModel2',
        'animation-mixer': ''
      })
    )
  );
}

function BearScene() {
  return React.createElement('a-scene', {
    'mindar-image': 'imageTargetSrc: assets/righthand.mind; autoStart: true; filterMinCF: 0.0001; filterBeta: 0.001; warmupTolerance: 5; missTolerance: 5',
    'color-space': 'sRGB',
    renderer: 'colorManagement: true, physicallyCorrectLights, antialias: true, precision: highp',
    'vr-mode-ui': 'enabled: false',
    'device-orientation-permission-ui': 'enabled: true',
    embedded: true,
    id: 'bear-scene',
    style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3 }
  },
    React.createElement('a-assets', null,
      React.createElement('a-asset-item', {
        id: 'bearModel2',
        src: 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/bear/scene.gltf'
      })
    ),
    React.createElement('a-camera', {
      position: '0 0 0',
      'look-controls': 'enabled: false'
    }),
    React.createElement('a-entity', { 'mindar-image-target': 'targetIndex: 0' },
      React.createElement('a-gltf-model', {
        rotation: '0 0 0',
        position: '0 -0.25 0',
        scale: '0.05 0.05 0.05',
        src: '#bearModel2',
        'animation-mixer': ''
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
    material: 'transparent: true; shader: flat; alphaTest: 0.1',
    'geometry': 'primitive: plane; width: 1; height: 1; segmentsWidth: 1; segmentsHeight: 1',
    'animation__stabilize': 'property: object3D.position; to: 0 -0.3 0; dur: 100; easing: easeOutQuad; loop: false',
    'look-at': '[camera]',
    'billboard': 'true'
  });
}

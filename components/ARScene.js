function ARScene({ sceneRef, videoRef }) {
  const { ARSceneWrapper } = window.StyledComponents || {};

  const fallbackWrapperStyle = {
    width: '100vw',
    height: '100vh',
    position: 'relative'
  };

  const sceneElement = React.createElement('a-scene', {
    ref: sceneRef,
    'mindar-image': 'imageTargetSrc: targets.mind; autoStart: true; filterMinCF: 0.0001; filterBeta: 0.001; warmupTolerance: 5; missTolerance: 5',
    'color-space': 'sRGB',
    renderer: 'colorManagement: true, physicallyCorrectLights, antialias: true, precision: highp',
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
      style: { objectFit: 'cover' },
      'webkit-playsinline': 'true',
      'playsinline': 'true',
      'data-object-fit': 'cover'
    }),
    React.createElement('img', {
      id: 'target-image',
      src: 'bayko.jpeg',
      alt: 'AR Target',
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
  },
    // Attach characters directly to camera so they're always visible
    React.createElement('a-entity', {
      position: '2 -0.5 -3',
      visible: true
    },
      React.createElement('a-gltf-model', {
        rotation: '0 45 0',
        position: '0 0 0',
        scale: '0.2 0.2 0.2',
        src: '#raccoonModel',
        'animation-mixer': '',
        'animation': 'property: rotation; to: 0 405 0; dur: 10000; loop: true'
      })
    ),

    React.createElement('a-entity', {
      position: '-2 -0.5 -3',
      visible: true
    },
      React.createElement('a-gltf-model', {
        rotation: '0 -45 0',
        position: '0 0 0',
        scale: '0.2 0.2 0.2',
        src: '#bearModel',
        'animation-mixer': '',
        'animation': 'property: rotation; to: 0 -405 0; dur: 8000; loop: true'
      })
    ),

    // Test box attached to camera
    React.createElement('a-box', {
      position: '0 1 -2',
      scale: '0.2 0.2 0.2',
      color: 'green',
      visible: true,
      'animation': 'property: rotation; to: 0 360 0; dur: 3000; loop: true'
    })
  );
}

function ARTarget() {
  return React.createElement('a-entity', null,
    // Target 0: Baby video (bayko.jpeg from targets.mind)
    React.createElement('a-entity', { 'mindar-image-target': 'targetIndex: 0' },
      React.createElement(VideoPlane)
    )
  );
}

// Random floating 3D characters that appear anywhere in the scene
function RandomCharacters() {
  return React.createElement('a-entity', {
    id: 'persistent-characters',
    visible: true
  },
    // Simple test boxes first to see if positioning works
    React.createElement('a-box', {
      position: '1.5 0 -2',
      scale: '0.3 0.3 0.3',
      color: 'red',
      visible: true,
      material: 'shader: flat; depthTest: false',
      'render-order': '999'
    }),

    React.createElement('a-box', {
      position: '-1.5 0 -2',
      scale: '0.3 0.3 0.3',
      color: 'blue',
      visible: true,
      material: 'shader: flat; depthTest: false',
      'render-order': '999'
    }),

    // Raccoon - with persistent properties
    React.createElement('a-entity', {
      position: '2 0 -3',
      visible: true,
      'render-order': '999'
    },
      React.createElement('a-gltf-model', {
        rotation: '0 45 0',
        position: '0 0 0',
        scale: '0.2 0.2 0.2',
        src: '#raccoonModel',
        'animation-mixer': '',
        'animation': 'property: rotation; to: 0 405 0; dur: 10000; loop: true',
        visible: true,
        'render-order': '999'
      })
    ),

    // Bear - with persistent properties
    React.createElement('a-entity', {
      position: '-2 0.5 -3',
      visible: true,
      'render-order': '999'
    },
      React.createElement('a-gltf-model', {
        rotation: '0 -45 0',
        position: '0 0 0',
        scale: '0.2 0.2 0.2',
        src: '#bearModel',
        'animation-mixer': '',
        'animation': 'property: rotation; to: 0 -405 0; dur: 8000; loop: true',
        visible: true,
        'render-order': '999'
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

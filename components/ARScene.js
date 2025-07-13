function ARScene({ sceneRef, videoRef }) {
  const { ARSceneWrapper } = window.StyledComponents || {};

  const fallbackWrapperStyle = {
    width: '100vw',
    height: '100vh',
    position: 'relative'
  };

  // Single scene with all targets
  const sceneElement = React.createElement('a-scene', {
    ref: sceneRef,
    'mindar-image': 'imageTargetSrc: assets/targets.mind; autoStart: true; filterMinCF: 0.0001; filterBeta: 0.001; warmupTolerance: 5; missTolerance: 5',
    'color-space': 'sRGB',
    renderer: 'colorManagement: true, physicallyCorrectLights, antialias: true, precision: highp',
    'vr-mode-ui': 'enabled: false',
    'device-orientation-permission-ui': 'enabled: true'
  },
    React.createElement(ARAssets, { videoRef }),
    React.createElement(ARCamera),
    React.createElement(AllTargets)
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

function AllTargets() {
  return React.createElement('a-entity', null,
    // Target 0: Baby video (bayko.jpeg)
    React.createElement('a-entity', { 'mindar-image-target': 'targetIndex: 0' },
      React.createElement(VideoPlane)
    ),

    // Random floating characters that appear without specific targets
    React.createElement(RandomCharacters)
  );
}

function RandomCharacters() {
  return React.createElement('a-entity', null,
    // Raccoon - appears randomly in space
    React.createElement('a-entity', {
      id: 'raccoon-character',
      position: '1.5 0 -2',
      visible: true
    },
      React.createElement('a-gltf-model', {
        rotation: '0 45 0',
        position: '0 0 0',
        scale: '0.1 0.1 0.1',
        src: '#raccoonModel',
        'animation-mixer': '',
        'animation': 'property: rotation; to: 0 405 0; dur: 10000; loop: true'
      }),
      React.createElement('a-text', {
        value: '🦝 Raccoon Found!',
        position: '0 0.5 0',
        align: 'center',
        color: 'white',
        'background-color': 'rgba(0,0,0,0.7)',
        'background-padding': '10 5'
      })
    ),

    // Bear - appears randomly in another location
    React.createElement('a-entity', {
      id: 'bear-character',
      position: '-1.5 0 -2',
      visible: true
    },
      React.createElement('a-gltf-model', {
        rotation: '0 -45 0',
        position: '0 0 0',
        scale: '0.1 0.1 0.1',
        src: '#bearModel',
        'animation-mixer': '',
        'animation': 'property: rotation; to: 0 -405 0; dur: 8000; loop: true'
      }),
      React.createElement('a-text', {
        value: '🐻 Bear Found!',
        position: '0 0.5 0',
        align: 'center',
        color: 'white',
        'background-color': 'rgba(0,0,0,0.7)',
        'background-padding': '10 5'
      })
    ),

    // Additional floating raccoon
    React.createElement('a-entity', {
      id: 'floating-raccoon',
      position: '0 1.5 -3',
      visible: true
    },
      React.createElement('a-gltf-model', {
        rotation: '0 180 0',
        position: '0 0 0',
        scale: '0.08 0.08 0.08',
        src: '#raccoonModel',
        'animation-mixer': '',
        'animation': 'property: position; to: 0.5 1.5 -3; dir: alternate; dur: 5000; loop: true'
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

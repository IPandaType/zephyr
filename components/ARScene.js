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

    // Add simple 3D characters that appear when pointing camera at hands
    // These will be positioned to appear when you show your hands to the camera
    React.createElement('a-entity', {
      id: 'hand-characters',
      visible: true
    },
      // Raccoon for left hand area
      React.createElement('a-entity', {
        id: 'raccoon-hand',
        position: '-1 -0.5 -1.5',
        visible: false
      },
        React.createElement('a-gltf-model', {
          src: '#raccoonModel',
          position: '0 0 0',
          scale: '0.1 0.1 0.1',
          rotation: '0 45 0',
          'animation-mixer': '',
          'animation': 'property: rotation; to: 0 405 0; dur: 10000; loop: true'
        }),
        React.createElement('a-text', {
          value: '🦝 Raccoon on Left Hand!',
          position: '0 0.3 0',
          align: 'center',
          color: 'white',
          'background-color': 'rgba(0,0,0,0.8)',
          'background-padding': '5 2'
        })
      ),

      // Bear for right hand area
      React.createElement('a-entity', {
        id: 'bear-hand',
        position: '1 -0.5 -1.5',
        visible: false
      },
        React.createElement('a-gltf-model', {
          src: '#bearModel',
          position: '0 0 0',
          scale: '0.1 0.1 0.1',
          rotation: '0 -45 0',
          'animation-mixer': '',
          'animation': 'property: rotation; to: 0 -405 0; dur: 8000; loop: true'
        }),
        React.createElement('a-text', {
          value: '🐻 Bear on Right Hand!',
          position: '0 0.3 0',
          align: 'center',
          color: 'white',
          'background-color': 'rgba(0,0,0,0.8)',
          'background-padding': '5 2'
        })
      )
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

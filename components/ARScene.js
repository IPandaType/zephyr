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
    return React.createElement('div', { style: fallbackWrapperStyle },
      sceneElement,
      React.createElement(HandTrackingManager)
    );
  }

  return React.createElement(ARSceneWrapper, null,
    sceneElement,
    React.createElement(HandTrackingManager)
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

function AllTargets() {
  return React.createElement('a-entity', null,
    // Target 0: Baby video (bayko.jpeg)
    React.createElement('a-entity', { 'mindar-image-target': 'targetIndex: 0' },
      React.createElement(VideoPlane)
    )
  );
}

// Component to manage hand tracking scenes
function HandTrackingManager() {
  React.useEffect(() => {
    // Wait for main scene to be ready, then add hand tracking
    setTimeout(() => {
      createHandTrackingScenes();
    }, 3000);
  }, []);

  const createHandTrackingScenes = () => {
    console.log('🤚 Creating hand tracking scenes...');

    // Create left hand scene for raccoon
    const leftHandDiv = document.createElement('div');
    leftHandDiv.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10;';

    const leftHandScene = document.createElement('a-scene');
    leftHandScene.setAttribute('mindar-image', 'imageTargetSrc: assets/lefthand.mind; autoStart: true; filterMinCF: 0.0001; filterBeta: 0.001');
    leftHandScene.setAttribute('embedded', 'true');
    leftHandScene.setAttribute('id', 'lefthand-scene');
    leftHandScene.style.cssText = 'width: 100%; height: 100%; background: transparent;';

    // Assets for left hand scene
    const leftAssets = document.createElement('a-assets');
    const raccoonAsset = document.createElement('a-asset-item');
    raccoonAsset.setAttribute('id', 'leftRaccoonModel');
    raccoonAsset.setAttribute('src', 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/raccoon/scene.gltf');
    leftAssets.appendChild(raccoonAsset);
    leftHandScene.appendChild(leftAssets);

    // Camera for left hand scene
    const leftCamera = document.createElement('a-camera');
    leftCamera.setAttribute('position', '0 0 0');
    leftCamera.setAttribute('look-controls', 'enabled: false');
    leftHandScene.appendChild(leftCamera);

    // Target for left hand (raccoon)
    const leftTarget = document.createElement('a-entity');
    leftTarget.setAttribute('mindar-image-target', 'targetIndex: 0');

    const raccoonModel = document.createElement('a-gltf-model');
    raccoonModel.setAttribute('src', '#leftRaccoonModel');
    raccoonModel.setAttribute('position', '0 -0.25 0');
    raccoonModel.setAttribute('scale', '0.05 0.05 0.05');
    raccoonModel.setAttribute('rotation', '0 0 0');
    raccoonModel.setAttribute('animation-mixer', '');

    leftTarget.appendChild(raccoonModel);
    leftHandScene.appendChild(leftTarget);
    leftHandDiv.appendChild(leftHandScene);
    document.body.appendChild(leftHandDiv);

    // Create right hand scene for bear
    const rightHandDiv = document.createElement('div');
    rightHandDiv.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 11;';

    const rightHandScene = document.createElement('a-scene');
    rightHandScene.setAttribute('mindar-image', 'imageTargetSrc: assets/righthand.mind; autoStart: true; filterMinCF: 0.0001; filterBeta: 0.001');
    rightHandScene.setAttribute('embedded', 'true');
    rightHandScene.setAttribute('id', 'righthand-scene');
    rightHandScene.style.cssText = 'width: 100%; height: 100%; background: transparent;';

    // Assets for right hand scene
    const rightAssets = document.createElement('a-assets');
    const bearAsset = document.createElement('a-asset-item');
    bearAsset.setAttribute('id', 'rightBearModel');
    bearAsset.setAttribute('src', 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/bear/scene.gltf');
    rightAssets.appendChild(bearAsset);
    rightHandScene.appendChild(rightAssets);

    // Camera for right hand scene
    const rightCamera = document.createElement('a-camera');
    rightCamera.setAttribute('position', '0 0 0');
    rightCamera.setAttribute('look-controls', 'enabled: false');
    rightHandScene.appendChild(rightCamera);

    // Target for right hand (bear)
    const rightTarget = document.createElement('a-entity');
    rightTarget.setAttribute('mindar-image-target', 'targetIndex: 0');

    const bearModel = document.createElement('a-gltf-model');
    bearModel.setAttribute('src', '#rightBearModel');
    bearModel.setAttribute('position', '0 -0.25 0');
    bearModel.setAttribute('scale', '0.05 0.05 0.05');
    bearModel.setAttribute('rotation', '0 0 0');
    bearModel.setAttribute('animation-mixer', '');

    rightTarget.appendChild(bearModel);
    rightHandScene.appendChild(rightTarget);
    rightHandDiv.appendChild(rightHandScene);
    document.body.appendChild(rightHandDiv);

    console.log('✅ Hand tracking scenes created');
  };

  return null; // This component doesn't render anything directly
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

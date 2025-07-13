function ARScene({ sceneRef, videoRef }) {
  const { ARSceneWrapper } = window.StyledComponents || {};

  const fallbackWrapperStyle = {
    width: '100vw',
    height: '100vh',
    position: 'relative'
  };

  // Primary scene for baby video
  const sceneElement = React.createElement('a-scene', {
    ref: sceneRef,
    'mindar-image': 'imageTargetSrc: assets/targets.mind; autoStart: true; filterMinCF: 0.0001; filterBeta: 0.001; warmupTolerance: 5; missTolerance: 5',
    'color-space': 'sRGB',
    renderer: 'colorManagement: true, physicallyCorrectLights, antialias: true, precision: highp',
    'vr-mode-ui': 'enabled: false',
    'device-orientation-permission-ui': 'enabled: true',
    id: 'main-scene'
  },
    React.createElement(ARAssets, { videoRef }),
    React.createElement(ARCamera),
    React.createElement(BabyTarget)
  );

  if (!ARSceneWrapper) {
    return React.createElement('div', { style: fallbackWrapperStyle },
      sceneElement,
      React.createElement(HandTrackingOverlay)
    );
  }

  return React.createElement(ARSceneWrapper, null,
    sceneElement,
    React.createElement(HandTrackingOverlay)
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

// Overlay component that adds hand tracking without camera conflicts
function HandTrackingOverlay() {
  React.useEffect(() => {
    // Add hand tracking after main scene is ready
    setTimeout(() => {
      addHandTracking();
    }, 3000);
  }, []);

  const addHandTracking = () => {
    console.log('🤚 Adding hand tracking overlay...');

    // Create invisible overlay scenes for hand tracking
    const leftHandScene = document.createElement('a-scene');
    leftHandScene.setAttribute('mindar-image', 'imageTargetSrc: assets/lefthand.mind; autoStart: true; filterMinCF: 0.0001; filterBeta: 0.001');
    leftHandScene.setAttribute('embedded', 'true');
    leftHandScene.setAttribute('id', 'lefthand-scene');
    leftHandScene.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10;';

    // Add raccoon to left hand scene
    const leftHandAssets = document.createElement('a-assets');
    const raccoonAsset = document.createElement('a-asset-item');
    raccoonAsset.setAttribute('id', 'raccoonModel3');
    raccoonAsset.setAttribute('src', 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/raccoon/scene.gltf');
    leftHandAssets.appendChild(raccoonAsset);
    leftHandScene.appendChild(leftHandAssets);

    const leftHandCamera = document.createElement('a-camera');
    leftHandCamera.setAttribute('position', '0 0 0');
    leftHandCamera.setAttribute('look-controls', 'enabled: false');
    leftHandScene.appendChild(leftHandCamera);

    const leftHandTarget = document.createElement('a-entity');
    leftHandTarget.setAttribute('mindar-image-target', 'targetIndex: 0');
    const raccoonModel = document.createElement('a-gltf-model');
    raccoonModel.setAttribute('src', '#raccoonModel3');
    raccoonModel.setAttribute('position', '0 -0.25 0');
    raccoonModel.setAttribute('scale', '0.05 0.05 0.05');
    raccoonModel.setAttribute('animation-mixer', '');
    leftHandTarget.appendChild(raccoonModel);
    leftHandScene.appendChild(leftHandTarget);

    // Add to page
    document.body.appendChild(leftHandScene);

    // Similar for right hand/bear
    const rightHandScene = document.createElement('a-scene');
    rightHandScene.setAttribute('mindar-image', 'imageTargetSrc: assets/righthand.mind; autoStart: true; filterMinCF: 0.0001; filterBeta: 0.001');
    rightHandScene.setAttribute('embedded', 'true');
    rightHandScene.setAttribute('id', 'righthand-scene');
    rightHandScene.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 11;';

    const rightHandAssets = document.createElement('a-assets');
    const bearAsset = document.createElement('a-asset-item');
    bearAsset.setAttribute('id', 'bearModel3');
    bearAsset.setAttribute('src', 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/bear/scene.gltf');
    rightHandAssets.appendChild(bearAsset);
    rightHandScene.appendChild(rightHandAssets);

    const rightHandCamera = document.createElement('a-camera');
    rightHandCamera.setAttribute('position', '0 0 0');
    rightHandCamera.setAttribute('look-controls', 'enabled: false');
    rightHandScene.appendChild(rightHandCamera);

    const rightHandTarget = document.createElement('a-entity');
    rightHandTarget.setAttribute('mindar-image-target', 'targetIndex: 0');
    const bearModel = document.createElement('a-gltf-model');
    bearModel.setAttribute('src', '#bearModel3');
    bearModel.setAttribute('position', '0 -0.25 0');
    bearModel.setAttribute('scale', '0.05 0.05 0.05');
    bearModel.setAttribute('animation-mixer', '');
    rightHandTarget.appendChild(bearModel);
    rightHandScene.appendChild(rightHandTarget);

    document.body.appendChild(rightHandScene);

    console.log('✅ Hand tracking scenes added');
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

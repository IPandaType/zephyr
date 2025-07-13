// Custom Styled Components Implementation for AR App
// This creates React components with inline styles that mimic styled-components

function createStyledComponent(tag, styles) {
  return function StyledComponent(props) {
    const { children, ...otherProps } = props;
    return React.createElement(tag, {
      ...otherProps,
      style: typeof styles === 'function' ? styles(props) : styles
    }, children);
  };
}

// Main App Container
const AppContainer = createStyledComponent('div', {
  width: '100vw',
  height: '100vh',
  margin: 0,
  padding: 0,
  overflow: 'hidden'
});

// AR Controls Container
const ARControlsContainer = createStyledComponent('div', (props) => ({
  position: 'fixed',
  bottom: '10px',
  left: '10px',
  right: '10px',
  zIndex: 10,
  background: 'rgba(255, 255, 255, 0.95)',
  padding: '15px',
  borderRadius: '10px',
  textAlign: 'center',
  display: 'block',
  transition: 'opacity 0.3s ease',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  ...(window.innerWidth <= 480 && {
    bottom: '5px',
    left: '5px',
    right: '5px',
    padding: '12px'
  })
}));

// AR Message Text
const ARMessage = createStyledComponent('span', {
  display: 'block',
  marginBottom: '10px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
  fontSize: window.innerWidth <= 480 ? '13px' : '14px',
  color: '#333',
  fontWeight: '500',
  lineHeight: '1.4'
});

// Control Buttons Container
const ControlButtonsContainer = createStyledComponent('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  flexWrap: 'wrap',
  marginTop: '8px'
});

// Individual Control Button
const ControlButton = createStyledComponent('button', {
  margin: '3px',
  padding: window.innerWidth <= 480 ? '10px 14px' : '8px 12px',
  border: 'none',
  borderRadius: '6px',
  background: 'linear-gradient(145deg, #f5f5f5, #e8e8e8)',
  color: '#333',
  fontSize: window.innerWidth <= 480 ? '13px' : '12px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minWidth: window.innerWidth <= 480 ? '70px' : '65px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
});

// A-Frame Scene Wrapper
const ARSceneWrapper = createStyledComponent('div', {
  width: '100vw',
  height: '100vh',
  position: 'relative'
});

// Loading Overlay
const LoadingOverlay = createStyledComponent('div', (props) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.8)',
  display: props.visible ? 'flex' : 'none',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  color: 'white',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
  fontSize: '16px',
  textAlign: 'center'
}));

// Status Indicator
const StatusIndicator = createStyledComponent('div', (props) => ({
  position: 'fixed',
  top: '20px',
  left: '20px',
  right: '20px',
  zIndex: 15,
  background: props.type === 'success' ? 'rgba(76, 175, 80, 0.9)' :
              props.type === 'error' ? 'rgba(244, 67, 54, 0.9)' :
              'rgba(33, 150, 243, 0.9)',
  color: 'white',
  padding: '12px 16px',
  borderRadius: '8px',
  textAlign: 'center',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
  fontSize: '14px',
  fontWeight: '500',
  display: props.visible ? 'block' : 'none',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
}));

// Export all styled components
window.StyledComponents = {
  AppContainer,
  ARControlsContainer,
  ARMessage,
  ControlButtonsContainer,
  ControlButton,
  ARSceneWrapper,
  LoadingOverlay,
  StatusIndicator
};

// Styled Components for AR App
const styled = window.styled;

// Main App Container
const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

// AR Controls Container
const ARControlsContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  display: ${props => props.visible ? 'block' : 'block'};
  transition: opacity 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    bottom: 5px;
    left: 5px;
    right: 5px;
    padding: 12px;
  }
`;

// AR Message Text
const ARMessage = styled.span`
  display: block;
  margin-bottom: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-size: 14px;
  color: #333;
  font-weight: 500;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

// Control Buttons Container
const ControlButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

// Individual Control Button
const ControlButton = styled.button`
  margin: 3px;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(145deg, #f5f5f5, #e8e8e8);
  color: #333;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 65px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

  &:hover {
    background: linear-gradient(145deg, #e8e8e8, #ddd);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    background: linear-gradient(145deg, #ddd, #d0d0d0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding: 10px 14px;
    font-size: 13px;
    min-width: 70px;
  }
`;

// A-Frame Scene Wrapper
const ARSceneWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  a-scene {
    width: 100vw !important;
    height: 100vh !important;
  }

  /* Hide A-Frame UI elements */
  .a-enter-vr {
    display: none !important;
  }

  .a-orientation-modal {
    display: none !important;
  }
`;

// Loading Overlay
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${props => props.visible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-size: 16px;
  text-align: center;
`;

// Status Indicator
const StatusIndicator = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 15;
  background: ${props => props.type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 
                       props.type === 'error' ? 'rgba(244, 67, 54, 0.9)' : 
                       'rgba(33, 150, 243, 0.9)'};
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 500;
  display: ${props => props.visible ? 'block' : 'none'};
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

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

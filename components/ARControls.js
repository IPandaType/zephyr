function ARControls({ arMessage, showControls, onScaleAnimation }) {
  const { ARControlsContainer, ARMessage } = window.StyledComponents || {};

  // Fallback styles if StyledComponents not loaded
  const fallbackControlsStyle = {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    right: '10px',
    zIndex: 10,
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '15px',
    borderRadius: '10px',
    textAlign: 'center',
    display: 'block'
  };

  const fallbackMessageStyle = {
    display: 'block',
    marginBottom: '10px',
    fontSize: '14px',
    color: '#333',
    fontWeight: '500'
  };

  if (!ARControlsContainer) {
    return React.createElement('div', { style: fallbackControlsStyle },
      React.createElement('span', { style: fallbackMessageStyle }, arMessage),
      React.createElement(ScaleButtons, { onScaleAnimation })
    );
  }

  return React.createElement(ARControlsContainer, {
    visible: showControls
  },
    React.createElement(ARMessage, null, arMessage),
    React.createElement(ScaleButtons, { onScaleAnimation })
  );
}

function ScaleButtons({ onScaleAnimation }) {
  const { ControlButtonsContainer, ControlButton } = window.StyledComponents || {};

  const scaleOptions = [
    { label: 'Small', value: 0.7 },
    { label: 'Medium', value: 1.0 },
    { label: 'Large', value: 1.25 },
    { label: 'Extra Large', value: 1.50 }
  ];

  const fallbackContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    marginTop: '8px'
  };

  const fallbackButtonStyle = {
    margin: '3px',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    background: '#f5f5f5',
    color: '#333',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '65px'
  };

  if (!ControlButtonsContainer) {
    return React.createElement('div', { style: fallbackContainerStyle },
      ...scaleOptions.map(option =>
        React.createElement('button', {
          key: option.label,
          onClick: () => onScaleAnimation(option.value),
          style: fallbackButtonStyle
        }, option.label)
      )
    );
  }

  return React.createElement(ControlButtonsContainer, null,
    ...scaleOptions.map(option =>
      React.createElement(ControlButton, {
        key: option.label,
        onClick: () => onScaleAnimation(option.value)
      }, option.label)
    )
  );
}

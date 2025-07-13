function ARControls({ arMessage, showControls, onScaleAnimation }) {
  const { ARControlsContainer, ARMessage } = window.StyledComponents;

  return React.createElement(ARControlsContainer, {
    visible: showControls
  },
    React.createElement(ARMessage, null, arMessage),
    React.createElement(ScaleButtons, { onScaleAnimation })
  );
}

function ScaleButtons({ onScaleAnimation }) {
  const { ControlButtonsContainer, ControlButton } = window.StyledComponents;

  const scaleOptions = [
    { label: 'Small', value: 0.7 },
    { label: 'Medium', value: 1.0 },
    { label: 'Large', value: 1.25 },
    { label: 'Extra Large', value: 1.50 }
  ];

  return React.createElement(ControlButtonsContainer, null,
    ...scaleOptions.map(option =>
      React.createElement(ControlButton, {
        key: option.label,
        onClick: () => onScaleAnimation(option.value)
      }, option.label)
    )
  );
}

function ARControls({ arMessage, showControls, onScaleAnimation }) {
  return React.createElement('div', { 
    className: `ar-controls ${showControls ? 'visible' : ''}` 
  },
    React.createElement('span', { className: 'ar-message' }, arMessage),
    React.createElement(ScaleButtons, { onScaleAnimation })
  );
}

function ScaleButtons({ onScaleAnimation }) {
  const scaleOptions = [
    { label: 'Small', value: 0.7 },
    { label: 'Medium', value: 1.0 },
    { label: 'Large', value: 1.25 },
    { label: 'Extra Large', value: 1.50 }
  ];

  return React.createElement('div', { className: 'control-buttons' },
    ...scaleOptions.map(option =>
      React.createElement('button', {
        key: option.label,
        onClick: () => onScaleAnimation(option.value),
        className: 'control-btn'
      }, option.label)
    )
  );
}

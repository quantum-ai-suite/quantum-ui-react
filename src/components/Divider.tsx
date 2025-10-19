import React from 'react';

const Divider: React.FC<{ style?: React.CSSProperties; orientation?: string }> = ({ style, orientation }) => {
  const computedStyle: React.CSSProperties = { 
    ...style, 
    border: style?.color ? `1px solid ${style.color}` : '1px solid #333333',
    width: orientation === 'vertical' ? '1px' : '100%',
    height: orientation === 'vertical' ? '100%' : '1px'
  };
  return <div style={computedStyle} />;
};

export default Divider;
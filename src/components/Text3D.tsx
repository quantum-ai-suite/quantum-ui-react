import React, { forwardRef } from 'react';

interface Text3DProps {
  text: string;
  style?: React.CSSProperties;
  extrude?: number;
}

const Text3D = forwardRef<HTMLSpanElement, Text3DProps>(({ text, style, extrude }, ref) => {
  const safeStyle = style || {};
  const computedStyle: React.CSSProperties = { 
    ...safeStyle, 
    color: safeStyle.color || '#00AEEF',
    textShadow: extrude ? `${extrude}px ${extrude}px 5px rgba(0,0,0,0.3)` : 'none',
    transform: extrude ? `perspective(500px) rotateX(15deg)` : 'none',
    position: 'relative',
    zIndex: 1
  };
  return <span ref={ref} style={computedStyle}>{text}</span>;
});

Text3D.displayName = 'Text3D';

export default Text3D;
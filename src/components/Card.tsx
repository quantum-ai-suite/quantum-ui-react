import React, { forwardRef } from 'react';

const Card = forwardRef(({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }, ref) => {
  const safeStyle = style || {};
  const computedStyle: React.CSSProperties = { 
    ...safeStyle, 
    backgroundColor: safeStyle.bg || '#FFFFFF',
    border: '1px solid #ccc',
    borderRadius: safeStyle.borderRadius || '4px',
    padding: safeStyle.padding || '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };
  return <div ref={ref} style={computedStyle}>{children}</div>;
});

Card.displayName = 'Card';

export default Card;
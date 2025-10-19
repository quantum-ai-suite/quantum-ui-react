import React from 'react';

const VerticalBox: React.FC<{ 
  children: React.ReactNode; 
  style?: React.CSSProperties;
  spacing?: number;
  align?: string;
}> = ({ children, style, spacing, align }) => {
  const safeStyle = style || {};
  const computedStyle: React.CSSProperties = { 
    ...safeStyle, 
    display: 'flex', 
    flexDirection: 'column',
    gap: spacing ? `${spacing}px` : undefined,
    alignItems: align || undefined,
    backgroundColor: safeStyle.bg || safeStyle.backgroundColor || '#000000',
    padding: safeStyle.padding || '0px',
    height: '100vh',
    width: '100vw'
  };
  return <div style={computedStyle}>{children}</div>;
};

export default VerticalBox;
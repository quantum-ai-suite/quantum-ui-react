import React from 'react';

const Label: React.FC<{ text: string; style?: React.CSSProperties }> = ({ text, style }) => (
  <span style={{ 
    ...style, 
    color: style?.color || '#00AEEF',
    fontSize: style?.fontSize || '16px',
    fontWeight: style?.fontWeight || 'normal'
  }}>{text}</span>
);

export default Label;